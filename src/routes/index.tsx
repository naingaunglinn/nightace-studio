import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ArrowUpRight, ArrowDown } from "lucide-react";

import { HeroCanvas } from "@/components/site/HeroCanvas";
import work01 from "@/assets/work-01.jpg";
import work02 from "@/assets/work-02.jpg";
import work03 from "@/assets/work-03.jpg";
import work04 from "@/assets/work-04.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nightace Studio — Web Design & Interactive Development" },
      {
        name: "description",
        content:
          "Nightace Studio designs quiet, precise, motion-driven websites for founders and cultural brands. Inspired by Japanese graphic design.",
      },
      {
        property: "og:title",
        content: "Nightace Studio — Web Design & Interactive Development",
      },
      {
        property: "og:description",
        content:
          "Quiet, precise, motion-driven websites for founders and cultural brands.",
      },
    ],
  }),
  component: Landing,
});

const works = [
  {
    n: "01",
    year: "2026",
    sector: "Culture",
    title: "Silent Rooms",
    kicker: "Brand & Site",
    blurb:
      "An editorial platform for a Kyoto residency program. Long-form journalism, printed rhythm.",
    image: work01,
  },
  {
    n: "02",
    year: "2025",
    sector: "Retail",
    title: "Yoru Ichiba",
    kicker: "E-commerce",
    blurb:
      "A late-night market storefront. Motion-first product pages, katakana micro-copy, muted checkout.",
    image: work02,
  },
  {
    n: "03",
    year: "2025",
    sector: "Studio",
    title: "Sumi Type",
    kicker: "Type Foundry",
    blurb:
      "A specimen site for a small ink-driven type foundry. Live pangrams, weight play, quiet catalogue.",
    image: work03,
  },
  {
    n: "04",
    year: "2024",
    sector: "Architecture",
    title: "Kage House",
    kicker: "Portfolio",
    blurb:
      "A concrete-house studio's monograph on the web. Interactive floor plans, shadow-first photography.",
    image: work04,
  },
];

const services = [
  {
    n: "S/01",
    name: "Brand Sites",
    body: "Editorial marketing sites for founders, studios and cultural brands. Motion baked in, not bolted on.",
  },
  {
    n: "S/02",
    name: "Interactive",
    body: "WebGL scenes, scroll systems and cursor logic used with restraint — always in service of the read.",
  },
  {
    n: "S/03",
    name: "Design Systems",
    body: "Type scales, token pipelines, component libraries. Handed off ready for engineering teams.",
  },
  {
    n: "S/04",
    name: "Art Direction",
    body: "Visual language, photography direction, launch campaigns. From first sketch to shipped pixel.",
  },
];

function Landing() {
  return (
    <div className="relative min-h-screen bg-paper text-ink noise">
      <span className="noise-overlay" aria-hidden />
      <Nav />
      <Hero />
      <Marquee />
      <Manifesto />
      <SelectedWorks />
      <Services />
      <Contact />
      <Footer />
    </div>
  );
}

