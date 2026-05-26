export interface BlogPost {
  id: number;
  title: string;
  titleAr: string;
  slug: string;
  excerpt: string;
  excerptAr: string;
  category: "guides" | "news" | "recipes" | "stories";
  date: string;
  dateAr: string;
  readTime: string;
  readTimeAr: string;
  image: string;
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Perfect Extraction: A Guide to Espresso",
    titleAr: "الاستخلاص المثالي: دليل الإسبريسو",
    slug: "perfect-extraction-espresso-guide",
    excerpt: "Espresso is unforgiving. Get the grind wrong by two microns and you taste it. Here's everything we've learned in five years of obsessing over extraction.",
    excerptAr: "الإسبريسو لا يغفر الأخطاء. اخطئ في الطحن بمقدار ميكرونين وستتذوق الفرق. إليك كل ما تعلمناه في خمس سنوات من الهوس بالاستخلاص.",
    category: "guides",
    date: "May 12, 2025",
    dateAr: "١٢ مايو ٢٠٢٥",
    readTime: "8 min read",
    readTimeAr: "٨ دقائق قراءة",
    image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=80",
    featured: true,
  },
  {
    id: 2,
    title: "Why Single-Origin Coffee Changes Everything",
    titleAr: "لماذا تغير القهوة أحادية المصدر كل شيء",
    slug: "why-single-origin-matters",
    excerpt: "When you strip away the blend, you hear one voice clearly. Single-origin coffee is the difference between a painting and a collage — both beautiful, but one more intimate.",
    excerptAr: "عندما تزيل الخلطة، تسمع صوتاً واحداً بوضوح. القهوة أحادية المصدر هي الفرق بين لوحة وكولاج - كلاهما جميل، لكن أحدهما أكثر حميمية.",
    category: "stories",
    date: "April 28, 2025",
    dateAr: "٢٨ أبريل ٢٠٢٥",
    readTime: "5 min read",
    readTimeAr: "٥ دقائق قراءة",
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80",
  },
  {
    id: 3,
    title: "Cold Brew vs. Iced Coffee: The Real Difference",
    titleAr: "القهوة الباردة مقابل القهوة المثلجة: الفرق الحقيقي",
    slug: "cold-brew-vs-iced-coffee",
    excerpt: "One is brewed hot and chilled. The other never meets heat at all. The result? Two completely different experiences from the same bean.",
    excerptAr: "واحدة تُحضّر ساخنة ثم تُبرّد. والأخرى لا تلتقي بالحرارة أبداً. النتيجة؟ تجربتان مختلفتان تماماً من نفس الحبة.",
    category: "guides",
    date: "April 14, 2025",
    dateAr: "١٤ أبريل ٢٠٢٥",
    readTime: "4 min read",
    readTimeAr: "٤ دقائق قراءة",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&q=80",
  },
  {
    id: 4,
    title: "AROMA's Journey to Direct Trade",
    titleAr: "رحلة أروما إلى التجارة المباشرة",
    slug: "blend-journey-direct-trade",
    excerpt: "We visited the farms. We sat with the farmers. We learned that great coffee starts not in the roastery, but in the relationship between two people who care deeply about the same thing.",
    excerptAr: "زرنا المزارع. جلسنا مع المزارعين. تعلمنا أن القهوة الرائعة لا تبدأ في المحمصة، بل في العلاقة بين شخصين يهتمان بعمق بنفس الشيء.",
    category: "stories",
    date: "March 30, 2025",
    dateAr: "٣٠ مارس ٢٠٢٥",
    readTime: "7 min read",
    readTimeAr: "٧ دقائق قراءة",
    image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80",
  },
  {
    id: 5,
    title: "Morning Ritual: Building Your Coffee Routine",
    titleAr: "طقوس الصباح: بناء روتين القهوة الخاص بك",
    slug: "morning-ritual-coffee-routine",
    excerpt: "The best morning routine isn't the most elaborate one. It's the one that makes you feel like yourself before the world starts asking things of you.",
    excerptAr: "أفضل روتين صباحي ليس الأكثر تفصيلاً. إنه الذي يجعلك تشعر بنفسك قبل أن يبدأ العالم في طلب الأشياء منك.",
    category: "recipes",
    date: "March 15, 2025",
    dateAr: "١٥ مارس ٢٠٢٥",
    readTime: "6 min read",
    readTimeAr: "٦ دقائق قراءة",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
  },
  {
    id: 6,
    title: "The Science of Milk Steaming",
    titleAr: "علم تبخير الحليب",
    slug: "science-of-milk-steaming",
    excerpt: "Microfoam is not just foam — it's a texture, a temperature, a decision. Here's the physics of why your latte art either holds or falls apart.",
    excerptAr: "الرغوة الدقيقة ليست مجرد رغوة - إنها ملمس، درجة حرارة، قرار. إليك فيزياء لماذا فن اللاتيه الخاص بك إما يثبت أو ينهار.",
    category: "guides",
    date: "March 2, 2025",
    dateAr: "٢ مارس ٢٠٢٥",
    readTime: "5 min read",
    readTimeAr: "٥ دقائق قراءة",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80",
  },
];

export const categoryLabels: Record<BlogPost["category"], { en: string; ar: string }> = {
  guides: { en: "Guides", ar: "أدلة" },
  news: { en: "News", ar: "أخبار" },
  recipes: { en: "Recipes", ar: "وصفات" },
  stories: { en: "Stories", ar: "قصص" },
};
