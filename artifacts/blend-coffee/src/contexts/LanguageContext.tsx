import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "en" | "ar";

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
    "nav.home": "Home",
    
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
    "home.why.item1.title": "Single Origin Beans",
    "home.why.item1.desc": "Every bean traced to its farm. Transparency in every bag.",
    "home.why.item2.title": "Hand-Crafted Daily",
    "home.why.item2.desc": "Roasted in small batches. Brewed to order. Never rushed.",
    "home.why.item3.title": "Award-Winning Roasts",
    "home.why.item3.desc": "8 regional awards since 2021. Quality you can taste.",
    "home.why.item4.title": "Direct Trade",
    "home.why.item4.desc": "We pay farmers above market. The cup reflects those relationships.",
    
    "home.bestsellers.label": "Best Sellers",
    "home.bestsellers.title": "What they order twice.",
    
    "home.testimonials.label": "Testimonials",
    "home.testimonials.title": "What Cairo is saying.",
    
    "home.process.label": "Our Process",
    "home.process.title": "The Art of the Aroma.",
    "home.process.step1.label": "Source",
    "home.process.step1.desc": "We travel to origin annually — Ethiopia, Colombia, Guatemala — and build lasting partnerships with farmers.",
    "home.process.step2.label": "Roast",
    "home.process.step2.desc": "Small-batch in-house roasting. Every profile is logged and refined for each origin's unique character.",
    "home.process.step3.label": "Craft",
    "home.process.step3.desc": "Baristas trained for months. Equipment calibrated daily. Your cup is the last step in a long chain of care.",
    "home.stats.origins": "Origins Sourced",
    "home.stats.cups": "Cups Served",
    "home.stats.awards": "Industry Awards",
    "home.stats.craft": "Of Craft",
    "home.stats.branches": "Cairo Branches",
    "home.stats.directTrade": "Direct Trade",
    "home.stats.yearsSuffix": " yrs",
    
    "home.gallery.label": "Gallery",
    "home.gallery.title": "Moments at AROMA.",
    "home.gallery.caption1": "Ethiopian Yirgacheffe",
    "home.gallery.caption2": "The Morning Pour",
    "home.gallery.caption3": "Cold Brew Vessel",
    "home.gallery.caption4": "House Roast",
    "home.gallery.caption5": "Latte Art",
    "home.gallery.caption6": "Bean Selection",
    "home.gallery.caption7": "The Grind",
    "home.gallery.caption8": "Espresso Pull",
    
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
    "menu.roast.title": "Choose Your Roast",
    "menu.roast.r1.label": "R1 Blend",
    "menu.roast.r1.desc": "A balanced blend with a smooth taste and rich body — perfect for everyday enjoyment and classic coffee lovers.",
    "menu.roast.r2.label": "R2 Blend",
    "menu.roast.r2.desc": "A bolder blend with deeper flavor and intense notes — for those who prefer a clear, robust cup.",
    "menu.roast.selected": "Selected roast",
    "menu.ingredients": "Ingredients",
    
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
    "cart.each": "each",
    "cart.toast.updated": "Updated cart",
    "cart.toast.updatedDesc": "Item quantity updated",
    "cart.toast.added": "Added to cart",
    "cart.toast.addedDesc": "Item added successfully",
    "cart.toast.removed": "Removed from cart",
    "cart.toast.removedDesc": "Item removed successfully",
    
    // Footer
    "footer.tagline": "A luxury digital coffee experience. Rooted in Cairo. Reaching for the extraordinary.",
    "footer.navigate": "Navigate",
    "footer.branches": "Our Branches",
    "footer.contact": "Get in Touch",
    "footer.daily": "Daily: 7:00 AM – 11:00 PM",
    "footer.contactUs": "Contact us",
    "footer.rights": "All rights reserved",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
    "footer.copyright": "AROMA Coffee",
    
    // Common
    "common.egp": "EGP",
    "common.loading": "Loading...",
    "common.previous": "Previous",
    "common.next": "Next",
    "common.select": "Select",
    
    // About
    "about.label": "Our Story",
    "about.title": "Born in Cairo.\nRooted in Coffee.",
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
    "reservations.guestUnit": "guest",
    "reservations.guestsUnit": "guests",
    "reservations.at": "at",
    "reservations.confirmationSent": "A confirmation has been sent to",
    "reservations.select": "Select",
    "reservations.error.name": "Name is required",
    "reservations.error.phone": "Phone is required",
    "reservations.error.email": "Valid email required",
    "reservations.error.date": "Please select a date",
    "reservations.error.time": "Please select a time",
    "reservations.placeholder.name": "Layla Hassan",
    
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
    "contact.placeholder.name": "Your name",
    "contact.placeholder.email": "you@example.com",
    "contact.placeholder.subject": "What's this about?",
    "contact.placeholder.message": "Tell us everything...",
    "contact.whatsapp": "WhatsApp",
    "contact.instagram": "Instagram",
    "contact.facebook": "Facebook",
    
    // WhatsApp widget
    "whatsapp.title": "Chat with AROMA",
    "whatsapp.description": "Questions, reservations, or coffee talk — we're on WhatsApp.",
    "whatsapp.open": "Open WhatsApp",
    "whatsapp.ariaLabel": "Chat on WhatsApp",
    "whatsapp.defaultMessage": "Hello AROMA! I'd like to know more about your coffee and reservations.",
    
    // Aria labels
    "aria.cart": "Shopping cart",
    "aria.language": "Toggle language",
    "aria.theme": "Toggle theme",
    "aria.menu": "Toggle mobile menu",
    "aria.removeItem": "Remove item",
    "aria.addToWishlist": "Add to wishlist",
    
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

    // Checkout
    "checkout.title": "Checkout",
    "checkout.subtitle": "Complete your order securely",
    "checkout.empty": "Your cart is empty",
    "checkout.deliveryInfo": "Delivery Information",
    "checkout.fullName": "Full Name",
    "checkout.fullNamePlaceholder": "Enter your full name",
    "checkout.phone": "Phone Number",
    "checkout.phonePlaceholder": "Enter your phone number",
    "checkout.address": "Delivery Address",
    "checkout.addressPlaceholder": "Enter your delivery address",
    "checkout.city": "City",
    "checkout.selectCity": "Select city",
    "checkout.cairo": "Cairo",
    "checkout.giza": "Giza",
    "checkout.alexandria": "Alexandria",
    "checkout.paymentMethod": "Payment Method",
    "checkout.instapayDesc": "Scan QR code",
    "checkout.vodafoneDesc": "Transfer via Vodafone",
    "checkout.cashOnDelivery": "Cash on Delivery",
    "checkout.cashDesc": "Pay when delivered",
    "checkout.instapayInstructions": "Pay with InstaPay",
    "checkout.instapaySteps": "1. Open InstaPay app\n2. Scan QR code or send to merchant number\n3. Enter amount and confirm payment",
    "checkout.merchantNumber": "Merchant Number",
    "checkout.paymentTime": "Payment will be verified within 5 minutes",
    "checkout.vodafoneInstructions": "Pay with Vodafone Cash",
    "checkout.vodafoneSteps": "1. Open Vodafone Cash app\n2. Transfer to merchant number\n3. Enter amount and confirm transfer",
    "checkout.vodafoneNumber": "Vodafone Cash Number",
    "checkout.cashInstructions": "Cash on Delivery",
    "checkout.cashSteps": "Pay with cash when your order arrives. Have exact change ready.",
    "checkout.securePayment": "Secure Payment",
    "checkout.dataProtection": "Your data is protected",
    "checkout.orderItems": "Order Items",
    "checkout.placeOrder": "Place Order",
    "checkout.processing": "Processing...",
    "checkout.backToCart": "Back to Cart",
    "checkout.success": "Order Placed Successfully!",
    "checkout.successMessage": "Thank you for your order. We'll send you a confirmation message shortly.",
    "checkout.orderNumber": "Order Number",
    "checkout.continueShopping": "Continue Shopping",
    "checkout.uploadReceipt": "Upload Payment Receipt",
    "checkout.uploadReceiptDesc": "Please upload a screenshot of your payment confirmation to verify your transaction",
    "checkout.clickToUpload": "Click to upload receipt",
    "checkout.supportedFormats": "Supported formats: JPG, PNG, WEBP",
    "checkout.receiptUploaded": "Receipt uploaded successfully",
    "checkout.sendViaWhatsApp": "Send Order via WhatsApp",
    "checkout.whatsappDesc": "Click to send your order details directly to our WhatsApp for faster processing",
    "checkout.trackOrder": "Track Order",
    "checkout.orderNumberLabel": "Order Number:",
    "checkout.error.name": "Name must be 3-50 characters",
    "checkout.error.phone": "Invalid phone number",
    "checkout.error.address": "Address must be 10-200 characters",
    "checkout.error.city": "Please select city",
    "checkout.error.receipt": "Please upload payment receipt",
    "checkout.thankYou": "Thank you for choosing us",
    "checkout.thankYouDesc": "To track your order, please click the WhatsApp button for details",
    "checkout.step.delivery": "Delivery Info",
    "checkout.step.payment": "Payment",
    "checkout.step.confirm": "Confirm",
    "checkout.amountToPay": "Amount to Pay",
    "checkout.backToMenu": "Back to Menu",
    "checkout.instapay.step1": "Open InstaPay app",
    "checkout.instapay.step2": "Scan QR code or send to the number above",
    "checkout.instapay.step3": "Enter amount and confirm payment",
    "checkout.instapay.step4": "Upload screenshot of receipt",
    "checkout.vodafone.step1": "Open Vodafone Cash app",
    "checkout.vodafone.step2": "Select money transfer",
    "checkout.vodafone.step3": "Enter the number above and amount",
    "checkout.vodafone.step4": "Confirm transfer and upload receipt",

    // Not Found
    "notFound.title": "This cup is empty.",
    "notFound.description": "The page you're looking for has moved, been removed, or never existed. Let's get you back to something worth tasting.",
    "notFound.backHome": "Back to Home",
    "notFound.viewMenu": "View Menu",

    // Loading
    "loading.subtitle": "Cairo's Specialty Coffee",

    // Meta
    "meta.title": "AROMA Coffee — Cairo's Specialty Coffee",
    "meta.description": "Single-origin beans, small-batch roasting, and three branches in Cairo. Discover AROMA Coffee.",
  },
  ar: {
    // Navbar
    "nav.menu": "القائمة",
    "nav.about": "من نحن",
    "nav.reservations": "الحجوزات",
    "nav.blog": "المدونة",
    "nav.contact": "تواصل معنا",
    "nav.orderNow": "اطلب الآن",
    "nav.home": "الرئيسية",
    
    // Home
    "home.subtitle": "قهوة مميزة من القاهرة",
    "home.hero.title": "كل فنجان يحكي قصة",
    "home.hero.description": "حبوب من مصدر واحد. تحميص بكميات صغيرة. ثلاثة فروع في القاهرة. شغف واحد.",
    "home.hero.exploreMenu": "استكشف القائمة",
    "home.hero.ourStory": "قصتنا",
    
    "home.featured.label": "المميزات",
    "home.featured.title": "أفضل ما لدينا",
    "home.featured.viewAll": "عرض الكل",
    "home.featured.orderNow": "اطلب الآن",
    
    "home.why.label": "لماذا أروما",
    "home.why.title": "الحرفية في كل التفاصيل",
    "home.why.item1.title": "حبوب من مصدر واحد",
    "home.why.item1.desc": "كل حبة يمكن تتبعها إلى مزرعتها. شفافية في كل كيس.",
    "home.why.item2.title": "صُنع يدوياً يومياً",
    "home.why.item2.desc": "تحميص بكميات صغيرة. تحضير حسب الطلب. دون استعجال.",
    "home.why.item3.title": "تحميص حائز على جوائز",
    "home.why.item3.desc": "8 جوائز إقليمية منذ 2021. جودة يمكنك تذوقها.",
    "home.why.item4.title": "تجارة مباشرة",
    "home.why.item4.desc": "ندفع للمزارعين فوق سعر السوق. الفنجان يعكس تلك العلاقات.",
    
    "home.bestsellers.label": "الأكثر مبيعاً",
    "home.bestsellers.title": "ما يطلبونه مرتين",
    
    "home.testimonials.label": "آراء العملاء",
    "home.testimonials.title": "ماذا يقول القاهريون.",
    
    "home.process.label": "عمليتنا",
    "home.process.title": "فن الأروما.",
    "home.process.step1.label": "المصدر",
    "home.process.step1.desc": "نسافر إلى بلد المنشأ سنوياً — إثيوبيا، كولومبيا، غواتيمالا — ونبني شراكات دائمة مع المزارعين.",
    "home.process.step2.label": "التحميص",
    "home.process.step2.desc": "تحميص داخلي بكميات صغيرة. كل ملف نكهة يُسجَّل ويُصقَل ليعكس طابع كل منشأ.",
    "home.process.step3.label": "الحرفة",
    "home.process.step3.desc": "باريستا مدربون لأشهر. معدات معايرة يومياً. فنجانك هو الخطوة الأخيرة في سلسلة طويلة من العناية.",
    "home.stats.origins": "مناشئ القهوة",
    "home.stats.cups": "أكواب قُدمت",
    "home.stats.awards": "جوائز صناعية",
    "home.stats.craft": "من الحرفة",
    "home.stats.branches": "فروع بالقاهرة",
    "home.stats.directTrade": "تجارة مباشرة",
    "home.stats.yearsSuffix": " سنوات",
    
    "home.gallery.label": "المعرض",
    "home.gallery.title": "لحظات في أروما.",
    "home.gallery.caption1": "يرغاتشيف الإثيوبية",
    "home.gallery.caption2": "صباح القهوة",
    "home.gallery.caption3": "وعاء الكولد برو",
    "home.gallery.caption4": "التحميص المنزلي",
    "home.gallery.caption5": "فن اللاتيه",
    "home.gallery.caption6": "اختيار الحبوب",
    "home.gallery.caption7": "الطحن",
    "home.gallery.caption8": "جرعة الإسبريسو",
    
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
    "menu.roast.title": "اختر التوليفة",
    "menu.roast.r1.label": "R1 توليفة",
    "menu.roast.r1.desc": "توليفة متوازنة بطعم ناعم وقوام غني، مناسبة للاستمتاع اليومي ومحبّي القهوة الكلاسيكية.",
    "menu.roast.r2.label": "R2 توليفة",
    "menu.roast.r2.desc": "توليفة أقوى بنكهة أعمق ولمسات مكثفة، لمحبي القهوة ذات المذاق الواضح والجريء.",
    "menu.roast.selected": "التوليفة المختارة",
    "menu.ingredients": "المكونات",
    
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
    "cart.each": "للقطعة",
    "cart.toast.updated": "تم تحديث السلة",
    "cart.toast.updatedDesc": "تم تحديث كمية المنتج",
    "cart.toast.added": "أُضيف إلى السلة",
    "cart.toast.addedDesc": "تمت إضافة المنتج بنجاح",
    "cart.toast.removed": "أُزيل من السلة",
    "cart.toast.removedDesc": "تمت إزالة المنتج بنجاح",
    
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
    "footer.copyright": "أروما كوفي",
    
    // Common
    "common.egp": "جنيه",
    "common.loading": "جاري التحميل...",
    "common.previous": "السابق",
    "common.next": "التالي",
    "common.select": "اختر",
    
    // About
    "about.label": "قصتنا",
    "about.title": "ولدنا في القاهرة.\nمتجذرون في القهوة.",
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
    "reservations.guestUnit": "ضيف",
    "reservations.guestsUnit": "ضيوف",
    "reservations.at": "في",
    "reservations.confirmationSent": "تم إرسال تأكيد إلى",
    "reservations.select": "اختر",
    "reservations.error.name": "الاسم مطلوب",
    "reservations.error.phone": "الهاتف مطلوب",
    "reservations.error.email": "بريد إلكتروني صالح مطلوب",
    "reservations.error.date": "يرجى اختيار تاريخ",
    "reservations.error.time": "يرجى اختيار وقت",
    "reservations.placeholder.name": "ليلى حسن",
    
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
    "contact.placeholder.name": "اسمك",
    "contact.placeholder.email": "you@example.com",
    "contact.placeholder.subject": "عن ماذا؟",
    "contact.placeholder.message": "أخبرنا بكل شيء...",
    "contact.whatsapp": "واتساب",
    "contact.instagram": "إنستغرام",
    "contact.facebook": "فيسبوك",
    
    // WhatsApp widget
    "whatsapp.title": "تحدث مع أروما",
    "whatsapp.description": "أسئلة، حجوزات، أو حديث عن القهوة — نحن على واتساب.",
    "whatsapp.open": "افتح واتساب",
    "whatsapp.ariaLabel": "تحدث عبر واتساب",
    "whatsapp.defaultMessage": "مرحباً أروما! أود معرفة المزيد عن قهوتكم والحجوزات.",
    
    // Aria labels
    "aria.cart": "سلة التسوق",
    "aria.language": "تبديل اللغة",
    "aria.theme": "تبديل المظهر",
    "aria.menu": "فتح القائمة",
    "aria.removeItem": "إزالة المنتج",
    "aria.addToWishlist": "أضف إلى المفضلة",
    
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

    // Checkout
    "checkout.title": "إتمام الطلب",
    "checkout.subtitle": "أكمل طلبك بأمان",
    "checkout.empty": "سلة التسوق فارغة",
    "checkout.deliveryInfo": "معلومات التوصيل",
    "checkout.fullName": "الاسم الكامل",
    "checkout.fullNamePlaceholder": "أدخل اسمك الكامل",
    "checkout.phone": "رقم الهاتف",
    "checkout.phonePlaceholder": "أدخل رقم هاتفك",
    "checkout.address": "عنوان التوصيل",
    "checkout.addressPlaceholder": "أدخل عنوان التوصيل",
    "checkout.city": "المدينة",
    "checkout.selectCity": "اختر المدينة",
    "checkout.cairo": "القاهرة",
    "checkout.giza": "الجيزة",
    "checkout.alexandria": "الإسكندرية",
    "checkout.paymentMethod": "طريقة الدفع",
    "checkout.instapayDesc": "امسح رمز QR",
    "checkout.vodafoneDesc": "تحويل عبر فودافون",
    "checkout.cashOnDelivery": "الدفع عند الاستلام",
    "checkout.cashDesc": "ادفع عند التوصيل",
    "checkout.instapayInstructions": "الدفع عبر InstaPay",
    "checkout.instapaySteps": "1. افتح تطبيق InstaPay\n2. امسح رمز QR أو أرسل لرقم التاجر\n3. أدخل المبلغ و أكد الدفع",
    "checkout.merchantNumber": "رقم التاجر",
    "checkout.paymentTime": "سيتم التحقق من الدفع خلال 5 دقائق",
    "checkout.vodafoneInstructions": "الدفع عبر Vodafone Cash",
    "checkout.vodafoneSteps": "1. افتح تطبيق Vodafone Cash\n2. حول لرقم التاجر\n3. أدخل المبلغ وأكد التحويل",
    "checkout.vodafoneNumber": "رقم Vodafone Cash",
    "checkout.cashInstructions": "الدفع عند الاستلام",
    "checkout.cashSteps": "ادفع نقداً عند وصول طلبك. جهز المبلغ المطلوب.",
    "checkout.securePayment": "دفع آمن",
    "checkout.dataProtection": "بياناتك محمية",
    "checkout.orderItems": "عناصر الطلب",
    "checkout.placeOrder": "تأكيد الطلب",
    "checkout.processing": "جاري المعالجة...",
    "checkout.backToCart": "العودة للسلة",
    "checkout.success": "تم الطلب بنجاح!",
    "checkout.successMessage": "شكراً لطلبك. سنرسل لك رسالة تأكيد قريباً.",
    "checkout.orderNumber": "رقم الطلب",
    "checkout.continueShopping": "متابعة التسوق",
    "checkout.uploadReceipt": "رفع إيصال الدفع",
    "checkout.uploadReceiptDesc": "يرجى رفع لقطة شاشة لتأكيد الدفع للتحقق من معاملتك",
    "checkout.clickToUpload": "اضغط لرفع الإيصال",
    "checkout.supportedFormats": "الصيغ المدعومة: JPG, PNG, WEBP",
    "checkout.receiptUploaded": "تم رفع الإيصال بنجاح",
    "checkout.sendViaWhatsApp": "إرسال الطلب عبر واتساب",
    "checkout.whatsappDesc": "اضغط لإرسال تفاصيل طلبك مباشرة إلى واتسابنا للمعالجة السريعة",
    "checkout.trackOrder": "تتبع طلبك",
    "checkout.orderNumberLabel": "رقم الطلب:",
    "checkout.error.name": "الاسم يجب أن يكون 3-50 حرف",
    "checkout.error.phone": "رقم الهاتف غير صحيح",
    "checkout.error.address": "العنوان يجب أن يكون 10-200 حرف",
    "checkout.error.city": "اختر المدينة",
    "checkout.error.receipt": "يرجى رفع إيصال الدفع",
    "checkout.thankYou": "شكراً لاختياركم لنا",
    "checkout.thankYouDesc": "لمتابعة الطلب يرجى الضغط على زر الواتساب لمعرفة التفاصيل",
    "checkout.step.delivery": "معلومات التوصيل",
    "checkout.step.payment": "طريقة الدفع",
    "checkout.step.confirm": "تأكيد الطلب",
    "checkout.amountToPay": "المبلغ المطلوب",
    "checkout.backToMenu": "العودة للقائمة",
    "checkout.instapay.step1": "افتح تطبيق InstaPay",
    "checkout.instapay.step2": "امسح رمز QR أو أرسل للرقم أعلاه",
    "checkout.instapay.step3": "أدخل المبلغ وأكد الدفع",
    "checkout.instapay.step4": "ارفع لقطة شاشة من الإيصال",
    "checkout.vodafone.step1": "افتح تطبيق Vodafone Cash",
    "checkout.vodafone.step2": "اختر تحويل الأموال",
    "checkout.vodafone.step3": "أدخل الرقم أعلاه والمبلغ",
    "checkout.vodafone.step4": "أكد التحويل وارفع الإيصال",

    // Not Found
    "notFound.title": "هذا الفنجان فارغ.",
    "notFound.description": "الصفحة التي تبحث عنها انتقلت أو حُذفت أو لم تكن موجودة. لنعد بك إلى ما يستحق التذوق.",
    "notFound.backHome": "العودة للرئيسية",
    "notFound.viewMenu": "عرض القائمة",

    // Loading
    "loading.subtitle": "قهوة مميزة من القاهرة",

    // Meta
    "meta.title": "أروما — قهوة مميزة من القاهرة",
    "meta.description": "حبوب من مصدر واحد، تحميص بكميات صغيرة، وثلاثة فروع في القاهرة. اكتشف قهوة أروما.",
  },
};

export function getTranslation(language: Language, key: string): string {
  return translations[language][key as keyof typeof translations.en] || key;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("aroma-language");
    return (saved as Language) || "en";
  });

  useEffect(() => {
    localStorage.setItem("aroma-language", language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.title = getTranslation(language, "meta.title");
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", getTranslation(language, "meta.description"));
    
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
