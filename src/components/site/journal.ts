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
    title: "ရှာဖွေမှုနှင့် အချက်အလက် သိမ်းဆည်းခြင်းအတွက် ဦးနှောက်၏ အလုပ်လုပ်ပုံကို ဆန်းစစ်ခြင်း",
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
  {
    id: 2,
    kicker: "Agile Beyond Software",
    title: "Agile Psychology: ကိုယ့် Plan Fail သွားတိုင်း ပြိုလဲနေရမှာလား?",
    category: "Mindset",
    date: "2026-08-22",
    excerpt:
      "တခါတလေ ကျွန်တော်တို့ဘဝကို Waterfall Model တစ်ခုလို တွေးမိတတ်ကြပါတယ်။ Plan တစ်ခုလွဲသွားတာနဲ့ ကိုယ့်ဘဝတစ်ခုလုံး Failure ဖြစ်သွားသလို ခံစားမိတတ်ကြတယ်။ Agile ရဲ့ အခြေခံသဘောတရားတွေကို စိတ်ပညာနဲ့ ချိတ်ဆက်ပြီး ကြည့်ထားတယ်။",
    body: [
      {
        type: "p",
        text: "တခါတလေ ကျွန်တော်တို့ဘဝကို Waterfall Model တစ်ခုလို တွေးမိတတ်ကြပါတယ်။ အစကတည်းက အရာအားလုံးကို သတ်မှတ်ထားပြီး၊ Plan တစ်ခုလွဲသွားတာနဲ့ ကိုယ့်ဘဝတစ်ခုလုံး Failure ဖြစ်သွားသလို ခံစားမိတတ်ကြတယ်။ ဒါဟာ Software Development နည်းလမ်းတစ်ခုကို ဘဝမှာ သွားသုံးထားလို့ ဖြစ်လာတဲ့ ပြဿနာ မဟုတ်ပါဘူး။ ကျွန်တော်တို့စိတ်ထဲမှာ ကိန်းဝပ်နေတဲ့ Psychological Mechanisms တွေကြောင့် ဖြစ်နေတတ်ပါတယ်။",
      },
      {
        type: "p",
        text: "Waterfall Model လိုမျိုး ဘဝကို အစကတည်းက ပုံသေသတ်မှတ်ထားချင်သည့် အတွေးအခေါ်မျိုးနဲ့ လူတွေဟာ မရေရာမှုတွေကို အဆင်မပြေသလို ခံစားရတတ်ပြီး အနာဂတ်ကို ကြိုတင်ခန့်မှန်းနိုင်ဖို့နဲ့ ထိန်းချုပ်နိုင်ဖို့ ကြိုးစားမိတတ်ကြတယ်။ Waterfall Model မှာ အစောပိုင်းအဆင့်တွေမှာ Requirements နဲ့ Design ကို အတော်အတန် ကြိုတင်သတ်မှတ်ပြီး နောက်အဆင့်တွေကို အစီအစဉ်တကျ ဆက်သွားသလိုပဲ၊ ဘဝကို ပုံသေကားချပ်တစ်ခုလို သတ်မှတ်ချင်နေတဲ့ အတွေးအခေါ်ရဲ့ နောက်ကွယ်မှာ အောက်ပါ စိတ်ပညာသဘောတရားတွေ ရှိနေတတ်ပါတယ်။",
      },
      {
        type: "def",
        term: "Need for Certainty (သေချာရေရာမှုကို လိုလားခြင်း)",
        text: "မရေရာတဲ့ အနာဂတ်ကို ရင်ဆိုင်ရတဲ့အခါ အရာရာကို အစကတည်းက သေချာစီမံချင်လိုစိတ်။",
      },
      {
        type: "def",
        term: "Perfectionism & Fear of Failure",
        text: "“အမှားမပါရဘူး၊ Perfect ဖြစ်ရမယ်” ဆိုတဲ့စိတ်ဓာတ်ကြောင့် အမှားတစ်ခု ဖြစ်သွားတာနဲ့ ကိုယ့်ကိုယ်ကို အပြစ်တင်ပြီး စိတ်ဓာတ်ကျတတ်ခြင်း။",
      },
      {
        type: "def",
        term: "All-or-Nothing Thinking (အစွန်းနှစ်ဖက် ထွက်သော အတွေးအမြင်)",
        text: "စိတ်ပညာမှာ ဒါကို Cognitive Distortion လို့ ခေါ်ပါတယ်။ “ငါ့ ပလန်အတိုင်း မဖြစ်ရင် ငါ့ဘဝတစ်ခုလုံး ကျရှုံးတာပဲ” ဆိုပြီး အလယ်အလတ်လမ်းကို မမြင်နိုင်တော့သည့် အခြေအနေ။",
      },
      {
        type: "h",
        text: "Agile Mindset: Cognitive Flexibility နှင့် Resilience ကို တည်ဆောက်ခြင်း",
      },
      {
        type: "p",
        text: "Agile Framework ကို Software Development ရဲ့ လုပ်ငန်းခွင်သုံး နည်းလမ်းတစ်ခုအဖြစ်ပဲ မမြင်ဘဲ၊ သူ့ရဲ့ အခြေခံသဘောတရားတွေကို စိတ်ပညာနဲ့ ချိတ်ဆက်ပြီး ကြည့်မယ်ဆိုရင် ဒါဟာ အပြောင်းအလဲကို လိုက်လျောညီထွေ လက်ခံနိုင်မယ့် စိတ်ပိုင်းဆိုင်ရာ သဏ္ဌာန်ကို တည်ဆောက်ယူတာ ဖြစ်တယ်။",
      },
      { type: "h", text: "၁။ Sprints & Incremental Progress (အလုပ်တွေကို ခွဲထုတ်ခြင်း)" },
      {
        type: "p",
        text: "Agile မှာ လပေါင်းများစွာစာ အလုပ်ကို တစ်ပြိုင်နက် မလုပ်ဘဲ ၁ ပတ် သို့မဟုတ် ၂ ပတ်စာ Sprint လေးတွေအဖြစ် ခွဲထုတ်သလိုပဲ၊ ဘဝရဲ့ ဝန်တွေကိုလည်း အစိတ်စိတ်အမြွှာမြွှာ ခွဲထားဖို့ လိုပါတယ်။ လက်ရှိလုပ်ရမယ့် အလုပ်တွေကို အပိုင်းသေးသေးလေးတွေ (Small Chunks) ခွဲထားခြင်းက တစ်ချိန်တည်း ကိုင်တွယ်ရမယ့် Workload ကို လျှော့ချနိုင်ပြီး Stress တွေကို စီမံရလွယ်စေနိုင်ပါတယ်။ အထပ်မြင့်တက်တဲ့အခါ အပေါ်ဆုံးအထပ်ကို ကြည့်ပြီး အသက်ရှုကျပ်မယ့်အစား နောက်ရောက်မယ့် တစ်ထပ်တည်းကိုပဲ အာရုံစိုက်တာက စိတ်ထဲမှာ ‘အရာအားလုံးကို တစ်ပြိုင်နက် ဖြေရှင်းရမယ်’ ဆိုတဲ့ ခံစားချက်ကို လျှော့ချပြီး လက်ရှိလုပ်ရမယ့်အရာကို ပိုရှင်းရှင်းလင်းလင်း အာရုံစိုက်နိုင်စေပါတယ်။",
      },
      { type: "h", text: "၂။ Minimum Viable Product - MVP (Perfectionism ကို ကျော်လွန်ခြင်း)" },
      {
        type: "p",
        text: "Agile နဲ့ Lean Product Development မှာ အသုံးများတဲ့ MVP ရဲ့ အဓိကအချက်က အရည်အသွေးကို လျှော့ချတာ မဟုတ်ပါဘူး။ မလိုအပ်ဘဲ အချိန်ဆွဲမနေဘဲ Feedback မြန်မြန်ရဖို့အတွက် အနိမ့်ဆုံး သုံးလို့ရတဲ့ Version တစ်ခုကို စတင်ထုတ်လုပ်တာပါ။",
      },
      {
        type: "def",
        term: "❌ Rigid / Perfectionist Mindset",
        text: "“စာကောင်းကောင်း မရေးတတ်သေးလို့ စမရေးသေးဘူး။” (အမှားဖြစ်မှာကြောက်လို့ အချိန်ဆွဲတာ)",
      },
      {
        type: "def",
        term: "✅ Agile Mindset",
        text: "Draft ရေး ➔ Publish လုပ် ➔ Feedback ယူ ➔ Improve လုပ် ➔ Next Iteration ကိုဆက်သွား။ အမှားတွေကို ကြိုတင်လက်ခံပြီး ပထမဆုံး ခြေလှမ်းကို စလှမ်းခြင်းက Feedback မြန်မြန်ရစေပြီး အနာဂတ်အတွက် ပိုမိုကောင်းမွန်တဲ့ Version ကို ဖန်တီးနိုင်စေပါတယ်။",
      },
      {
        type: "h",
        text: "၃။ Retrospective & Feedback Loops (စိတ်ရဲ့ Source Code ကို Refactor လုပ်ခြင်း)",
      },
      {
        type: "p",
        text: "Software Sprint တစ်ခုအပြီးမှာ Sprint Retrospective လုပ်ပြီး “ဘာတွေ အဆင်ပြေခဲ့သလဲ၊ ဘာတွေ ပြင်ရမလဲ” ဆိုတာ ဆွေးနွေးသလိုပဲ၊ ဘဝမှာလည်း သီးသန့်အချိန်တစ်ခုပေးပြီး မိမိကိုယ်ကို ပြန်လည်သုံးသပ်ပါ။ ကျရှုံးမှုတစ်ခု၊ အမှားတစ်ခုကို ကိုယ့် Self-value (ကိုယ့်တန်ဖိုး) နဲ့ မချိတ်ဆက်ဘဲ “နောက်တစ်ကြိမ်မှာ ဘာကို ဘယ်လို ပြောင်းလဲနိုင်မလဲ” ဆိုတဲ့ Feedback အဖြစ် ပြန်ကြည့်တာဟာ စိတ်၏ Source Code ကို Refactor လုပ်တာနဲ့ တူတူပဲ။",
      },
      {
        type: "h",
        text: "၄။ Adaptation over Rigid Planning (အပြောင်းအလဲကို လိုက်လျောညီထွေ လက်ခံခြင်း)",
      },
      {
        type: "p",
        text: "စိတ်ရဲ့ Agility ဆိုတာ Cognitive Flexibility (အခြေအနေပြောင်းတဲ့အခါ အတွေးအမြင်နှင့် နည်းလမ်းကို ပြောင်းနိုင်စွမ်း) နှင့် Resilience (ကျရှုံးမှုကြားမှ ပြန်လည်ရုန်းထနိုင်စွမ်း) နှစ်ခုစလုံး ပေါင်းစပ်ထားတာ ဖြစ်တယ်။",
      },
      {
        type: "p",
        text: "Code ထဲ Bug ပါလာတာ၊ Task တွေ Delay ဖြစ်တာ၊ Customer Feedback မကောင်းတာ၊ ဒါမှမဟုတ် Development လမ်းခုလတ်မှာ Requirements ပြောင်းသွားတာတွေဟာ Project တစ်ခုလုံးကို ဖျက်ပစ်ရမယ်လို့ အဓိပ္ပာယ်မသက်ရောက်ဘူး။",
      },
      {
        type: "p",
        text: "ကိုယ့်ကိုယ်ကို အပြစ်တင်ပြီး ထိုင်စိတ်ညစ်နေမယ့်အစား အဲဒါတွေကို Feedback အဖြစ်သုံးပြီး နောက် Sprint မှာ ဘာပိုကောင်းအောင် လုပ်ရမလဲဆိုတာကို ပြန်လည်ပြင်ဆင်ရုံပါပဲ။",
      },
      {
        type: "p",
        text: "Agile Mindset ဆိုတာ Plan မရှိဘဲ နေထိုင်တာ မဟုတ်ပါဘူး။ Plan ရှိပေမယ့် အခြေအနေပြောင်းလာတဲ့အခါ Plan ကို ပြန်ပြင်ဖို့ ဆန္ဒရှိနေခြင်းပါ။",
      },
      {
        type: "quote",
        text: "ဘဝမှာ ကိစ္စတိုင်းအတွက် Perfect Plan တစ်ခုထက် Adapt လုပ်နိုင်တဲ့ Mindset တစ်ခုက ပိုတန်ဖိုးရှိပါတယ်။",
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
