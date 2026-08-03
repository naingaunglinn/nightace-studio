const CONTACT_EMAIL = "hello@nightace-studio.dev";

/**
 * Google Calendar appointment-schedule link.
 *
 * Google Calendar → Create → Appointment schedule → Share → copy the link and
 * paste it here. Open dates link to it; while it is empty they fall back to a
 * pre-filled email, so this is always safe to ship.
 */
const BOOKING_URL = "";

// Only ever send visitors to Google Calendar itself — never widen this to
// accept request, user, or env-derived input without keeping this validation.
export const hasBookingPage = BOOKING_URL.startsWith("https://calendar.google.com/");

/**
 * Days currently open for intro calls, as YYYY-MM-DD. This one list drives the
 * contact calendar, its "days open" count and the hero booking chip.
 */
const OPEN_DATES = [
  "2026-08-06",
  "2026-08-11",
  "2026-08-18",
  "2026-08-27",
  "2026-09-08",
  "2026-09-15",
];

export const openDates = [...OPEN_DATES].sort();
export const openDateCount = openDates.length;

/** Parse YYYY-MM-DD as a local date so it never shifts across timezones. */
export function toLocalDate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

const quarterOf = (d: Date) => Math.floor(d.getMonth() / 3) + 1;

/** e.g. "Q3 · 2026", widening to "Q3–Q4 · 2026" when open dates span quarters. */
export const bookingQuarterLabel = (() => {
  const first = openDates[0];
  if (!first) return "by request";
  const a = toLocalDate(first);
  const b = toLocalDate(openDates[openDates.length - 1]);
  if (a.getFullYear() !== b.getFullYear())
    return `Q${quarterOf(a)} ${a.getFullYear()} — Q${quarterOf(b)} ${b.getFullYear()}`;
  if (quarterOf(a) !== quarterOf(b))
    return `Q${quarterOf(a)}–Q${quarterOf(b)} · ${a.getFullYear()}`;
  return `Q${quarterOf(a)} · ${a.getFullYear()}`;
})();

/** Where an open date sends the visitor: the Google booking page, or a
 * pre-filled email until that link exists. */
export function bookingHref(iso: string): { href: string; external: boolean } {
  if (hasBookingPage) return { href: BOOKING_URL, external: true };
  const d = toLocalDate(iso);
  const day = `${d.getDate()} ${d.toLocaleString("en-US", { month: "short" })} ${d.getFullYear()}`;
  return {
    href: `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Booking — ${day}`)}`,
    external: false,
  };
}

export const contactEmail = CONTACT_EMAIL;
