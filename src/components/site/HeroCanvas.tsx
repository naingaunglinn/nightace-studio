import { useEffect, useRef } from "react";

// Client-only Three.js scene: a quiet field of ink dots on paper.
// Dots drift slowly and a soft circular "gathering" forms + breathes,
// echoing a Japanese sumi dot-print aesthetic.
export function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mount = mountRef.current;
    if (!mount) return;

    let disposed = false;
    let raf = 0;

    (async () => {
      const THREE = await import("three");
      if (disposed) return;

      const width = mount.clientWidth;
      const height = mount.clientHeight;

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 10);
      camera.position.z = 1;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);

      // Build a rectangular dot grid, jittered.
      const COLS = 46;
      const ROWS = 46;
      const count = COLS * ROWS;
      const positions = new Float32Array(count * 3);
      const basePositions = new Float32Array(count * 2);
      const sizes = new Float32Array(count);
      const phases = new Float32Array(count);

      let i = 0;
      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          const u = x / (COLS - 1);
          const v = y / (ROWS - 1);
          const px = (u - 0.5) * 2;
          const py = (v - 0.5) * 2;
          // small jitter for organic feel
          const jx = (Math.random() - 0.5) * 0.008;
          const jy = (Math.random() - 0.5) * 0.008;
          basePositions[i * 2] = px + jx;
          basePositions[i * 2 + 1] = py + jy;
          positions[i * 3] = px + jx;
          positions[i * 3 + 1] = py + jy;
          positions[i * 3 + 2] = 0;
          sizes[i] = 1.4 + Math.random() * 0.8;
          phases[i] = Math.random() * Math.PI * 2;
          i++;
        }
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3),
      );
      geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

      // Custom shader material for round, ink-colored dots with soft edges.
      const material = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        uniforms: {
          uColor: { value: new THREE.Color(0x2a2529) },
          uPixelRatio: { value: renderer.getPixelRatio() },
        },
        vertexShader: /* glsl */ `
          attribute float size;
          uniform float uPixelRatio;
          void main() {
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_Position = projectionMatrix * mvPosition;
            gl_PointSize = size * uPixelRatio;
          }
        `,
        fragmentShader: /* glsl */ `
          uniform vec3 uColor;
          void main() {
            vec2 uv = gl_PointCoord - 0.5;
            float d = length(uv);
            float alpha = smoothstep(0.5, 0.35, d);
            if (alpha < 0.01) discard;
            gl_FragColor = vec4(uColor, alpha);
          }
        `,
      });

      const points = new THREE.Points(geometry, material);
      scene.add(points);

      // Mouse influence in normalized coords, smoothed.
      let mx = 0;
      let my = 0;
      let tmx = 0;
      let tmy = 0;
      const onMove = (e: MouseEvent) => {
        const r = mount.getBoundingClientRect();
        tmx = ((e.clientX - r.left) / r.width - 0.5) * 2;
        tmy = -((e.clientY - r.top) / r.height - 0.5) * 2;
      };
      window.addEventListener("mousemove", onMove);

      const onResize = () => {
        const w = mount.clientWidth;
        const h = mount.clientHeight;
        renderer.setSize(w, h);
        material.uniforms.uPixelRatio.value = renderer.getPixelRatio();
      };
      window.addEventListener("resize", onResize);

      const start = performance.now();
      const posAttr = geometry.getAttribute("position") as THREE.BufferAttribute;

      const animate = () => {
        const t = (performance.now() - start) * 0.001;

        // Smooth mouse
        mx += (tmx - mx) * 0.05;
        my += (tmy - my) * 0.05;

        // Breathing ring radius
        const ring = 0.55 + Math.sin(t * 0.4) * 0.06;

        for (let j = 0; j < count; j++) {
          const bx = basePositions[j * 2];
          const by = basePositions[j * 2 + 1];

          // Radial distance from center
          const dx = bx;
          const dy = by;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Ring attraction: pull nearby dots toward the breathing ring.
          const ringPull = Math.exp(-Math.pow((dist - ring) / 0.12, 2)) * 0.05;
          const nx = dist > 0.0001 ? dx / dist : 0;
          const ny = dist > 0.0001 ? dy / dist : 0;
          const tx = bx + (ring * nx - bx) * ringPull;
          const ty = by + (ring * ny - by) * ringPull;

          // Gentle sine drift
          const ph = phases[j];
          const wave =
            Math.sin(t * 0.6 + ph + bx * 2.0) * 0.006 +
            Math.cos(t * 0.5 + ph + by * 2.0) * 0.006;

          // Mouse repulsion (soft)
          const mdx = bx - mx;
          const mdy = by - my;
          const md = Math.sqrt(mdx * mdx + mdy * mdy);
          const repel = Math.exp(-md * 6.0) * 0.08;

          posAttr.array[j * 3] = tx + wave + (md > 0.0001 ? (mdx / md) * repel : 0);
          posAttr.array[j * 3 + 1] =
            ty + wave + (md > 0.0001 ? (mdy / md) * repel : 0);
        }
        posAttr.needsUpdate = true;

        renderer.render(scene, camera);
        raf = requestAnimationFrame(animate);
      };
      animate();

      return () => {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("resize", onResize);
        cancelAnimationFrame(raf);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
        if (renderer.domElement.parentNode === mount) {
          mount.removeChild(renderer.domElement);
        }
      };
    })();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />;
}
