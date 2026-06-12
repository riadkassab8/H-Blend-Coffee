import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { timeline, team, origins, philosophySteps } from "@/data/aboutData";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function About() {
  const { t, language } = useLanguage();
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          className="max-w-3xl"
        >
          <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">
            {t("about.label")}
          </motion.p>
          <motion.h1 variants={fadeUp} className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 whitespace-pre-line">
            {t("about.title")}
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg text-muted-foreground leading-relaxed max-w-xl">
            {t("about.subtitle")}
          </motion.p>
        </motion.div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
            >
              <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">
                {t("about.philosophy")}
              </motion.p>
              <motion.h2 variants={fadeUp} className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-6">
                {t("about.philosophyTitle")}
              </motion.h2>
              <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed mb-4">
                {t("about.philosophyText1")}
              </motion.p>
              <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed">
                {t("about.philosophyText2")}
              </motion.p>
            </motion.div>
            <div className="grid grid-cols-1 gap-4">
              {philosophySteps.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="flex gap-5 p-5 rounded-xl border border-border bg-background"
                >
                  <span className="font-serif text-2xl font-bold text-accent/40 shrink-0">{item.num}</span>
                  <div>
                    <p className="font-semibold text-foreground mb-1">
                      {language === "ar" ? item.titleAr : item.title}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {language === "ar" ? item.textAr : item.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">{t("about.journey")}</p>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-foreground">{t("about.journeyTitle")}</h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border hidden lg:block" />
          <div className="space-y-12">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`lg:grid lg:grid-cols-2 lg:gap-16 items-center ${i % 2 === 0 ? "" : "lg:direction-rtl"}`}
              >
                <div className={`${i % 2 === 0 ? "lg:text-right" : "lg:col-start-2"} mb-6 lg:mb-0`}>
                  <span className="font-serif text-5xl font-bold text-accent/20">{item.year}</span>
                  <h3 className="font-serif text-2xl font-bold text-foreground mt-1 mb-3">
                    {language === "ar" ? item.titleAr : item.title}
                  </h3>
                  <p className={`text-muted-foreground leading-relaxed max-w-sm ${i % 2 === 0 ? "lg:ml-auto" : ""}`}>
                    {language === "ar" ? item.descriptionAr : item.description}
                  </p>
                </div>
                <div className={`${i % 2 === 0 ? "lg:col-start-2" : ""} hidden lg:flex items-center ${i % 2 === 0 ? "justify-start" : "justify-end"}`}>
                  <div className="w-4 h-4 rounded-full bg-accent" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">{t("about.team")}</p>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-foreground">{t("about.teamTitle")}</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/30 to-accent/20 mx-auto mb-4 flex items-center justify-center">
                  <span className="font-serif text-xl font-bold text-accent">
                    {language === "ar" 
                      ? member.nameAr.split(" ").map((n) => n[0]).join("")
                      : member.name.split(" ").map((n) => n[0]).join("")
                    }
                  </span>
                </div>
                <h3 className="font-semibold text-foreground">
                  {language === "ar" ? member.nameAr : member.name}
                </h3>
                <p className="text-xs text-accent mt-1 mb-2">
                  {language === "ar" ? member.roleAr : member.role}
                </p>
                <p className="text-sm text-muted-foreground">
                  {language === "ar" ? member.bioAr : member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Origins */}
      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">{t("about.sourcing")}</p>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-foreground">{t("about.sourcingTitle")}</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {origins.map((origin, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="p-6 rounded-2xl border border-border bg-card hover:border-accent/40 transition-colors duration-300"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">
                {language === "ar" ? origin.countryAr : origin.country}
              </p>
              <p className="font-serif text-xl font-bold text-foreground mb-1">
                {language === "ar" ? origin.regionAr : origin.region}
              </p>
              <p className="text-sm text-muted-foreground">
                {language === "ar" ? origin.notesAr : origin.notes}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
