import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Check, Calendar, Clock, Users } from "lucide-react";

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM",
  "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM",
  "9:00 PM", "10:00 PM",
];

const branches = ["Maadi", "Zamalek", "Downtown"];

interface FormData {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: string;
  branch: string;
  requests: string;
}

export default function Reservations() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormData>({
    name: "", phone: "", email: "", date: "", time: "",
    guests: "2", branch: "Maadi", requests: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validate = () => {
    const e: Partial<FormData> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.trim()) e.phone = "Phone is required";
    if (!form.email.trim() || !form.email.includes("@")) e.email = "Valid email required";
    if (!form.date) e.date = "Please select a date";
    if (!form.time) e.time = "Please select a time";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) setSubmitted(true);
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-24 px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Reserve a Table</p>
            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-4">We're expecting you.</h1>
            <p className="text-muted-foreground">Book your table in seconds. We'll hold it for 15 minutes past your reserved time.</p>
          </motion.div>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-card border border-border rounded-2xl p-12 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mx-auto mb-6">
                  <Check className="text-accent" size={28} />
                </div>
                <h2 className="font-serif text-3xl font-bold text-foreground mb-3">Your table is reserved.</h2>
                <p className="text-muted-foreground mb-2">See you at BLEND {form.branch}.</p>
                <p className="text-sm text-muted-foreground">
                  {form.date} at {form.time} &middot; {form.guests} {parseInt(form.guests) === 1 ? "guest" : "guests"}
                </p>
                <p className="text-xs text-muted-foreground mt-6">A confirmation has been sent to {form.email}</p>
                <button
                  data-testid="btn-new-reservation"
                  onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", email: "", date: "", time: "", guests: "2", branch: "Maadi", requests: "" }); }}
                  className="mt-8 text-sm text-accent hover:underline"
                >
                  Make another reservation
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                onSubmit={handleSubmit}
                className="bg-card border border-border rounded-2xl p-8 space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="res-name" className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Full Name</label>
                    <input
                      id="res-name"
                      data-testid="input-reservation-name"
                      type="text"
                      value={form.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder="Layla Hassan"
                      className={`w-full px-4 py-3 bg-background border rounded-lg text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all ${errors.name ? "border-destructive" : "border-border"}`}
                    />
                    {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="res-phone" className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Phone</label>
                    <input
                      id="res-phone"
                      data-testid="input-reservation-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      placeholder="+20 1XX XXX XXXX"
                      className={`w-full px-4 py-3 bg-background border rounded-lg text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all ${errors.phone ? "border-destructive" : "border-border"}`}
                    />
                    {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="res-email" className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Email</label>
                  <input
                    id="res-email"
                    data-testid="input-reservation-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="layla@example.com"
                    className={`w-full px-4 py-3 bg-background border rounded-lg text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all ${errors.email ? "border-destructive" : "border-border"}`}
                  />
                  {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div>
                    <label htmlFor="res-date" className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                      <Calendar size={10} className="inline mr-1" />Date
                    </label>
                    <input
                      id="res-date"
                      data-testid="input-reservation-date"
                      type="date"
                      value={form.date}
                      onChange={(e) => handleChange("date", e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className={`w-full px-4 py-3 bg-background border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all ${errors.date ? "border-destructive" : "border-border"}`}
                    />
                    {errors.date && <p className="text-xs text-destructive mt-1">{errors.date}</p>}
                  </div>
                  <div>
                    <label htmlFor="res-time" className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                      <Clock size={10} className="inline mr-1" />Time
                    </label>
                    <select
                      id="res-time"
                      data-testid="select-reservation-time"
                      value={form.time}
                      onChange={(e) => handleChange("time", e.target.value)}
                      className={`w-full px-4 py-3 bg-background border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all ${errors.time ? "border-destructive" : "border-border"}`}
                    >
                      <option value="">Select</option>
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                    {errors.time && <p className="text-xs text-destructive mt-1">{errors.time}</p>}
                  </div>
                  <div>
                    <label htmlFor="res-guests" className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                      <Users size={10} className="inline mr-1" />Guests
                    </label>
                    <select
                      id="res-guests"
                      data-testid="select-reservation-guests"
                      value={form.guests}
                      onChange={(e) => handleChange("guests", e.target.value)}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all"
                    >
                      {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="res-branch" className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Branch</label>
                  <div className="flex gap-3" data-testid="branch-selector">
                    {branches.map((branch) => (
                      <button
                        key={branch}
                        type="button"
                        data-testid={`btn-branch-${branch.toLowerCase()}`}
                        onClick={() => handleChange("branch", branch)}
                        className={`flex-1 py-3 rounded-lg border text-sm font-medium transition-all duration-200 ${
                          form.branch === branch
                            ? "bg-accent text-accent-foreground border-accent"
                            : "bg-background text-muted-foreground border-border hover:border-accent/40"
                        }`}
                      >
                        {branch}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="res-requests" className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Special Requests <span className="normal-case font-normal">(optional)</span></label>
                  <textarea
                    id="res-requests"
                    data-testid="textarea-reservation-requests"
                    value={form.requests}
                    onChange={(e) => handleChange("requests", e.target.value)}
                    rows={3}
                    placeholder="Allergies, celebrations, seating preferences..."
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  data-testid="btn-submit-reservation"
                  className="w-full py-4 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent/90 transition-all duration-200 hover:shadow-lg"
                >
                  Confirm Reservation
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </div>
  );
}
