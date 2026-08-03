import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { Fragment } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import {
  getEntry,
  olderEntry,
  newerEntry,
  entryNo,
  formatEntryDate,
  readingMinutes,
  type JournalEntry,
} from "@/components/site/journal";

export const Route = createFileRoute("/blog/$postId")({
  loader: ({ params }) => {
    const entry = getEntry(params.postId);
    if (!entry) throw notFound();
    return { entry, older: olderEntry(entry), newer: newerEntry(entry) };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.entry.title} — Nightace Journal` },
          { name: "description", content: loaderData.entry.excerpt },
          { property: "og:title", content: `${loaderData.entry.kicker} — Nightace Journal` },
          { property: "og:description", content: loaderData.entry.excerpt },
          { property: "og:type", content: "article" },
        ]
      : [],
  }),
  notFoundComponent: EntryNotFound,
  component: EntryArticle,
});

function EntryArticle() {
  const { entry, older, newer } = Route.useLoaderData();

  return (
    <article className="relative">
      {/* Header */}
      <header className="relative overflow-hidden pt-28 md:pt-32">
        <div className="pointer-events-none absolute inset-0 grid-lines opacity-70" />
        <div className="relative mx-auto max-w-[1600px] px-6 md:px-10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-ink/60 transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Journal</span>
            <span lang="my" className="font-burmese normal-case tracking-normal">
              · မာတိကာ
            </span>
          </Link>

          <div className="mt-8 grid grid-cols-12 gap-6 border-b border-ink/20 pb-10 md:items-end">
            {/* Seal-red Burmese numeral — the entry's stamp */}
            <div className="col-span-12 md:col-span-2">
              <div
                lang="my"
                className="font-burmese text-7xl font-bold leading-none text-seal md:text-[7vw]"
              >
                {entryNo(entry.id)}
              </div>
            </div>

            <div className="col-span-12 md:col-span-7">
              <div className="text-[11px] uppercase tracking-[0.2em] text-ink/60">
                {entry.kicker}
              </div>
              <h1
                lang="my"
                className="font-burmese mt-3 text-3xl font-bold leading-[1.5] md:text-5xl md:leading-[1.4]"
              >
                {entry.title}
              </h1>
            </div>

            <div className="col-span-12 md:col-span-3">
              <div className="grid grid-cols-3 gap-4 border-t border-ink/20 pt-4 text-[11px] uppercase tracking-[0.2em] md:grid-cols-1 md:gap-3 md:border-t-0 md:pt-0">
                <MetaPair label="Date" value={formatEntryDate(entry.date)} />
                <MetaPair label="Section" value={entry.category} />
                <MetaPair label="Length" value={`${readingMinutes(entry)} min`} />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="mx-auto max-w-[1600px] px-6 py-14 md:px-10 md:py-20">
        <div className="grid grid-cols-12 gap-6">
          <aside className="hidden md:col-span-3 md:block">
            <div className="sticky top-28 flex flex-col gap-6 text-[11px] uppercase tracking-[0.2em] text-ink/60">
              <MetaPair
                label="Entry"
                value={
                  <span lang="my" className="font-burmese normal-case tracking-normal">
                    မှတ်စု {entryNo(entry.id)}
                  </span>
                }
              />
              <MetaPair label="Journal" value="§ 06 — Vol. 006" />
              <MetaPair label="Typeface" value="Pyidaungsu 2.5.3" />
            </div>
          </aside>

          <div className="col-span-12 md:col-span-7 lg:col-span-6">
            {entry.body.map((para, i) => (
              <Fragment key={i}>
                <p
                  lang="my"
                  className="font-burmese text-[15px] leading-[2.1] text-ink/85 md:text-base [&:not(:first-child)]:mt-7"
                >
                  {para}
                </p>
                {i === 1 && entry.quote && (
                  <blockquote
                    lang="my"
                    className="font-burmese my-10 border-l-2 border-seal pl-6 text-xl font-bold leading-[1.8] md:text-2xl"
                  >
                    {entry.quote}
                  </blockquote>
                )}
              </Fragment>
            ))}

            <div className="mt-14 flex items-center gap-3 border-t border-ink/20 pt-6 text-[10px] uppercase tracking-[0.22em] text-ink/50">
              <span className="inline-block h-2 w-2 bg-seal" aria-hidden />
              <span>End of entry</span>
              <span lang="my" className="font-burmese normal-case tracking-normal">
                · ပြီးပါပြီ
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Older / newer */}
      <nav aria-label="More entries" className="border-t border-ink/20">
        <div className="mx-auto grid max-w-[1600px] md:grid-cols-2">
          <PagerCell direction="older" entry={older} />
          <PagerCell
            direction="newer"
            entry={newer}
            className="border-t border-ink/20 md:border-l md:border-t-0"
          />
        </div>
      </nav>
    </article>
  );
}

function MetaPair({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <div>{label}</div>
      <div className="mt-1 text-ink">{value}</div>
    </div>
  );
}

function PagerCell({
  direction,
  entry,
  className = "",
}: {
  direction: "older" | "newer";
  entry: JournalEntry | null;
  className?: string;
}) {
  const label =
    direction === "older" ? (
      <>
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Older entry</span>
        <span lang="my" className="font-burmese normal-case tracking-normal">
          · အဟောင်း
        </span>
      </>
    ) : (
      <>
        <span>Newer entry</span>
        <span lang="my" className="font-burmese normal-case tracking-normal">
          · အသစ်
        </span>
        <ArrowUpRight className="h-3.5 w-3.5" />
      </>
    );

  if (!entry) {
    return (
      <div className={`px-6 py-10 md:px-10 ${className}`}>
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-ink/40">
          {direction === "older" ? (
            <>
              <span>First entry</span>
              <span lang="my" className="font-burmese normal-case tracking-normal">
                · ပထမဆုံး မှတ်စု
              </span>
            </>
          ) : (
            <>
              <span>Latest entry</span>
              <span lang="my" className="font-burmese normal-case tracking-normal">
                · နောက်ဆုံး မှတ်စု
              </span>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <Link
      to="/blog/$postId"
      params={{ postId: String(entry.id) }}
      className={`group block px-6 py-10 md:px-10 ${className} ${
        direction === "newer" ? "md:text-right" : ""
      }`}
    >
      <div
        className={`flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-ink/60 ${
          direction === "newer" ? "md:justify-end" : ""
        }`}
      >
        {label}
      </div>
      <div
        lang="my"
        className="font-burmese mt-3 text-lg font-bold leading-[1.6] transition-colors duration-300 group-hover:text-seal md:text-xl"
      >
        {entry.title}
      </div>
    </Link>
  );
}

function EntryNotFound() {
  return (
    <main className="relative overflow-hidden pt-28 md:pt-32">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-70" />
      <div className="relative mx-auto max-w-[1600px] px-6 pb-32 md:px-10">
        <div className="text-[11px] uppercase tracking-[0.22em] text-ink/60">
          404 — Entry not found
        </div>
        <h1 className="mt-6 font-display text-6xl md:text-8xl">No such entry.</h1>
        <p lang="my" className="font-burmese mt-6 max-w-xl text-base leading-[2] text-ink/70">
          ဒီမှတ်စုကို ရှာမတွေ့ပါ — ဖျက်လိုက်တာ ဖြစ်နိုင်သလို၊ လိပ်စာ မှားနေတာလည်း ဖြစ်နိုင်ပါတယ်။
        </p>
        <Link
          to="/blog"
          className="mt-10 inline-flex items-center gap-2 border-b border-ink pb-1 text-[11px] uppercase tracking-[0.2em]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to the journal</span>
          <span lang="my" className="font-burmese normal-case tracking-normal">
            · မာတိကာသို့
          </span>
        </Link>
      </div>
    </main>
  );
}
