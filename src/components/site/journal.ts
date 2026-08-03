import { toLocalDate } from "@/components/site/booking";

export type JournalEntry = {
  id: number;
  /** English one-liner shown in the mono meta system. */
  kicker: string;
  /** Burmese title — always rendered with font-burmese and lang="my". */
  title: string;
  category: string;
  date: string; // YYYY-MM-DD
  excerpt: string;
  quote?: string;
  body: string[];
};

/** Ordered by publish date: id 1 is the first entry ever, so /blog/1 never changes. */
const ENTRIES: JournalEntry[] = [
  {
    id: 1,
    kicker: "Why the studio is called Nightace",
    title: "ညကို အလုပ်ခန်းလုပ်တဲ့ စတူဒီယို",
    category: "Studio",
    date: "2026-05-30",
    excerpt:
      "စတူဒီယိုကို ဘာကြောင့် Nightace လို့ ခေါ်လဲ မေးကြတယ်။ အဖြေက ရိုးရိုးလေး — ကျွန်တော်တို့ရဲ့ အလုပ်အများစုက ညဘက်မှာ ဖြစ်တယ်။",
    quote: "ညမှာ ဆူညံသံ မရှိတော့ — အသေးစိတ်တွေရဲ့ အသံကို ပြန်ကြားရတယ်။",
    body: [
      "စတူဒီယိုကို ဘာကြောင့် Nightace လို့ ခေါ်လဲ မေးကြတယ်။ အဖြေက ရိုးရိုးလေး — ကျွန်တော်တို့ရဲ့ အလုပ်အများစုက ညဘက်မှာ ဖြစ်တယ်။ ရန်ကုန်မြို့ ငြိမ်သွားချိန်၊ လမ်းပေါ်က အသံတွေ လျော့သွားချိန်ကျမှ စခရင်ရှေ့မှာ ထိုင်ပြီး စာလုံးတစ်လုံးချင်း၊ အကွာအဝေးတစ်ခုချင်းကို သေချာ ကြည့်နိုင်တယ်။",
      "ကျွန်တော်တို့က နှစ်ယောက်တည်းရှိတဲ့ စတူဒီယိုသေးသေးလေး။ ပရောဂျက် အများကြီး မယူဘူး — နည်းနည်းကိုပဲ ကြာကြာ ကိုင်ထားတယ်။ လက်ရာတစ်ခုကို အချိန်ပေးလေ၊ မလိုတာတွေ ဖြုတ်ရဲလေ ဆိုတာ ကိုယ်တွေ့ သိလာတယ်။",
      "ကျွန်တော်တို့ ဝဘ်ဆိုက် ဆောက်တဲ့ပုံစံက ပုံနှိပ်စာမျက်နှာ စီတဲ့သူရဲ့ စိတ်ဓာတ်နဲ့ ဆင်တယ်။ margin တစ်ခုချင်း၊ စာလုံးတစ်လုံးချင်း၊ တိတ်ဆိတ်မှုတစ်ခုချင်းကို ရည်ရွယ်ချက်နဲ့ ထားတယ်။ ဂျပန် graphic design ကနေ သင်ယူထားတာ များတယ် — အလွတ်နေရာကလည်း ဒီဇိုင်းရဲ့ အစိတ်အပိုင်းပဲ။",
      "ဒီ Journal ကို ဘာအတွက် ဖွင့်လဲဆိုတော့ — အလုပ်လုပ်ရင်း တွေ့တာ၊ သင်ယူမိတာတွေကို မြန်မာလို ချရေးထားချင်လို့။ design နဲ့ typography အကြောင်း မြန်မာလို ရေးထားတဲ့ စာတွေက ရှားတယ်။ ရှားနေတာကြောင့်ပဲ ရေးသင့်တယ်လို့ ယုံကြည်တယ်။",
    ],
  },
  {
    id: 2,
    kicker: "On Burmese web typography",
    title: "မြန်မာစာကို ပုံနှိပ်စာလို စီခြင်း",
    category: "Typography",
    date: "2026-06-19",
    excerpt:
      "ဝဘ်ပေါ်မှာ မြန်မာစာဟာ နောက်မှ ထည့်လိုက်တဲ့ အရာတစ်ခုလို ဖြစ်နေတတ်တယ်။ ဒီမှတ်စုက အဲဒါကို ပြောင်းချင်တဲ့ စတူဒီယိုတစ်ခုရဲ့ နည်းလမ်းတွေ။",
    quote: "စာလုံးက အော်နေစရာ မလိုဘူး — နေရာ မှန်ရင် ကြားရတယ်။",
    body: [
      "ဝဘ်ပေါ်မှာ မြန်မာစာဟာ မကြာခဏ နောက်မှ ထည့်လိုက်တဲ့ အရာတစ်ခုလို ဖြစ်နေတတ်တယ်။ Latin စာလုံးအတွက် ဒီဇိုင်းအရင်ဆွဲ၊ ပြီးမှ မြန်မာစာကို နေရာထဲ ထိုးထည့်လိုက်တော့ စာကြောင်းတွေ ကျပ်နေတယ်၊ အပေါ်အောက် သင်္ကေတတွေ ထိနေကြတယ်။",
      "မြန်မာအက္ခရာက Latin ထက် အမြင့် ပိုယူတယ် — အပေါ်မှာ တင်တဲ့ သင်္ကေတ၊ အောက်မှာ ဆင့်တဲ့ အက္ခရာတွေ ရှိတယ်။ ဒါကြောင့် line-height ကို Latin အတွက် ပေးနေကျထက် သိသိသာသာ ပိုပေးရတယ်။ ဒီ Journal ရဲ့ body text မှာ နှစ်ဆနီးပါး ထားတယ်။ စာဖတ်တာက အသက်ရှုသလိုပဲ — စာကြောင်းကြားက နေရာလွတ်က အသက်ရှုချိန်။",
      "ဖောင့်ရွေးတဲ့အခါ Pyidaungsu (ပြည်ထောင်စုဖောင့်) ကို ရွေးတယ်။ မြန်မာ Unicode ရဲ့ စံဖောင့်ဖြစ်ပြီး မျဉ်းကြောင်းတွေ တည်ငြိမ်တယ်၊ စခရင်ပေါ်မှာ ဖတ်ရလွယ်တယ်။ အခု ဖတ်နေရတဲ့ စာလုံးတွေ အားလုံး Pyidaungsu နဲ့ စီထားတာ။",
      "နောက်ဆုံး တစ်ခု — မြန်မာစာအတွက် ဒီဇိုင်းဆွဲတဲ့အခါ စာလုံးကို အလှတန်ဆာလို မမြင်ပါနဲ့။ ဖတ်ရလွယ်မှုကို အရင်ထားပါ။ တိတ်ဆိတ်တဲ့ typography ဆိုတာ မသိမသာ ဖြစ်နေတာ မဟုတ်ဘူး — ဖတ်သူကို မနှောင့်ယှက်တာ။",
    ],
  },
  {
    id: 3,
    kicker: "On restraint in motion design",
    title: "လှုပ်ရှားမှု နည်းလေ ပြောနိုင်လေ",
    category: "Motion",
    date: "2026-07-28",
    excerpt:
      "Scroll လိုက်တိုင်း တစ်ခုခု ပျံလာတဲ့ ဝဘ်ဆိုက်တွေ များလာတယ်။ ဒါပေမယ့် အကုန်လုံး လှုပ်နေရင် ဘာမှ မလှုပ်သလိုပဲ ဖြစ်သွားတယ်။",
    quote: "အကုန်လုံး လှုပ်နေရင် — ဘာမှ မလှုပ်သလိုပဲ။",
    body: [
      "Motion ကို အခုခေတ် ဝဘ်ဆိုက်တိုင်းမှာ တွေ့နေရပြီ — scroll လိုက်တိုင်း တစ်ခုခု ပျံလာတယ်၊ ပွင့်လာတယ်၊ လည်နေတယ်။ ဒါပေမယ့် အကုန်လုံး လှုပ်နေရင် ဘာမှ မလှုပ်သလိုပဲ ဖြစ်သွားတယ်။ မျက်စိက ဘယ်နေရာ ကြည့်ရမလဲ မသိတော့ဘူး။",
      "ကျွန်တော်တို့ စတူဒီယိုရဲ့ စည်းမျဉ်းက — တစ်မျက်နှာမှာ အလေးထားတဲ့ လှုပ်ရှားမှု တစ်ခုပဲ ထားမယ်။ ကျန်တာတွေက အဲဒီတစ်ခုကို ထောက်ပံ့ရုံပဲ။ ကျွန်တော်တို့ hero မှာ စာလုံးတွေ တစ်လုံးချင်း တက်လာတဲ့ အချိန်ကွာခြားချက်က ၃၅ms ပဲ ရှိတယ် — မျက်စိက သေချာ မမြင်ပေမယ့် လက်ရာကို ခံစားမိတယ်။",
      "Easing ကလည်း အရေးကြီးတယ်။ အစမှာ မြန်ပြီး အဆုံးမှာ ဖြည်းဖြည်း ရပ်တဲ့ ကွေးကြောင်းကို သုံးရတာ များတယ် — စက္ကူပေါ် တံဆိပ်တုံး နှိပ်လိုက်သလို။ ခပ်တည်တည် ရောက်လာပြီး တည်ငြိမ်စွာ ရပ်တယ်။",
      "နောက်ဆုံးအချက် — prefers-reduced-motion ကို လေးစားပါ။ လှုပ်ရှားမှု မလိုချင်တဲ့သူအတွက်လည်း စာမျက်နှာက ပြည့်ပြည့်ဝဝ အလုပ်လုပ်နေရမယ်။ Motion ဆိုတာ မရှိမဖြစ် မဟုတ်ဘူး — ရှိမယ်ဆိုရင်တော့ အဓိပ္ပာယ် ရှိရမယ်။",
    ],
  },
];

