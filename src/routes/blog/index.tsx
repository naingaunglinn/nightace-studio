import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { JournalEntryRow } from "@/components/site/JournalEntryRow";
import { journalEntries, journalCountLabel } from "@/components/site/journal";

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
          <MetaCell label="Section" value="§ 05 — Journal" />
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
          <JournalEntryRow key={entry.id} entry={entry} index={i} />
        ))}
      </ol>
    </section>
  );
}
