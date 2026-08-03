import { Link, createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

import {
  journalEntries,
  journalCountLabel,
  entryNo,
  formatEntryDate,
  readingMinutes,
  type JournalEntry,
} from "@/components/site/journal";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Journal — Nightace Studio" },
      {
        name: "description",
        content: "စတူဒီယိုရဲ့ မှတ်စုများ — notes on design, code and craft, written in Burmese.",
      },
      { property: "og:title", content: "Journal — Nightace Studio" },
      {
        property: "og:description",
        content: "Notes on design, code and craft, written in Burmese.",
      },
    ],
  }),
  component: JournalIndex,
});

function JournalIndex() {
  return (
    <main>
      <Masthead />
      <EntryIndex />
    </main>
  );
}

/* ---------------- MASTHEAD ---------------- */

function Masthead() {
  return (
    <section className="relative overflow-hidden pt-28 md:pt-32">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-70" />
      <div className="relative mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid grid-cols-2 gap-6 text-[10px] uppercase tracking-[0.22em] md:grid-cols-4">
          <MetaCell label="Section" value="§ 06 — Journal" />
          <MetaCell label="Entries" value={journalCountLabel} />
          <MetaCell
            label="Language"
            value={
              <span>
                Burmese ·{" "}
                <span lang="my" className="font-burmese normal-case tracking-normal">
                  မြန်မာ
                </span>
              </span>
            }
          />
          <MetaCell label="Reg." value="Vol. 006" />
        </div>

        <h1 className="mt-10 font-display text-[16vw] leading-[0.85] md:text-[13.5vw]">Journal.</h1>

        <div className="mt-6 flex flex-wrap items-baseline justify-between gap-x-10 gap-y-3 pb-2">
          <p
            lang="my"
            className="font-burmese max-w-2xl text-base font-bold leading-[1.9] text-seal md:text-xl"
          >
            စတူဒီယိုရဲ့ မှတ်စုများ — ဒီဇိုင်း၊ ကုဒ်၊ လက်ရာအကြောင်း မြန်မာလို ရေးထားတယ်။
          </p>
          <div className="text-[10px] uppercase tracking-[0.22em] text-ink/50">
            Published from Yangon
          </div>
        </div>
      </div>
    </section>
  );
}

function MetaCell({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-ink/50">{label}</span>
      <span className="text-ink">{value}</span>
    </div>
  );
}

/* ---------------- ENTRY INDEX ---------------- */

function EntryIndex() {
  return (
    <section className="relative mx-auto max-w-[1600px] px-6 pb-24 pt-14 md:px-10 md:pb-32">
      <div className="flex items-end justify-between border-b border-ink/20 pb-6 text-[11px] uppercase tracking-[0.2em] text-ink/60">
        <div>Index of entries</div>
        <div className="hidden md:block">Newest first</div>
      </div>
      <ol className="divide-y divide-ink/20">
        {journalEntries.map((entry, i) => (
          <EntryRow key={entry.id} entry={entry} index={i} />
        ))}
      </ol>
    </section>
  );
}

function EntryRow({ entry, index }: { entry: JournalEntry; index: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: "easeOut" }}
    >
      <Link
        to="/blog/$postId"
        params={{ postId: String(entry.id) }}
        className="group block py-10 md:py-14"
      >
        <div className="grid grid-cols-12 gap-6 md:items-center">
          {/* Burmese entry numeral — the journal's counterpart to the work numerals */}
          <div className="col-span-12 md:col-span-2">
            <div
              lang="my"
              className="font-burmese text-6xl font-bold leading-none text-ink/15 transition-colors duration-500 group-hover:text-seal md:text-[6.5vw]"
            >
              {entryNo(entry.id)}
            </div>
          </div>

          <div className="col-span-12 md:col-span-6">
            <div className="text-[11px] uppercase tracking-[0.2em] text-ink/60">
              {formatEntryDate(entry.date)} · {entry.category} · {readingMinutes(entry)} min
            </div>
            <h2
              lang="my"
              className="font-burmese mt-3 text-2xl font-bold leading-[1.5] md:text-4xl"
            >
              {entry.title}
            </h2>
            <p lang="my" className="font-burmese mt-4 max-w-xl text-sm leading-[2] text-ink/70">
              {entry.excerpt}
            </p>
          </div>

          <div className="col-span-12 md:col-span-3 md:col-start-10">
            <div className="text-[11px] uppercase tracking-[0.2em] text-ink/60">{entry.kicker}</div>
            <div className="mt-5 inline-flex items-center gap-2 border-b border-ink pb-1 text-[11px] uppercase tracking-[0.2em]">
              <span lang="my" className="font-burmese text-xs normal-case tracking-normal">
                ဆက်ဖတ်ရန်
              </span>
              <span>· Read</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
          </div>
        </div>
      </Link>
    </motion.li>
  );
}