/* ---------------- NAV ---------------- */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "backdrop-blur-md bg-[color:var(--paper)]/80" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-10">
        <a
          href="#top"
          className="flex items-center"
          aria-label="Nightace Studio — home"
        >
          <img
            src="/nightace-logo.png"
            alt="Nightace Studio"
            width={4000}
            height={1823}
            className="h-8 w-auto md:h-9"
          />
        </a>
        <nav className="hidden items-center gap-8 text-[11px] uppercase tracking-[0.18em] md:flex">
          {[
            ["Index", "#top"],
            ["Work", "#work"],
            ["Studio", "#studio"],
            ["Services", "#services"],
          ].map(([label, href]) => (
            <a key={label} href={href} className="group relative py-1">
              <span>{label}</span>
              <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-ink transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="group inline-flex items-center gap-2 border border-ink px-4 py-2 text-[11px] uppercase tracking-[0.18em] transition-colors hover:bg-ink hover:text-paper"
        >
          <span>Start a project</span>
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>
    </header>
  );
}

/* ---------------- HERO ---------------- */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-[100svh] w-full overflow-hidden pt-24"
    >
      {/* Column grid guides */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-full grid-lines opacity-70" />

      {/* Three.js scene, absolute so it sits behind the type */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-[70vmin] w-[70vmin] max-h-[720px] max-w-[720px]">
          <HeroCanvas />
        </div>
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1600px] flex-col justify-between px-6 pb-10 md:px-10"
      >
        {/* Meta strip */}
        <div className="grid grid-cols-2 gap-6 pt-2 text-[10px] uppercase tracking-[0.22em] md:grid-cols-4">
          <MetaCell label="Studio" value="Nightace" />
          <MetaCell label="EST." value="MMXXIV" />
          <MetaCell label="Focus" value="Web / Motion / Type" />
          <MetaCell label="Reg." value="ISSUE 006" />
        </div>

        {/* Massive type block */}
        <div className="relative -mt-6">
          <HeroTitle />
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-12 md:items-end">
            <p className="col-span-1 max-w-md bg-[color:var(--paper)]/85 p-3 text-sm leading-relaxed backdrop-blur-sm md:col-span-5 md:col-start-8">
              An independent web studio building quiet, precise, motion-driven
              digital work — for founders, cultural brands and small teams that
              care about the details.
            </p>
          </div>

        </div>

        {/* Bottom strip */}
        <div className="mt-10 flex items-end justify-between gap-6 border-t border-ink/20 pt-4 text-[10px] uppercase tracking-[0.22em]">
          <div className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-ink" />
            <span>Booking Q2 · 2026</span>
          </div>
          <a href="#work" className="flex items-center gap-2 group">
            <span>Scroll · Selected Work</span>
            <ArrowDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
          </a>
          <div className="hidden md:block">35°41′N · 139°41′E</div>
        </div>
      </motion.div>
    </section>
  );
}

function MetaCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-ink/50">{label}</span>
      <span className="text-ink">{value}</span>
    </div>
  );
}

function HeroTitle() {
  const wrapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!wrapRef.current) return;
    const chars = wrapRef.current.querySelectorAll<HTMLElement>("[data-reveal-char]");
    gsap.fromTo(
      chars,
      { yPercent: 110, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.035,
        delay: 0.15,
      },
    );
  }, []);

  const line1 = "NIGHT";
  const line2 = "ACE.";

  const renderLine = (text: string) =>
    text.split("").map((c, i) => (
      <span
        key={`${text}-${i}`}
        className="inline-block overflow-hidden align-top"
      >
        <span data-reveal-char className="inline-block will-change-transform">
          {c}
        </span>
      </span>
    ));

  return (
    <div ref={wrapRef} className="relative">
      <h1 className="font-display text-[22vw] leading-[0.82] md:text-[16vw]">
        <span className="block">{renderLine(line1)}</span>
        <span className="ml-[8vw] block text-ink">{renderLine(line2)}</span>
      </h1>
      <div className="absolute -right-1 top-0 hidden flex-col items-end gap-1 text-[10px] uppercase tracking-[0.22em] md:flex">
        <span className="rotate-90 origin-right">Vol. 006 — Portfolio</span>
      </div>
    </div>
  );
}

/* ---------------- MARQUEE ---------------- */