const BURMESE_DIGITS = "၀၁၂၃၄၅၆၇၈၉";

export const toBurmeseDigits = (value: number | string) =>
  String(value).replace(/\d/g, (d) => BURMESE_DIGITS[Number(d)]);

/** Two-digit Burmese entry numeral: 1 → ၀၁. */
export const entryNo = (id: number) => toBurmeseDigits(String(id).padStart(2, "0"));

/** Newest first, for the index page. */
export const journalEntries = [...ENTRIES].sort((a, b) => b.id - a.id);

export const journalCountLabel = `${String(ENTRIES.length).padStart(2, "0")} ${
  ENTRIES.length === 1 ? "entry" : "entries"
}`;

export const getEntry = (postId: string) => ENTRIES.find((e) => String(e.id) === postId);

export const olderEntry = (entry: JournalEntry) =>
  ENTRIES.find((e) => e.id === entry.id - 1) ?? null;

export const newerEntry = (entry: JournalEntry) =>
  ENTRIES.find((e) => e.id === entry.id + 1) ?? null;

/** Burmese reads slower than Latin on screen; ~500 chars/min is a fair floor. */
export const readingMinutes = (entry: JournalEntry) =>
  Math.max(2, Math.round(entry.body.join("").length / 500));

export function formatEntryDate(iso: string): string {
  const d = toLocalDate(iso);
  return `${d.getDate()} ${d.toLocaleString("en-US", { month: "short" })} ${d.getFullYear()}`;
}
