export interface FAQItem {
  question: string;
  questionAr: string;
  answer: string;
  answerAr: string;
  category: string;
  categoryAr: string;
}

export const faqs: FAQItem[] = [
  {
    category: "Orders & Delivery",
    categoryAr: "الطلبات والتوصيل",
    question: "What are your delivery hours?",
    questionAr: "ما هي ساعات التوصيل؟",
    answer: "We deliver daily from 9 AM to 10 PM across Cairo. Same-day delivery is available for orders placed before 2 PM.",
    answerAr: "نوصل يومياً من ٩ صباحاً إلى ١٠ مساءً في جميع أنحاء القاهرة. التوصيل في نفس اليوم متاح للطلبات التي تتم قبل الساعة ٢ ظهراً.",
  },
  {
    category: "Orders & Delivery",
    categoryAr: "الطلبات والتوصيل",
    question: "Is there a minimum order for delivery?",
    questionAr: "هل يوجد حد أدنى للطلب للتوصيل؟",
    answer: "No minimum order required. However, orders above 200 EGP qualify for free delivery.",
    answerAr: "لا يوجد حد أدنى للطلب. ومع ذلك، الطلبات التي تزيد عن ٢٠٠ جنيه مؤهلة للتوصيل المجاني.",
  },
  {
    category: "Orders & Delivery",
    categoryAr: "الطلبات والتوصيل",
    question: "Can I track my order?",
    questionAr: "هل يمكنني تتبع طلبي؟",
    answer: "Yes! Once your order is confirmed, you'll receive a tracking link via SMS and email. You can monitor your order in real-time.",
    answerAr: "نعم! بمجرد تأكيد طلبك، ستتلقى رابط تتبع عبر الرسائل القصيرة والبريد الإلكتروني. يمكنك مراقبة طلبك في الوقت الفعلي.",
  },
  {
    category: "Coffee & Products",
    categoryAr: "القهوة والمنتجات",
    question: "Where do you source your beans?",
    questionAr: "من أين تحصلون على حبوبكم؟",
    answer: "We source directly from farms in Ethiopia, Colombia, Brazil, and Guatemala. We visit origin annually and maintain long-term relationships with our farmers.",
    answerAr: "نحصل مباشرة من المزارع في إثيوبيا وكولومبيا والبرازيل وغواتيمالا. نزور المصدر سنوياً ونحافظ على علاقات طويلة الأمد مع مزارعينا.",
  },
  {
    category: "Coffee & Products",
    categoryAr: "القهوة والمنتجات",
    question: "How fresh is your coffee?",
    questionAr: "ما مدى نضارة قهوتكم؟",
    answer: "All our beans are roasted in-house and packaged within 48 hours. We recommend consuming within 3-4 weeks of the roast date for optimal flavor.",
    answerAr: "جميع حبوبنا محمصة داخلياً ومعبأة في غضون ٤٨ ساعة. نوصي بالاستهلاك في غضون ٣-٤ أسابيع من تاريخ التحميص للحصول على نكهة مثالية.",
  },
  {
    category: "Coffee & Products",
    categoryAr: "القهوة والمنتجات",
    question: "Do you offer decaf options?",
    questionAr: "هل تقدمون خيارات خالية من الكافيين؟",
    answer: "Yes, we offer Swiss Water Process decaf — a chemical-free method that preserves flavor while removing 99.9% of caffeine.",
    answerAr: "نعم، نقدم قهوة منزوعة الكافيين بطريقة المياه السويسرية - طريقة خالية من المواد الكيميائية تحافظ على النكهة مع إزالة ٩٩.٩٪ من الكافيين.",
  },
  {
    category: "Reservations",
    categoryAr: "الحجوزات",
    question: "How far in advance should I book?",
    questionAr: "كم من الوقت مسبقاً يجب أن أحجز؟",
    answer: "We recommend booking at least 24 hours in advance, especially for weekends. Walk-ins are welcome but subject to availability.",
    answerAr: "نوصي بالحجز قبل ٢٤ ساعة على الأقل، خاصة في عطلات نهاية الأسبوع. الزيارات المباشرة مرحب بها ولكنها تخضع للتوافر.",
  },
  {
    category: "Reservations",
    categoryAr: "الحجوزات",
    question: "Can I cancel or modify my reservation?",
    questionAr: "هل يمكنني إلغاء أو تعديل حجزي؟",
    answer: "Yes, you can modify or cancel up to 2 hours before your reservation time through the link in your confirmation email.",
    answerAr: "نعم، يمكنك التعديل أو الإلغاء قبل ساعتين من وقت حجزك من خلال الرابط في بريد التأكيد الإلكتروني.",
  },
  {
    category: "Reservations",
    categoryAr: "الحجوزات",
    question: "Do you accommodate large groups?",
    questionAr: "هل تستوعبون المجموعات الكبيرة؟",
    answer: "Absolutely. For groups of 8 or more, please contact us directly at reservations@aromacoffee.com for special arrangements.",
    answerAr: "بالتأكيد. للمجموعات المكونة من ٨ أشخاص أو أكثر، يرجى الاتصال بنا مباشرة على reservations@aromacoffee.com للترتيبات الخاصة.",
  },
  {
    category: "Payment & Refunds",
    categoryAr: "الدفع والاسترداد",
    question: "What payment methods do you accept?",
    questionAr: "ما هي طرق الدفع التي تقبلونها؟",
    answer: "We accept all major credit cards, Vodafone Cash, Etisalat Cash, Fawry, and cash on delivery.",
    answerAr: "نقبل جميع بطاقات الائتمان الرئيسية، فودافون كاش، اتصالات كاش، فوري، والدفع عند الاستلام.",
  },
  {
    category: "Payment & Refunds",
    categoryAr: "الدفع والاسترداد",
    question: "What is your refund policy?",
    questionAr: "ما هي سياسة الاسترداد الخاصة بكم؟",
    answer: "If you're not satisfied with your order, contact us within 24 hours for a full refund or replacement. Your satisfaction is our priority.",
    answerAr: "إذا لم تكن راضياً عن طلبك، اتصل بنا في غضون ٢٤ ساعة للحصول على استرداد كامل أو استبدال. رضاك هو أولويتنا.",
  },
  {
    category: "Loyalty Program",
    categoryAr: "برنامج الولاء",
    question: "How does the loyalty program work?",
    questionAr: "كيف يعمل برنامج الولاء؟",
    answer: "Earn 1 point for every 10 EGP spent. Redeem points for discounts, free items, or exclusive merchandise. Sign up is free!",
    answerAr: "اكسب نقطة واحدة مقابل كل ١٠ جنيه تنفقها. استبدل النقاط بخصومات أو عناصر مجانية أو بضائع حصرية. التسجيل مجاني!",
  },
  {
    category: "Loyalty Program",
    categoryAr: "برنامج الولاء",
    question: "Do points expire?",
    questionAr: "هل تنتهي صلاحية النقاط؟",
    answer: "Points are valid for 12 months from the date earned. We'll send you a reminder before they expire.",
    answerAr: "النقاط صالحة لمدة ١٢ شهراً من تاريخ الكسب. سنرسل لك تذكيراً قبل انتهاء صلاحيتها.",
  },
];
