import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MapPin, Phone, Mail, Clock, MessageCircle, Check, Instagram, Facebook } from "lucide-react";

const branches = [
  { name: "Maadi", address: "12 Road 9, Maadi, Cairo", phone: "+20 100 111 2233" },
  { name: "Zamalek", address: "4 Hassan Sabri St, Zamalek", phone: "+20 100 111 2244" },
  { name: "Downtown", address: "22 Talaat Harb, Downtown Cairo", phone: "+20 100 111 2255" },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.email && form.message) setSubmitted(true);
  };

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-24 px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Get in Touch</p>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-4">We'd love to hear from you.</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Questions, feedback, wholesale enquiries, or just want to talk coffee — we're here.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center bg-card border border-border rounded-2xl p-12 text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mb-5">
                    <Check className="text-accent" size={24} />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-2">Message received.</h2>
                  <p className="text-muted-foreground text-sm">We'll get back to you within 24 hours.</p>
                  <button
                    data-testid="btn-send-another"
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                    className="mt-6 text-sm text-accent hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="bg-card border border-border rounded-2xl p-8 space-y-5"
                >
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Send a message</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Name</label>
                      <input
                        data-testid="input-contact-name"
                        type="text"
                        value={form.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        required
                        placeholder="Your name"
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Email</label>
                      <input
                        data-testid="input-contact-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        required
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Subject</label>
                    <input
                      data-testid="input-contact-subject"
                      type="text"
                      value={form.subject}
                      onChange={(e) => handleChange("subject", e.target.value)}
                      placeholder="What's this about?"
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Message</label>
                    <textarea
                      data-testid="textarea-contact-message"
                      value={form.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      required
                      rows={5}
                      placeholder="Tell us everything..."
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    data-testid="btn-submit-contact"
                    className="w-full py-4 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent/90 transition-all duration-200 hover:shadow-md"
                  >
                    Send Message
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Hours */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Clock size={16} className="text-accent" />
                <h3 className="font-semibold text-foreground">Opening Hours</h3>
              </div>
              <div className="space-y-2">
                {["Monday – Friday: 7:00 AM – 11:00 PM", "Saturday: 8:00 AM – 11:00 PM", "Sunday: 8:00 AM – 10:00 PM"].map((line) => (
                  <p key={line} className="text-sm text-muted-foreground">{line}</p>
                ))}
              </div>
            </div>

            {/* General Contact */}
            <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-accent" />
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <a href="mailto:hello@blendcoffee.eg" data-testid="link-email" className="text-sm text-foreground hover:text-accent transition-colors">hello@blendcoffee.eg</a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-accent" />
                <div>
                  <p className="text-xs text-muted-foreground">General Line</p>
                  <a href="tel:+201001234567" data-testid="link-phone" className="text-sm text-foreground hover:text-accent transition-colors">+20 100 123 4567</a>
                </div>
              </div>
            </div>

            {/* Branches */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <MapPin size={16} className="text-accent" />
                <h3 className="font-semibold text-foreground">Our Locations</h3>
              </div>
              <div className="space-y-4">
                {branches.map((b) => (
                  <div key={b.name} className="border-b border-border pb-4 last:border-0 last:pb-0">
                    <p className="text-sm font-semibold text-foreground">{b.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{b.address}</p>
                    <p className="text-xs text-muted-foreground">{b.phone}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* WhatsApp + Social */}
            <div className="flex gap-3">
              <a
                href="https://wa.me/201001234567"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="btn-whatsapp"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366] text-white font-semibold text-sm hover:bg-[#1db954] transition-colors"
              >
                <MessageCircle size={16} />
                WhatsApp
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="btn-instagram"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors text-sm font-medium"
              >
                <Instagram size={16} />
                Instagram
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="btn-facebook"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors text-sm font-medium"
              >
                <Facebook size={16} />
                Facebook
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
