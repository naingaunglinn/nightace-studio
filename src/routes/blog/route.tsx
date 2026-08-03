import { Outlet, createFileRoute } from "@tanstack/react-router";
import { MotionConfig } from "framer-motion";

import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/blog")({
  component: JournalLayout,
});

function JournalLayout() {
  return (
    <div className="relative min-h-screen bg-paper text-ink noise">
      <span className="noise-overlay" aria-hidden />
      <SiteNav
        homeHref="/"
        ctaHref="/#contact"
        active="Journal"
        links={[
          ["Work", "/#work"],
          ["Studio", "/#studio"],
          ["Services", "/#services"],
          ["About", "/#about"],
          ["Journal", "/blog"],
        ]}
      />
      <MotionConfig reducedMotion="user">
        <Outlet />
      </MotionConfig>
      <SiteFooter />
    </div>
  );
}
