import { toLocalDate } from "@/components/site/booking";

export type EntryListItem = { term: string; text: string };

/**
 * Journal bodies are typed blocks, not flat paragraphs, so an entry can keep
 * the structure it was written with: subheads, a numbered run, a bold-term
 * definition, or a pulled quote.
 */
export type EntryBlock =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "num"; items: EntryListItem[] }
  | { type: "def"; term: string; text: string }
  | { type: "quote"; text: string };

export type JournalEntry = {
  id: number;
  /** English one-liner shown in the mono meta system. */
  kicker: string;
  /** Burmese title — always rendered with font-burmese and lang="my". */
  title: string;
  category: string;
  date: string; // YYYY-MM-DD
  excerpt: string;
  body: EntryBlock[];
};

/** Ordered by publish date: id 1 is the first entry ever, so /blog/1 never changes. */
const ENTRIES: JournalEntry[] = [
  {
    id: 1,
    kicker: "Why Brain Fails At Debugging",
    title: "Debugging အတွက် ဦးနှောက်၏ အလုပ်လုပ်ပုံကို ဆန်းစစ်ခြင်း",
    category: "Debugging",
    date: "2026-08-03",
    excerpt:
      "မနက် ၉ နာရီ ရုံးမရောက်ခင်ထဲက ကြိုရောက်နှင့်နေပြီး issue တစ်ခုကို ရှာရင်း ညနေ ၄ နာရီလောက်ကျမှ ခေါ်သုံးထားတဲ့ variable name က မှားနေတာကို တွေ့လိုက်ရတာမျိုး ဖြစ်ဖူးကြလား။ Debugging တစ်ခုအတွင်း ဦးနှောက်ထဲမှာ ဘာတွေဖြစ်နေလဲ ဆန်းစစ်ကြည့်ထားတယ်။",
    body: [
      {
        type: "p",
        text: "မနက် ၉ နာရီ ကိုယ်ရုံးမရောက်ခင်ထဲက ကြိုရောက်နှင့်နေပြီး issue တစ်ခုကို ရှာရင်း ညနေ ၄ နာရီလောက်ကျမှ ခေါ်သုံးထားတဲ့ variable name က မှားနေတာကို တွေ့လိုက်ရတာမျိုး ဖြစ်ဖူးကြလား။ အခုဒီဘက်ခေတ် coding agent တွေကလဲ အရမ်းကောင်းလာတော့ issue ကို ပြောပြလိုက်တာနဲ့ ၁၀ မိနစ်လောက်နဲ့ ဖြေရှင်းသွားပေးတာမျိုးလဲ ရှိနေပြီ။ ဒါပေမယ့် coding agent တွေ မတိုင်ခင် debugging အတွက် ဦးနှောက်ရဲ့ mental battle တစ်ခုကို တစ်ချက် ဆန်းစစ်ကြည့်ရအောင်။",
      },
      { type: "h", text: "Fight or Flight Mode (Cortisol Surge)" },
      {
        type: "p",
        text: "issue တစ်ခု၊ production ပေါ်မှာ မင်း screen က ပြုတ်ကျနေတယ်ဆိုတာမျိုး စတွေ့လိုက်ရတာနဲ့ Amygdala ရဲ့ တုံ့ပြန်မှု စပါတယ်။ Amygdala ဆိုတာ Emotions၊ Fears နဲ့ Anxiety ကို ထိန်းချုပ်ပေးတဲ့ အဓိက center တစ်ခုပေါ့။",
      },
      {
        type: "p",
        text: "Amygdala က Panic mode ကို ဘယ်လိုပြောင်းပေးလိုက်လဲဆိုတော့ issue တစ်ခု bug တစ်ခု တွေ့တာနဲ့ “ငါ့ရဲ့ အလုပ်အကိုင်/ဂုဏ်သိက္ခာကို ခြိမ်းခြောက်နေတဲ့ အန္တရာယ်” လို့ ခေါင်းစဉ် စတပ်လိုက်တာကနေ စပါတယ်။ အဲ့ဒီလို ခေါင်းစဉ်တပ်ပြီးတာနဲ့ ဦးနှောက်ရဲ့ ပင်မကွပ်ကဲရေးဌာနဖြစ်တဲ့ Hypothalamus ဆီကို အရေးပေါ် SOS Signal လှမ်းပို့ပါတယ်။ Hypothalamus က CRH (Corticotropin-Releasing Hormone) ဆိုတဲ့ Hormone ကို ထုတ်လွှတ်လိုက်ပြီး အဲ့ဒီ CRH က ဦးနှောက်ရဲ့ အောက်ခြေမှာရှိတဲ့ Pituitary Gland ဆီရောက်ပြီး ACTH (Adrenocorticotropic Hormone) ဆိုတဲ့ hormone တစ်ခု ထပ်ထုတ်ပြီး အဲ့ဒီ ACTH က ကျောက်ကပ်အပေါ်မှာရှိတဲ့ Adrenal Glands ဆီကို ရောက်သွားရာကနေ Super Stress hormones (၃) ခုကို စတင်ထုတ်လွှတ်ပါတော့တယ်။",
      },
      {
        type: "num",
        items: [
          {
            term: "Noradrenaline (Tunnel Vision ဖြစ်စေသူ)",
            text: "အာရုံစူးစိုက်မှုကို ကျဉ်းမြောင်းပစ်လိုက်တာကြောင့် Code တစ်ကြောင်းတည်းမှာတင် ပိတ်မိသွားစေတတ်တယ်။",
          },
          {
            term: "Cortisol (Prefrontal Cortex ကို ပိတ်ပစ်သူ)",
            text: "Logic စဉ်းစားပေးတဲ့ ရှေ့ဦးနှောက် (Prefrontal Cortex) ဆီ သွေးနဲ့ glucose ရောက်ရှိမှုကို လျှော့ချပစ်လိုက်ပါတယ်။",
          },
          {
            term: "Adrenaline (ဒေါသနဲ့ စိတ်ဖိစီးမှု တက်စေသူ)",
            text: "ခန္ဓာကိုယ်ထဲ စွမ်းအင်တွေ ပြည့်လာပေမဲ့ ထိုင်ရာက မထဘဲ monitor ရှေ့မှာပဲ ထိုင်နေရလို့ Energy က ထွက်ပေါက်မရှိဘဲ Frustration အဖြစ် ပြောင်းသွားတယ်။",
          },
        ],
      },
      { type: "h", text: "Cognitive Tunnel Vision နှင့် Inattentional Blindness" },
      {
        type: "p",
        text: "ဒီ hormone (၃) ခု ပေါင်းစပ်လိုက်တဲ့အခါ Developer တွေကို မျက်စိလျှမ်းစေနိုင်ပြီး ချွေးပျံစေနိုင်တဲ့ ဒုက္ခ စတင်ကြုံတွေ့စေပါတော့တယ်။",
      },
      {
        type: "def",
        term: "Cognitive Tunnel Vision (အမြင် ကျဉ်းမြောင်းသွားခြင်း)",
        text: "Noradrenaline ကြောင့် ဦးနှောက်က နဂိုသံသယရှိနေတဲ့ code တပိုင်းတစကိုပဲ မျက်စိထဲ စွဲနေစေတယ်။ တကယ့် bug က config file ဒါမှမဟုတ် common method တစ်ခုခုမှာ ဖြစ်နေတာ ဖြစ်နိုင်ပေမယ့် ဦးနှောက်က Noradrenaline ကြောင့် ခြုံငုံစဉ်းစားနိုင်စွမ်း မရှိတော့ပဲ bigger picture ကို မမြင်နိုင်တော့ဘူး။",
      },
      {
        type: "def",
        term: "Inattentional Blindness (မျက်စိရှေ့က အမှားကို မမြင်ရတော့ခြင်း)",
        text: "Cortisol ကြောင့် logic စဉ်းစားတဲ့အပိုင်းက offline ဖြစ်သွားတဲ့အတွက် code ထဲမှာ typo ပါနေတာ၊ constant variable မှားခေါ်သုံးမိထားတာ၊ query မှာ မှား join မိထားတာမျိုး — အဖြေက ကိုယ့်မျက်စိရှေ့မှာ ရှိနေပေမယ့် ကြည့်နေရင်း မမြင်တာမျိုး ဖြစ်သွားစေတတ်တယ်။",
      },
      {
        type: "p",
        text: "နောက်ဆုံးရလဒ်က အဖြေမရှိနေတဲ့ code တစ်ကြောင်းထဲကိုပဲ ထပ်ခါထပ်ခါ ပြန်ဖတ်၊ ပြင်၊ run ပြီး “Repetitive Fixation Loop” ထဲမှာ ပိတ်မိသွားတတ်တယ်။",
      },
      {
        type: "quote",
        text: "အသုံးမကျလို့ ဒီ issue ကို မဖြေရှင်းနိုင်တာ မဟုတ်ဘူး — ဦးနှောက်က blocked ဖြစ်နေတာသာ ဖြစ်တယ်။",
      },
      { type: "h", text: "ဆိုတော့ ဘယ်လိုနည်းလမ်းတွေသုံးပြီး ဦးနှောက်ကို Hack ကြည့်မလဲ" },
      {
        type: "def",
        term: "Rubber Duck Debugging",
        text: "ကိုယ့်စားပွဲပေါ်မှာ ဘဲရုပ်လေးတစ်ခု တင်ထားပြီး အဲ့ဒီအရုပ်ကို ကိုယ်ဖြစ်နေတဲ့ ပြဿနာကို ရှင်းပြပြီး code တွေကို တစ် line ချင်းစီ သူ့ကို ရှင်းပြနေတဲ့ပုံမျိုးနဲ့ သွားရင် ဦးနှောက်က block ပစ်နေတဲ့ code အပိုင်းအစတွေကိုလဲ ကိုယ်ပါ သတိထားမိရက်သား ဖြစ်သွားမယ်၊ false assumption တွေကိုလဲ ကျော်နိုင်မယ်ပေါ့။ အရုပ် မထားချင်ရင်လဲ ကိုယ့်စိတ်ထဲမှာ တခြားတစ်ယောက်ယောက်ကို ရှင်းပြနေတဲ့ပုံမျိုး လုပ်လိုက်လဲ ရတယ်။",
      },
      {
        type: "def",
        term: "Incubation Effect",
        text: "၁၅ မိနစ်လောက်ထိ ထူပူပြီးလို့ အဖြေရှာမတွေ့သေးရင် စိတ်လျှော့ပြီး ထထွက်သွားလိုက်တာ အကောင်းဆုံးပဲ။ ဆေးလိပ်လေးသောက်၊ ရေအေးအေးလေးသောက်၊ လမ်းလေးဘာလေး ထလျှောက်လိုက်တာက မသိစိတ် (subconscious) ကို အလုပ်လုပ်စေပြီး မစဉ်းစားပဲ အဖြေထွက်လာတတ်တယ်။",
      },
      {
        type: "p",
        text: "နောက်တစ်ခုက debug လိုက်ရင်း စဉ်းစားသမျှကို စာရွက်ပေါ် ချရေးဖို့ပါ။ လူတစ်ယောက်မှာ အလုပ်လုပ်ရင်း ဦးနှောက်ရဲ့ အချက်အလက် သိမ်းဆည်းနိုင်စွမ်းက ၄ ခုကနေ ၇ ခုထိပဲ မှတ်နိုင်ပါတယ်။ Variable တွေ Logic တွေကို ခေါင်းထဲ ပြွတ်သိပ်ထည့်မနေပဲ စာရွက်ပေါ် ချရေးတာ၊ Flowchart ဆွဲတာမျိုးတွေ လုပ်ပေးလို့ရတယ်။",
      },
      {
        type: "p",
        text: "နိဂုံးချုပ်ကတော့ bug တစ်ခုရှာလို့ ထူပူနေရင် ကိုယ့်ဦးနှောက်ထဲ ဘာဖြစ်နေပြီဆိုတာ သတိပြုနိုင်ပြီး ဆင်ခြင်နိုင်စွမ်း မြင့်တက်အောင်လို့ ခေါင်းအေးအေး ထားတတ်ဖို့ဖြစ်တယ်။ အသုံးမကျလို့ ဒီ issue ကို မဖြေရှင်းနိုင်တာမဟုတ်ပဲ ဦးနှောက်ရဲ့ အထက်က ရှင်းပြခဲ့တဲ့ အခြေအနေတွေကြောင့်သာ blocked ဖြစ်နေတာဖြစ်တယ်။ ကိုယ့်စိတ်နဲ့ mindset ကို ကြိုတင်ပြင်ဆင်တာက နောက် bug တွေ issue တွေကို ဖြေရှင်းတဲ့အခါ အချိန်ရော လူကိုရော ပိုမို သက်သာစေမှာ ဖြစ်ပါတယ်။",
      },
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

const blockText = (block: EntryBlock): string => {
  switch (block.type) {
    case "num":
      return block.items.map((item) => item.term + item.text).join("");
    case "def":
      return block.term + block.text;
    default:
      return block.text;
  }
};

/** Burmese reads slower than Latin on screen; ~500 chars/min is a fair floor. */
export const readingMinutes = (entry: JournalEntry) =>
  Math.max(2, Math.round(entry.body.map(blockText).join("").length / 500));

export function formatEntryDate(iso: string): string {
  const d = toLocalDate(iso);
  return `${d.getDate()} ${d.toLocaleString("en-US", { month: "short" })} ${d.getFullYear()}`;
}
