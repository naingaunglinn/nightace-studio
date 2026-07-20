import { useEffect, useRef } from "react";

// Client-only Three.js scene: a slowly rotating wireframe torus knot.
// Kept subtle so the type stays the hero.
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
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.z = 6;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);

      const geometry = new THREE.TorusKnotGeometry(1.4, 0.35, 220, 32);
      const material = new THREE.MeshBasicMaterial({
        color: 0x2a2529,
        wireframe: true,
        transparent: true,
        opacity: 0.55,
      });
      const knot = new THREE.Mesh(geometry, material);
      scene.add(knot);

      let mouseX = 0;
      let mouseY = 0;
      const onMove = (e: MouseEvent) => {
        const r = mount.getBoundingClientRect();
        mouseX = ((e.clientX - r.left) / r.width - 0.5) * 2;
        mouseY = ((e.clientY - r.top) / r.height - 0.5) * 2;
      };
      window.addEventListener("mousemove", onMove);

      const onResize = () => {
        const w = mount.clientWidth;
        const h = mount.clientHeight;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      window.addEventListener("resize", onResize);

      const animate = () => {
        knot.rotation.x += 0.002;
        knot.rotation.y += 0.003;
        knot.rotation.x += (mouseY * 0.4 - knot.rotation.x) * 0.02;
        knot.rotation.y += (mouseX * 0.4 - knot.rotation.y) * 0.02;
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
