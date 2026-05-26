import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navbar
    "nav.menu": "Menu",
    "nav.about": "About",
    "nav.reservations": "Reservations",
    "nav.blog": "Blog",
    "nav.contact": "Contact",
    "nav.orderNow": "Order Now",
    
    // Home
    "home.subtitle": "Cairo's Specialty Coffee",
    "home.hero.title": "Where Every Cup Tells a Story.",
    "home.hero.description": "Single-origin beans. Small-batch roasting. Three branches in Cairo. One obsession.",
    "home.hero.exploreMenu": "Explore Menu",
    "home.hero.ourStory": "Our Story",
    
    "home.featured.label": "Signatures",
    "home.featured.title": "Our finest cups.",
    "home.featured.viewAll": "View all",
    "home.featured.orderNow": "Order Now",
    
    "home.why.label": "Why AROMA",
    "home.why.title": "Craft in every detail.",
    
    "home.bestsellers.label": "Best Sellers",
    "home.bestsellers.title": "What they order twice.",
    
    "home.process.label": "Our Process",
    "home.process.title": "The Art of the Aroma.",
    
    "home.gallery.label": "Gallery",
    "home.gallery.title": "Moments at AROMA.",
    
    "home.newsletter.label": "Newsletter",
    "home.newsletter.title": "Join the AROMA Circle.",
    "home.newsletter.description": "No spam. Coffee wisdom only.",
    "home.newsletter.placeholder": "your@email.com",
    "home.newsletter.subscribe": "Subscribe",
    "home.newsletter.success": "Welcome to the circle.",
    
    // Menu
    "menu.label": "Our Menu",
    "menu.title": "Every cup, considered.",
    "menu.all": "All",
    "menu.addToCart": "Add",
    "menu.quickView": "Quick View",
    
    // Categories
    "category.beans": "Coffee Beans",
    "category.ground": "Ground Coffee",
    "category.capsules": "Coffee Capsules",
    "category.equipment": "Equipment",
    "category.drinks": "Drinks",
    "category.accessories": "Accessories",
    
    // Cart
    "cart.title": "Your Cart",
    "cart.empty": "Your cart is empty",
    "cart.items": "items in your cart",
    "cart.item": "item in your cart",
    "cart.continueShopping": "Continue Shopping",
    "cart.browseMenu": "Browse Menu",
    "cart.orderSummary": "Order Summary",
    "cart.subtotal": "Subtotal",
    "cart.discount": "Discount",
    "cart.delivery": "Delivery",
    "cart.free": "Free",
    "cart.total": "Total",
    "cart.promoCode": "Promo Code",
    "cart.apply": "Apply",
    "cart.checkout": "Proceed to Checkout",
    "cart.freeDeliveryNote": "Add {amount} EGP more for free delivery",
    
    // Footer
    "footer.tagline": "A luxury digital coffee experience. Rooted in Cairo. Reaching for the extraordinary.",
    "footer.navigate": "Navigate",
    "footer.branches": "Our Branches",
    "footer.contact": "Get in Touch",
    "footer.daily": "Daily: 7:00 AM – 11:00 PM",
    "footer.contactUs": "Contact us",
    "footer.rights": "All rights reserved.",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
    
    // Common
    "common.egp": "EGP",
    "common.loading": "Loading...",
    
    // About
    "about.label": "Our Story",
    "about.title": "Born in Cairo. Rooted in Coffee.",
    "about.subtitle": "We started AROMA because we believed Cairo deserved a coffee experience that didn't ask you to fly to Melbourne to find it. Three branches later, we still believe that.",
    "about.philosophy": "Philosophy",
    "about.philosophyTitle": "We believe a great cup of coffee is an act of care.",
    "about.philosophyText1": "Not just care about beans or technique — though those matter enormously. Care about the person receiving the cup. Care about the farmer who grew it. Care about the ten seconds you take to actually taste it.",
    "about.philosophyText2": "That philosophy drives everything from how we source to how we train our baristas to how we designed this website.",
    "about.journey": "Our Journey",
    "about.journeyTitle": "Five years of craft",
    "about.team": "The People",
    "about.teamTitle": "Behind the cup",
    "about.sourcing": "Sourcing",
    "about.sourcingTitle": "Where our coffee comes from",
    
    // Reservations
    "reservations.label": "Reserve a Table",
    "reservations.title": "We're expecting you.",
    "reservations.subtitle": "Book your table in seconds. We'll hold it for 15 minutes past your reserved time.",
    "reservations.name": "Full Name",
    "reservations.phone": "Phone",
    "reservations.email": "Email",
    "reservations.date": "Date",
    "reservations.time": "Time",
    "reservations.guests": "Guests",
    "reservations.branch": "Branch",
    "reservations.requests": "Special Requests",
    "reservations.requestsOptional": "(optional)",
    "reservations.requestsPlaceholder": "Allergies, celebrations, seating preferences...",
    "reservations.confirm": "Confirm Reservation",
    "reservations.success": "Your table is reserved.",
    "reservations.successMessage": "See you at AROMA",
    "reservations.newReservation": "Make another reservation",
    
    // Contact
    "contact.label": "Get in Touch",
    "contact.title": "We'd love to hear from you.",
    "contact.subtitle": "Questions, feedback, wholesale enquiries, or just want to talk coffee — we're here.",
    "contact.sendMessage": "Send a message",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.subject": "Subject",
    "contact.message": "Message",
    "contact.send": "Send Message",
    "contact.success": "Message received.",
    "contact.successMessage": "We'll get back to you within 24 hours.",
    "contact.sendAnother": "Send another message",
    "contact.hours": "Opening Hours",
    "contact.locations": "Our Locations",
    "contact.generalLine": "General Line",
    
    // Blog
    "blog.label": "The AROMA Journal",
    "blog.title": "Coffee, craft, and stories.",
    "blog.subtitle": "Guides, origin stories, and honest writing about the world of specialty coffee.",
    "blog.search": "Search articles...",
    "blog.all": "All",
    "blog.read": "Read",
    "blog.noResults": "No articles found matching your search.",
    
    // FAQ
    "faq.label": "Help Center",
    "faq.title": "Frequently Asked Questions",
    "faq.subtitle": "Can't find what you're looking for? Contact us at",
    "faq.search": "Search FAQs...",
    "faq.stillQuestions": "Still have questions?",
    "faq.stillQuestionsText": "Our team is here to help. Reach out and we'll get back to you within 24 hours.",
    "faq.contactSupport": "Contact Support",
    "faq.noResults": "No results found for",
  },
  ar: {
    // Navbar
    "nav.menu": "القائمة",
    "nav.about": "من نحن",
    "nav.reservations": "الحجوزات",
    "nav.blog": "المدونة",
    "nav.contact": "تواصل معنا",
    "nav.orderNow": "اطلب الآن",
    
    // Home
    "home.subtitle": "قهوة مميزة من القاهرة",
    "home.hero.title": "كل فنجان يحكي قصة.",
    "home.hero.description": "حبوب من مصدر واحد. تحميص بكميات صغيرة. ثلاثة فروع في القاهرة. شغف واحد.",
    "home.hero.exploreMenu": "استكشف القائمة",
    "home.hero.ourStory": "قصتنا",
    
    "home.featured.label": "المميزات",
    "home.featured.title": "أفضل ما لدينا.",
    "home.featured.viewAll": "عرض الكل",
    "home.featured.orderNow": "اطلب الآن",
    
    "home.why.label": "لماذا أروما",
    "home.why.title": "الحرفية في كل التفاصيل.",
    
    "home.bestsellers.label": "الأكثر مبيعاً",
    "home.bestsellers.title": "ما يطلبونه مرتين.",
    
    "home.process.label": "عمليتنا",
    "home.process.title": "فن الأروما.",
    
    "home.gallery.label": "المعرض",
    "home.gallery.title": "لحظات في أروما.",
    
    "home.newsletter.label": "النشرة الإخبارية",
    "home.newsletter.title": "انضم إلى دائرة أروما.",
    "home.newsletter.description": "لا رسائل مزعجة. حكمة القهوة فقط.",
    "home.newsletter.placeholder": "بريدك@الإلكتروني.com",
    "home.newsletter.subscribe": "اشترك",
    "home.newsletter.success": "مرحباً بك في الدائرة.",
    
    // Menu
    "menu.label": "قائمتنا",
    "menu.title": "كل فنجان مدروس.",
    "menu.all": "الكل",
    "menu.addToCart": "أضف",
    "menu.quickView": "عرض سريع",
    
    // Categories
    "category.beans": "حبوب القهوة",
    "category.ground": "قهوة مطحونة",
    "category.capsules": "كبسولات القهوة",
    "category.equipment": "المعدات",
    "category.drinks": "المشروبات",
    "category.accessories": "الإكسسوارات",
    
    // Cart
    "cart.title": "سلة التسوق",
    "cart.empty": "سلة التسوق فارغة",
    "cart.items": "منتجات في السلة",
    "cart.item": "منتج في السلة",
    "cart.continueShopping": "متابعة التسوق",
    "cart.browseMenu": "تصفح القائمة",
    "cart.orderSummary": "ملخص الطلب",
    "cart.subtotal": "المجموع الفرعي",
    "cart.discount": "الخصم",
    "cart.delivery": "التوصيل",
    "cart.free": "مجاني",
    "cart.total": "الإجمالي",
    "cart.promoCode": "كود الخصم",
    "cart.apply": "تطبيق",
    "cart.checkout": "إتمام الطلب",
    "cart.freeDeliveryNote": "أضف {amount} جنيه للحصول على توصيل مجاني",
    
    // Footer
    "footer.tagline": "تجربة قهوة رقمية فاخرة. متجذرة في القاهرة. تسعى للتميز.",
    "footer.navigate": "التنقل",
    "footer.branches": "فروعنا",
    "footer.contact": "تواصل معنا",
    "footer.daily": "يومياً: 7:00 صباحاً – 11:00 مساءً",
    "footer.contactUs": "تواصل معنا",
    "footer.rights": "جميع الحقوق محفوظة.",
    "footer.privacy": "سياسة الخصوصية",
    "footer.terms": "شروط الخدمة",
    
    // Common
    "common.egp": "جنيه",
    "common.loading": "جاري التحميل...",
    
    // About
    "about.label": "قصتنا",
    "about.title": "ولدنا في القاهرة. متجذرون في القهوة.",
    "about.subtitle": "بدأنا أروما لأننا آمنا أن القاهرة تستحق تجربة قهوة لا تطلب منك السفر إلى ملبورن للعثور عليها. بعد ثلاثة فروع، ما زلنا نؤمن بذلك.",
    "about.philosophy": "الفلسفة",
    "about.philosophyTitle": "نؤمن أن فنجان القهوة الرائع هو عمل من الرعاية.",
    "about.philosophyText1": "ليس فقط الرعاية بالحبوب أو التقنية - رغم أن ذلك مهم للغاية. الرعاية بالشخص الذي يتلقى الفنجان. الرعاية بالمزارع الذي زرعها. الرعاية بالعشر ثوانٍ التي تأخذها لتذوقها فعلياً.",
    "about.philosophyText2": "هذه الفلسفة تقود كل شيء من كيفية الحصول على المصادر إلى كيفية تدريب الباريستا لدينا إلى كيفية تصميم هذا الموقع.",
    "about.journey": "رحلتنا",
    "about.journeyTitle": "خمس سنوات من الحرفية",
    "about.team": "الأشخاص",
    "about.teamTitle": "خلف الفنجان",
    "about.sourcing": "المصادر",
    "about.sourcingTitle": "من أين تأتي قهوتنا",
    
    // Reservations
    "reservations.label": "احجز طاولة",
    "reservations.title": "نحن في انتظارك.",
    "reservations.subtitle": "احجز طاولتك في ثوانٍ. سنحتفظ بها لمدة 15 دقيقة بعد الوقت المحجوز.",
    "reservations.name": "الاسم الكامل",
    "reservations.phone": "الهاتف",
    "reservations.email": "البريد الإلكتروني",
    "reservations.date": "التاريخ",
    "reservations.time": "الوقت",
    "reservations.guests": "الضيوف",
    "reservations.branch": "الفرع",
    "reservations.requests": "طلبات خاصة",
    "reservations.requestsOptional": "(اختياري)",
    "reservations.requestsPlaceholder": "حساسية، احتفالات، تفضيلات الجلوس...",
    "reservations.confirm": "تأكيد الحجز",
    "reservations.success": "تم حجز طاولتك.",
    "reservations.successMessage": "نراك في أروما",
    "reservations.newReservation": "إجراء حجز آخر",
    
    // Contact
    "contact.label": "تواصل معنا",
    "contact.title": "نود أن نسمع منك.",
    "contact.subtitle": "أسئلة، ملاحظات، استفسارات الجملة، أو تريد فقط التحدث عن القهوة - نحن هنا.",
    "contact.sendMessage": "إرسال رسالة",
    "contact.name": "الاسم",
    "contact.email": "البريد الإلكتروني",
    "contact.subject": "الموضوع",
    "contact.message": "الرسالة",
    "contact.send": "إرسال الرسالة",
    "contact.success": "تم استلام الرسالة.",
    "contact.successMessage": "سنرد عليك خلال 24 ساعة.",
    "contact.sendAnother": "إرسال رسالة أخرى",
    "contact.hours": "ساعات العمل",
    "contact.locations": "مواقعنا",
    "contact.generalLine": "الخط العام",
    
    // Blog
    "blog.label": "مجلة أروما",
    "blog.title": "القهوة، الحرفية، والقصص.",
    "blog.subtitle": "أدلة، قصص الأصل، وكتابة صادقة عن عالم القهوة المتخصصة.",
    "blog.search": "البحث في المقالات...",
    "blog.all": "الكل",
    "blog.read": "اقرأ",
    "blog.noResults": "لم يتم العثور على مقالات تطابق بحثك.",
    
    // FAQ
    "faq.label": "مركز المساعدة",
    "faq.title": "الأسئلة الشائعة",
    "faq.subtitle": "لا يمكنك العثور على ما تبحث عنه؟ اتصل بنا على",
    "faq.search": "البحث في الأسئلة الشائعة...",
    "faq.stillQuestions": "لا تزال لديك أسئلة؟",
    "faq.stillQuestionsText": "فريقنا هنا للمساعدة. تواصل معنا وسنرد عليك خلال 24 ساعة.",
    "faq.contactSupport": "اتصل بالدعم",
    "faq.noResults": "لم يتم العثور على نتائج لـ",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("aroma-language");
    return (saved as Language) || "en";
  });

  useEffect(() => {
    localStorage.setItem("aroma-language", language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    
    // Add/remove Arabic font class
    if (language === "ar") {
      document.documentElement.classList.add("font-arabic");
    } else {
      document.documentElement.classList.remove("font-arabic");
    }
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ar" : "en"));
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
