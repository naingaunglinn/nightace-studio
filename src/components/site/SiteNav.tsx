import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

type NavItem = readonly [label: string, href: string];

/**
 * Fixed site header shared by the landing page and the journal. Links are
 * plain anchors on purpose: the landing page navigates by #hash, and cross-page
 * hash links ("/#work") need a full navigation to land on the section.
 */
export function SiteNav({
  homeHref = "/",
  links,
  ctaHref = "#contact",
  active,
}: {
  homeHref?: string;
  links: NavItem[];
  ctaHref?: string;
  active?: string;
}) {
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
        <a href={homeHref} className="flex items-center" aria-label="Nightace Studio — home">
          <img
            src="/na-logo.png"
            alt="Nightace Studio"
            width={425}
            height={320}
            className="h-9 w-auto md:h-10"
          />
        </a>
        <nav className="hidden items-center gap-8 text-[11px] uppercase tracking-[0.18em] md:flex">
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              aria-current={active === label ? "page" : undefined}
              className="group relative py-1"
            >
              <span>{label}</span>
              <span
                className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-ink transition-transform duration-300 ${
                  active === label ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`}
              />
            </a>
          ))}
        </nav>
        <a
          href={ctaHref}
          className="group inline-flex items-center gap-2 border border-ink px-4 py-2 text-[11px] uppercase tracking-[0.18em] transition-colors hover:bg-ink hover:text-paper"
        >
          <span>Start a project</span>
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>
    </header>
  );
}
