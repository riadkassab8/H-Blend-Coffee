export interface TimelineItem {
  year: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
}

export interface TeamMember {
  name: string;
  nameAr: string;
  role: string;
  roleAr: string;
  bio: string;
  bioAr: string;
}

export interface Origin {
  country: string;
  countryAr: string;
  region: string;
  regionAr: string;
  notes: string;
  notesAr: string;
}

export interface PhilosophyStep {
  num: string;
  title: string;
  titleAr: string;
  text: string;
  textAr: string;
}

export const timeline: TimelineItem[] = [
  {
    year: "2019",
    title: "Founded",
    titleAr: "التأسيس",
    description: "Two coffee-obsessed friends opened a single espresso bar in Maadi with a secondhand La Marzocco and a clear vision.",
    descriptionAr: "افتتح صديقان مهووسان بالقهوة بار إسبريسو واحد في المعادي مع لا مارزوكو مستعملة ورؤية واضحة.",
  },
  {
    year: "2020",
    title: "First Roastery",
    titleAr: "أول محمصة",
    description: "We brought roasting in-house. More control meant better coffee — and the beginning of our house blend.",
    descriptionAr: "أحضرنا التحميص داخلياً. المزيد من التحكم يعني قهوة أفضل - وبداية خلطتنا المنزلية.",
  },
  {
    year: "2022",
    title: "Three Branches",
    titleAr: "ثلاثة فروع",
    description: "Zamalek and Downtown joined Maadi. Each branch designed to feel distinct but unmistakably AROMA.",
    descriptionAr: "انضم الزمالك ووسط البلد إلى المعادي. كل فرع مصمم ليشعر بالتميز ولكن بلا شك أروما.",
  },
  {
    year: "2024",
    title: "Digital Launch",
    titleAr: "الإطلاق الرقمي",
    description: "Taking AROMA beyond the café — beans to your door, reservations online, and a community built around craft.",
    descriptionAr: "نأخذ أروما إلى ما وراء المقهى - الحبوب إلى بابك، الحجوزات عبر الإنترنت، ومجتمع مبني حول الحرفية.",
  },
];

export const team: TeamMember[] = [
  {
    name: "Yasmine Adel",
    nameAr: "ياسمين عادل",
    role: "Co-Founder & Head Roaster",
    roleAr: "مؤسس مشارك ورئيس التحميص",
    bio: "Trained in Melbourne. Obsessed with Ethiopia.",
    bioAr: "تدربت في ملبورن. مهووسة بإثيوبيا.",
  },
  {
    name: "Ahmed Saleh",
    nameAr: "أحمد صالح",
    role: "Co-Founder & Creative Director",
    roleAr: "مؤسس مشارك ومدير إبداعي",
    bio: "Former architect. Now designs experiences, not buildings.",
    bioAr: "مهندس معماري سابق. الآن يصمم التجارب، وليس المباني.",
  },
  {
    name: "Nour Ibrahim",
    nameAr: "نور إبراهيم",
    role: "Head Barista",
    roleAr: "رئيس الباريستا",
    bio: "SCA certified. Placed 2nd in Egyptian Barista Championship 2023.",
    bioAr: "معتمد من SCA. حصل على المركز الثاني في بطولة الباريستا المصرية 2023.",
  },
  {
    name: "Rania Khalil",
    nameAr: "رانيا خليل",
    role: "Operations Director",
    roleAr: "مدير العمليات",
    bio: "Keeps three branches running like one perfect shot.",
    bioAr: "تحافظ على تشغيل ثلاثة فروع مثل جرعة مثالية واحدة.",
  },
];

export const origins: Origin[] = [
  {
    country: "Ethiopia",
    countryAr: "إثيوبيا",
    region: "Yirgacheffe",
    regionAr: "يرغاتشيف",
    notes: "Floral, bergamot, bright acidity",
    notesAr: "زهري، برغموت، حموضة زاهية",
  },
  {
    country: "Colombia",
    countryAr: "كولومبيا",
    region: "Huila",
    regionAr: "هويلا",
    notes: "Caramel, red fruit, silky body",
    notesAr: "كراميل، فاكهة حمراء، قوام حريري",
  },
  {
    country: "Brazil",
    countryAr: "البرازيل",
    region: "Cerrado",
    regionAr: "سيرادو",
    notes: "Chocolate, walnut, low acidity",
    notesAr: "شوكولاتة، جوز، حموضة منخفضة",
  },
  {
    country: "Guatemala",
    countryAr: "غواتيمالا",
    region: "Antigua",
    regionAr: "أنتيغوا",
    notes: "Spice, dark fruit, complex finish",
    notesAr: "توابل، فاكهة داكنة، نهاية معقدة",
  },
];

export const philosophySteps: PhilosophyStep[] = [
  {
    num: "01",
    title: "Source with intention",
    titleAr: "المصدر بنية",
    text: "We visit origin annually. We pay above Fair Trade. We build relationships, not transactions.",
    textAr: "نزور المنشأ سنوياً. ندفع أعلى من التجارة العادلة. نبني علاقات، وليس معاملات.",
  },
  {
    num: "02",
    title: "Roast with precision",
    titleAr: "التحميص بدقة",
    text: "Every batch profiled, logged, and tasted. We roast light to preserve origin character.",
    textAr: "كل دفعة يتم تحديد ملفها، تسجيلها، وتذوقها. نحمص خفيفاً للحفاظ على طابع المنشأ.",
  },
  {
    num: "03",
    title: "Serve with care",
    titleAr: "التقديم بعناية",
    text: "Our baristas train for three months before pulling their first shot for a customer.",
    textAr: "يتدرب الباريستا لدينا لمدة ثلاثة أشهر قبل سحب أول جرعة لعميل.",
  },
];
