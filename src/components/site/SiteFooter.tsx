export function SiteFooter() {
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
