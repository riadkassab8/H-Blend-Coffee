export interface Testimonial {
  id: number;
  name: string;
  nameAr?: string;
  location: string;
  locationAr?: string;
  rating: number;
  text: string;
  textAr: string;
  initials: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Layla Hassan",
    location: "Maadi, Cairo",
    locationAr: "المعادي، القاهرة",
    rating: 5,
    text: "AROMA changed how I think about coffee. I used to drink it out of habit. Now I look forward to it the way I look forward to a good book. The Ethiopian pour-over is unlike anything I've had in this city.",
    textAr: "أروما غيّرت طريقة تفكيري في القهوة. كنت أشربها كعادة، والآن أتطلع إليها كما أتطلع لكتاب جميل. قهوة التقطير الإثيوبية لا مثيل لها في هذه المدينة.",
    initials: "LH",
  },
  {
    id: 2,
    name: "Omar Farouk",
    location: "Zamalek, Cairo",
    locationAr: "الزمالك، القاهرة",
    rating: 5,
    text: "The space, the service, the cup — everything at AROMA feels considered. You can tell the people behind it genuinely care. The cardamom blend is my morning ritual now.",
    textAr: "المكان، الخدمة، الفنجان — كل شيء في أروما مدروس. تشعر أن من وراءها أناس يهتمون حقاً. خلطة الهيل أصبحت طقس صباحي لا يُستغنى عنه.",
    initials: "OF",
  },
  {
    id: 3,
    name: "Sara El-Masry",
    location: "New Cairo",
    locationAr: "القاهرة الجديدة",
    rating: 5,
    text: "I've been to specialty coffee shops across London and Berlin. AROMA holds its own. The cold brew is exceptional — smooth, complex, no bitterness. I order it every time.",
    textAr: "زرت مقاهي القهوة المتخصصة في لندن وبرلين. أروما تنافس بقوة. القهوة الباردة استثنائية — ناعمة ومعقدة بلا مرارة. أطلبها في كل مرة.",
    initials: "SM",
  },
  {
    id: 4,
    name: "Karim Nour",
    location: "Downtown Cairo",
    locationAr: "وسط البلد، القاهرة",
    rating: 5,
    text: "The rose latte was something I ordered skeptically and am now completely devoted to. The balance is perfect. AROMA manages to be creative without being gimmicky.",
    textAr: "لاتيه الورد طلبته بشك وأصبحت مدمنة عليه تماماً. التوازن مثالي. أروما تبدع دون مبالغة أو استعراض.",
    initials: "KN",
  },
  {
    id: 5,
    name: "Nadia Youssef",
    location: "Heliopolis, Cairo",
    locationAr: "مصر الجديدة، القاهرة",
    rating: 5,
    text: "I brought my beans home and brewed them myself — and they're just as good as in the cafe. That tells you everything about the quality and freshness. AROMA is the real thing.",
    textAr: "أحضرت الحبوب للمنزل وحضّرتها بنفسي — وكانت بنفس جودة المقهى. هذا يقول كل شيء عن الجودة والطزاجة. أروما أصيلة بحق.",
    initials: "NY",
  },
];
