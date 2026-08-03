import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import {
  entryNo,
  formatEntryDate,
  readingMinutes,
  type JournalEntry,
} from "@/components/site/journal";

/** One journal entry as an index row — used by the /blog index and the landing teaser. */
export function JournalEntryRow({ entry, index }: { entry: JournalEntry; index: number }) {
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
            <h3
              lang="my"
              className="font-burmese mt-3 text-2xl font-bold leading-[1.5] md:text-4xl"
            >
              {entry.title}
            </h3>
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
