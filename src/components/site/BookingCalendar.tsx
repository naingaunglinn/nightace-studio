import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

import { bookingHref, contactEmail, hasBookingPage, openDates } from "@/components/site/booking";

const openSet = new Set(openDates);

// The months the calendar can page through — only months holding an open date.
const months = [...new Set(openDates.map((d) => d.slice(0, 7)))].map((key) => {
  const [y, m] = key.split("-").map(Number);
  return [y, m - 1] as const;
});

const monthName = (year: number, month: number, style: "short" | "long") =>
  new Date(year, month, 1).toLocaleString("en-US", { month: style });

// Week starts on Sunday, like the agenda reference.
const DOW = ["S", "M", "T", "W", "T", "F", "S"];

function monthCells(year: number, month: number): (number | null)[] {
  const lead = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array.from({ length: lead }, () => null),
    ...Array.from({ length: days }, (_, i) => i + 1),
  ];
  while (cells.length % 7) cells.push(null);
  return cells;
}

/**
 * Inline booking calendar for the contact section: a hairline month grid in
 * the site's print system where open dates carry a seal-red mark and link to
 * the Google booking page (or a pre-filled email until that link exists).
 */
export function BookingCalendar() {
  const [active, setActive] = useState(0);

  if (months.length === 0) {
    return (
      <a
        href={`mailto:${contactEmail}?subject=Booking`}
        className="group inline-flex items-center gap-2 border-b border-ink pb-1 text-[11px] uppercase tracking-[0.2em]"
      >
        Email to book
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </a>
    );
  }

  const [year, month] = months[Math.min(active, months.length - 1)];
  const cells = monthCells(year, month);
  const isoOf = (day: number) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between">
        <div className="flex items-baseline gap-3 text-sm lowercase">
          <span aria-hidden className="text-ink/50">
            →
          </span>
          {months.map(([y, m], i) => (
            <button
              key={`${y}-${m}`}
              type="button"
              onClick={() => setActive(i)}
              className={`cursor-pointer pb-0.5 transition-colors ${
                i === active ? "border-b border-ink text-ink" : "text-ink/40 hover:text-ink"
              }`}
            >
              {monthName(y, m, "short").toLowerCase()}
            </button>
          ))}
        </div>
        <span className="text-[10px] uppercase tracking-[0.22em] text-ink/50">{year}</span>
      </div>

      <div className="grid grid-cols-7 gap-px border border-ink/15 bg-ink/15">
        {DOW.map((d, i) => (
          <div
            key={i}
            className="bg-paper py-1.5 text-center text-[9px] uppercase tracking-[0.2em] text-ink/40"
          >
            {d}
          </div>
        ))}
        {cells.map((day, i) => {
          if (day === null) return <div key={i} className="h-11 bg-paper md:h-16" />;
          const iso = isoOf(day);
          if (!openSet.has(iso)) {
            return (
              <div key={i} className="flex h-11 items-start bg-paper p-1.5 md:h-16 md:p-2">
                <span className="font-display text-lg leading-none text-ink/15 md:text-2xl">
                  {day}
                </span>
              </div>
            );
          }
          const { href, external } = bookingHref(iso);
          return (
            <a
              key={i}
              href={href}
              {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
              aria-label={`Book ${monthName(year, month, "long")} ${day}, ${year}`}
              className="group relative flex h-11 items-start bg-paper p-1.5 transition-colors hover:bg-ink md:h-16 md:p-2"
            >
              <span className="font-display text-lg leading-none text-ink transition-colors group-hover:text-paper md:text-2xl">
                {day}
              </span>
              <span
                aria-hidden
                className="absolute inset-x-1.5 bottom-1.5 h-[3px] bg-seal md:inset-x-2 md:bottom-2"
              />
            </a>
          );
        })}
      </div>

      <div className="mt-3 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-ink/50">
        <span className="inline-flex items-center gap-2">
          <span aria-hidden className="h-[3px] w-3.5 bg-seal" />
          Open — click to book
        </span>
        <span>{hasBookingPage ? "via Google Calendar" : "via email"}</span>
      </div>
    </div>
  );
}
