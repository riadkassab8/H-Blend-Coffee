import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const timeline = [
  { year: "2019", title: "Founded", description: "Two coffee-obsessed friends opened a single espresso bar in Maadi with a secondhand La Marzocco and a clear vision." },
  { year: "2020", title: "First Roastery", description: "We brought roasting in-house. More control meant better coffee — and the beginning of our house blend." },
  { year: "2022", title: "Three Branches", description: "Zamalek and Downtown joined Maadi. Each branch designed to feel distinct but unmistakably BLEND." },
  { year: "2024", title: "Digital Launch", description: "Taking BLEND beyond the café — beans to your door, reservations online, and a community built around craft." },
];

const team = [
  { name: "Yasmine Adel", role: "Co-Founder & Head Roaster", bio: "Trained in Melbourne. Obsessed with Ethiopia." },
  { name: "Ahmed Saleh", role: "Co-Founder & Creative Director", bio: "Former architect. Now designs experiences, not buildings." },
  { name: "Nour Ibrahim", role: "Head Barista", bio: "SCA certified. Placed 2nd in Egyptian Barista Championship 2023." },
  { name: "Rania Khalil", role: "Operations Director", bio: "Keeps three branches running like one perfect shot." },
];

const origins = [
  { country: "Ethiopia", region: "Yirgacheffe", notes: "Floral, bergamot, bright acidity" },
  { country: "Colombia", region: "Huila", notes: "Caramel, red fruit, silky body" },
  { country: "Brazil", region: "Cerrado", notes: "Chocolate, walnut, low acidity" },
  { country: "Guatemala", region: "Antigua", notes: "Spice, dark fruit, complex finish" },
];

export default function About() {
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
            Our Story
          </motion.p>
          <motion.h1 variants={fadeUp} className="font-serif text-5xl lg:text-7xl font-bold text-foreground leading-tight mb-6">
            Born in Cairo.<br />Rooted in Coffee.
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg text-muted-foreground leading-relaxed max-w-xl">
            We started BLEND because we believed Cairo deserved a coffee experience that didn't ask you to fly to Melbourne to find it. Three branches later, we still believe that.
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
                Philosophy
              </motion.p>
              <motion.h2 variants={fadeUp} className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-6">
                We believe a great cup of coffee is an act of care.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed mb-4">
                Not just care about beans or technique — though those matter enormously. Care about the person receiving the cup. Care about the farmer who grew it. Care about the ten seconds you take to actually taste it.
              </motion.p>
              <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed">
                That philosophy drives everything from how we source to how we train our baristas to how we designed this website.
              </motion.p>
            </motion.div>
            <div className="grid grid-cols-1 gap-4">
              {[
                { num: "01", title: "Source with intention", text: "We visit origin annually. We pay above Fair Trade. We build relationships, not transactions." },
                { num: "02", title: "Roast with precision", text: "Every batch profiled, logged, and tasted. We roast light to preserve origin character." },
                { num: "03", title: "Serve with care", text: "Our baristas train for three months before pulling their first shot for a customer." },
              ].map((item, i) => (
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
                    <p className="font-semibold text-foreground mb-1">{item.title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
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
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Our Journey</p>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-foreground">Five years of craft</h2>
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
                  <h3 className="font-serif text-2xl font-bold text-foreground mt-1 mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed max-w-sm ${i % 2 === 0 ? 'ml-auto' : ''}">{item.description}</p>
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
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">The People</p>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-foreground">Behind the cup</h2>
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
                    {member.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground">{member.name}</h3>
                <p className="text-xs text-accent mt-1 mb-2">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
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
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Sourcing</p>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-foreground">Where our coffee comes from</h2>
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
              <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">{origin.country}</p>
              <p className="font-serif text-xl font-bold text-foreground mb-1">{origin.region}</p>
              <p className="text-sm text-muted-foreground">{origin.notes}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
