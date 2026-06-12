import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { faqs } from "@/data/faqData";

export default function FAQ() {
  const { language, t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = Array.from(new Set(faqs.map((f) => (language === "ar" ? f.categoryAr : f.category))));

  const filteredFaqs = faqs.filter((faq) => {
    const question = language === "ar" ? faq.questionAr : faq.question;
    const answer = language === "ar" ? faq.answerAr : faq.answer;
    return (
      question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-24 px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">{t("faq.label")}</p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {t("faq.title")}
          </h1>
          <p className="text-muted-foreground mb-8">
            {t("faq.subtitle")}{" "}
            <a href="mailto:hello@aromacoffee.com" className="text-accent hover:underline">
              hello@aromacoffee.com
            </a>
          </p>

          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute start-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("faq.search")}
              className="w-full ps-12 pe-4 py-3 bg-card border border-border rounded-full text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all"
            />
          </div>
        </motion.div>

        {categories.map((category, catIndex) => {
          const categoryFaqs = filteredFaqs.filter((f) => (language === "ar" ? f.categoryAr : f.category) === category);
          if (categoryFaqs.length === 0) return null;

          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: catIndex * 0.1 }}
              className="mb-10"
            >
              <h2 className="font-serif text-2xl font-bold text-foreground mb-5">{category}</h2>
              <div className="space-y-3">
                {categoryFaqs.map((faq, index) => {
                  const globalIndex = faqs.indexOf(faq);
                  const isOpen = openIndex === globalIndex;

                  return (
                    <motion.div
                      key={globalIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-card border border-border rounded-xl overflow-hidden"
                    >
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                        className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/30 transition-colors cursor-pointer"
                      >
                        <span className="font-semibold text-foreground pr-4">{language === "ar" ? faq.questionAr : faq.question}</span>
                        <ChevronDown
                          size={18}
                          className={`text-muted-foreground shrink-0 transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <motion.div
                        initial={false}
                        animate={{ height: isOpen ? "auto" : 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 text-muted-foreground leading-relaxed">{language === "ar" ? faq.answerAr : faq.answer}</div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}

        {filteredFaqs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground">{t("faq.noResults")} "{searchQuery}"</p>
          </motion.div>
        )}

        {/* Still have questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center bg-card border border-border rounded-2xl p-10"
        >
          <h3 className="font-serif text-2xl font-bold text-foreground mb-3">{t("faq.stillQuestions")}</h3>
          <p className="text-muted-foreground mb-6">
            {t("faq.stillQuestionsText")}
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-full hover:bg-accent/90 transition-all"
          >
            {t("faq.contactSupport")}
          </a>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