function Marquee() {
  const items = [
    "Web Design",
    "★",
    "Interactive Development",
    "★",
    "Motion Systems",
    "★",
    "Art Direction",
    "★",
    "Type & Identity",
    "★",
    "Three.js / WebGL",
    "★",
  ];
  return (
    <div className="border-y border-ink/20 bg-ink text-paper">
      <div className="flex overflow-hidden py-5">
        <div className="flex min-w-max animate-marquee gap-10 pr-10 font-display text-3xl md:text-5xl">
          {[...items, ...items, ...items, ...items].map((it, i) => (
            <span key={i} className="whitespace-nowrap">
              {it}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- MANIFESTO ---------------- */

function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const words = ref.current.querySelectorAll<HTMLElement>("[data-word]");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            gsap.to(words, {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              stagger: 0.02,
            });
            obs.disconnect();
          }
        });
      },
      { threshold: 0.2 },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const text =
    "We build websites the way a printer sets a page — with intent behind every character, every margin, every silence. Fewer moves, held longer.";

  return (
    <section id="studio" className="mx-auto max-w-[1600px] px-6 py-28 md:px-10 md:py-40">
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-3">
          <SectionLabel index="§ 01" title="Studio" />
        </div>
        <div ref={ref} className="col-span-12 md:col-span-9">
          <p className="font-display text-3xl leading-[1.05] md:text-5xl">
            {text.split(" ").map((w, i) => (
              <span
                key={i}
                data-word
                className="mr-[0.25em] inline-block translate-y-6 opacity-0"
              >
                {w}
              </span>
            ))}
          </p>
          <div className="mt-14 grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              ["12+", "Shipped sites"],
              ["4", "Awards"],
              ["6", "Countries"],
              ["1", "Studio, quiet"],
            ].map(([n, l]) => (
              <div key={l} className="border-t border-ink pt-3">
                <div className="font-display text-4xl md:text-5xl">{n}</div>
                <div className="mt-2 text-[11px] uppercase tracking-[0.2em] text-ink/60">
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- WORK ---------------- */

function SelectedWorks() {
  return (
    <section id="work" className="border-t border-ink/20 bg-paper">
      <div className="mx-auto max-w-[1600px] px-6 pt-20 md:px-10">
        <div className="flex items-end justify-between border-b border-ink/20 pb-6">
          <SectionLabel index="§ 02" title="Selected Work" />
          <div className="hidden text-[11px] uppercase tracking-[0.2em] text-ink/60 md:block">
            2024 — 2026 · 04 projects
          </div>
        </div>
        <ol className="divide-y divide-ink/20">
          {works.map((w, i) => (
            <WorkRow key={w.n} work={w} align={i % 2 === 0 ? "left" : "right"} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function WorkRow({
  work,
  align,
}: {
  work: (typeof works)[number];
  align: "left" | "right";
}) {
  return (
    <li className="group relative overflow-hidden">
      <a href="#" className="block py-10 md:py-16">
        <div
          className={`grid grid-cols-12 items-center gap-6 ${
            align === "right" ? "md:[direction:rtl]" : ""
          }`}
        >
          {/* Giant numeral */}
          <div className="col-span-12 md:col-span-3 [direction:ltr]">
            <div className="font-display text-[28vw] leading-none md:text-[14vw]">
              {work.n}
            </div>
          </div>

          {/* Image with hover reveal */}
          <div className="col-span-12 md:col-span-5 [direction:ltr]">
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={work.image}
                alt={work.title}
                loading="lazy"
                width={1200}
                height={1500}
                className="h-full w-full object-cover grayscale transition-all duration-[900ms] ease-out group-hover:scale-[1.04] group-hover:grayscale-0"
              />
              <div className="pointer-events-none absolute inset-0 border border-ink/10" />
            </div>
          </div>

          {/* Meta + title */}
          <div className="col-span-12 md:col-span-4 [direction:ltr]">
            <div className="grid grid-cols-2 gap-4 border-b border-ink/20 pb-4 text-[11px] uppercase tracking-[0.2em] text-ink/60">
              <div>
                <div>Year</div>
                <div className="mt-1 text-ink">{work.year}</div>
              </div>
              <div>
                <div>Sector</div>
                <div className="mt-1 text-ink">{work.sector}</div>
              </div>
            </div>
            <div className="mt-6">
              <div className="text-[11px] uppercase tracking-[0.2em] text-ink/60">
                {work.kicker}
              </div>
              <h3 className="mt-2 font-display text-4xl md:text-6xl">
                {work.title}
              </h3>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/80">
                {work.blurb}
              </p>
              <div className="mt-6 inline-flex items-center gap-2 border-b border-ink pb-1 text-[11px] uppercase tracking-[0.2em]">
                View case
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
            </div>
          </div>
        </div>
      </a>
    </li>
  );
}

/* ---------------- SERVICES ---------------- */

function Services() {
  return (
    <section id="services" className="border-t border-ink/20 bg-ink text-paper">
      <div className="mx-auto max-w-[1600px] px-6 py-24 md:px-10 md:py-32">
        <div className="flex items-end justify-between border-b border-paper/20 pb-6">
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-paper/60">
              § 03 — Services
            </div>
            <h2 className="mt-4 font-display text-5xl md:text-7xl">
              What we make.
            </h2>
          </div>
          <div className="hidden text-[11px] uppercase tracking-[0.2em] text-paper/60 md:block">
            04 disciplines
          </div>
        </div>

        <ul className="mt-6 grid grid-cols-1 divide-y divide-paper/15 md:grid-cols-2 md:gap-x-14 md:divide-y-0">
          {services.map((s, i) => (
            <motion.li
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: "easeOut" }}
              className="group flex flex-col gap-4 border-b border-paper/15 py-10 md:py-14"
            >
              <div className="flex items-baseline justify-between">
                <span className="text-[11px] uppercase tracking-[0.22em] text-paper/60">
                  {s.n}
                </span>
                <ArrowUpRight className="h-4 w-4 opacity-40 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
              </div>
              <h3 className="font-display text-4xl md:text-6xl">{s.name}</h3>
              <p className="max-w-md text-sm leading-relaxed text-paper/70">
                {s.body}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- CONTACT ---------------- */

function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-ink/20 bg-paper"
    >
      <div className="mx-auto max-w-[1600px] px-6 py-28 md:px-10 md:py-40">
        <div className="text-[11px] uppercase tracking-[0.22em] text-ink/60">
          § 04 — Contact
        </div>
        <h2 className="mt-6 font-display text-[18vw] leading-[0.85] md:text-[12vw]">
          GET
          <br />
          IN&nbsp;TOUCH.
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-10 border-t border-ink/20 pt-8 md:grid-cols-3">
          <ContactBlock
            label="Email"
            value="hello@nightace-studio.dev"
            href="mailto:hello@nightace-studio.dev"
          />
          <ContactBlock
            label="Booking"
            value="Q2 · 2026 — 2 slots"
            href="mailto:hello@nightace-studio.dev?subject=Booking"
          />
          <ContactBlock
            label="Elsewhere"
            value="Instagram · Are.na · Read.cv"
            href="#"
          />
        </div>
      </div>
    </section>
  );
}

function ContactBlock({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a href={href} className="group block">
      <div className="text-[11px] uppercase tracking-[0.22em] text-ink/60">
        {label}
      </div>
      <div className="mt-3 flex items-center justify-between border-b border-ink pb-3 font-display text-2xl md:text-3xl">
        <span>{value}</span>
        <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>
    </a>
  );
}

/* ---------------- FOOTER ---------------- */

function Footer() {
  return (
    <footer className="border-t border-ink/20 bg-paper">
      <div className="mx-auto grid max-w-[1600px] grid-cols-2 items-end gap-6 px-6 py-10 text-[10px] uppercase tracking-[0.22em] md:grid-cols-4 md:px-10">
        <div>© Nightace Studio</div>
        <div>MMXXVI</div>
        <div className="hidden md:block">All rights reserved</div>
        <div className="text-right">Made with quiet care · TYO</div>
      </div>
    </footer>
  );
}

/* ---------------- shared ---------------- */

function SectionLabel({ index, title }: { index: string; title: string }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-[0.22em] text-ink/60">
        {index}
      </div>
      <h2 className="mt-4 font-display text-3xl md:text-5xl">{title}</h2>
    </div>
  );
}
