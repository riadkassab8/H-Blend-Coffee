import { useRef, useEffect, useState } from "react";
import { Link } from "wouter";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Star, Globe, Flame, Trophy, Leaf } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { products as allProducts } from "@/data/products";
import { testimonials } from "@/data/testimonials";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslatedProducts } from "@/hooks/useTranslatedData";

/* ── Animated counter ── */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1600;
          const steps = 50;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) { setCount(target); clearInterval(timer); }
            else setCount(Math.floor(current));
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

/* ── Floating coffee bean ── */
function CoffeeBean({ x, y, size, delay }: { x: number; y: number; size: number; delay: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%` }}
      animate={{ y: [0, -18, 0], rotate: [0, 15, -10, 0], opacity: [0.15, 0.35, 0.15] }}
      transition={{ duration: 5 + delay, repeat: Infinity, delay, ease: "easeInOut" }}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="12" rx="8" ry="11" stroke="hsl(38 82% 58%)" strokeWidth="1.5" fill="hsl(38 82% 58% / 0.15)" />
        <path d="M12 3 Q16 8 12 12 Q8 16 12 21" stroke="hsl(38 82% 58%)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </svg>
    </motion.div>
  );
}

const beans = [
  { x: 8, y: 15, size: 22, delay: 0 }, { x: 88, y: 20, size: 18, delay: 1.2 },
  { x: 20, y: 70, size: 26, delay: 0.6 }, { x: 75, y: 65, size: 20, delay: 1.8 },
  { x: 45, y: 10, size: 16, delay: 2.4 }, { x: 60, y: 80, size: 24, delay: 0.3 },
  { x: 5, y: 45, size: 14, delay: 1.5 }, { x: 92, y: 55, size: 20, delay: 0.9 },
];

const galleryImageKeys = [
  "home.gallery.caption1", "home.gallery.caption2", "home.gallery.caption3",
  "home.gallery.caption4", "home.gallery.caption5", "home.gallery.caption6",
  "home.gallery.caption7", "home.gallery.caption8",
] as const;

const whyItemKeys = [
  { Icon: Leaf, titleKey: "home.why.item1.title", descKey: "home.why.item1.desc" },
  { Icon: Flame, titleKey: "home.why.item2.title", descKey: "home.why.item2.desc" },
  { Icon: Trophy, titleKey: "home.why.item3.title", descKey: "home.why.item3.desc" },
  { Icon: Globe, titleKey: "home.why.item4.title", descKey: "home.why.item4.desc" },
] as const;

const processStepKeys = [
  { labelKey: "home.process.step1.label", descKey: "home.process.step1.desc" },
  { labelKey: "home.process.step2.label", descKey: "home.process.step2.desc" },
  { labelKey: "home.process.step3.label", descKey: "home.process.step3.desc" },
] as const;

const statKeys = [
  { value: 12, suffix: "", labelKey: "home.stats.origins" },
  { value: 3000000, suffix: "+", labelKey: "home.stats.cups" },
  { value: 8, suffix: "", labelKey: "home.stats.awards" },
  { value: 5, suffixKey: "home.stats.yearsSuffix", labelKey: "home.stats.craft" },
  { value: 3, suffix: "", labelKey: "home.stats.branches" },
  { value: 100, suffix: "%", labelKey: "home.stats.directTrade" },
] as const;

const galleryImages = [
  "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80",
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
  "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800&q=80",
  "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&q=80",
  "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=80",
  "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80",
  "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80",
  "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80",
];

const gradients = [
  "from-[hsl(22_48%_16%)] to-[hsl(30_35%_22%)]",
  "from-[hsl(20_18%_12%)] to-[hsl(22_48%_20%)]",
  "from-[hsl(30_30%_18%)] to-[hsl(20_18%_12%)]",
  "from-[hsl(22_40%_20%)] to-[hsl(38_50%_18%)]",
];

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const { language, t } = useLanguage();
  const isRtl = language === "ar";
  const translatedProducts = useTranslatedProducts();
  const bestSellers = translatedProducts.filter((p) => allProducts.find((o) => o.id === p.id)?.bestSeller);
  const featured = translatedProducts.filter((p) => allProducts.find((o) => o.id === p.id)?.featured);

  const carouselDirection = isRtl ? "rtl" : "ltr";
  const bestsellerAutoplay = useRef(Autoplay({ delay: 3200, stopOnInteraction: false }));
  const testimonialAutoplay = useRef(Autoplay({ delay: 4000, stopOnInteraction: false }));

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", direction: carouselDirection, containScroll: "trimSnaps" },
    [bestsellerAutoplay.current]
  );
  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  const [testEmblaRef, testEmblaApi] = useEmblaCarousel(
    { loop: true, align: "center", direction: carouselDirection, containScroll: "trimSnaps" },
    [testimonialAutoplay.current]
  );
  const testPrev = () => testEmblaApi?.scrollPrev();
  const testNext = () => testEmblaApi?.scrollNext();

  useEffect(() => {
    emblaApi?.reInit({ direction: carouselDirection });
  }, [emblaApi, carouselDirection]);

  useEffect(() => {
    testEmblaApi?.reInit({ direction: carouselDirection });
  }, [testEmblaApi, carouselDirection]);

  const PrevIcon = isRtl ? ChevronRight : ChevronLeft;
  const NextIcon = isRtl ? ChevronLeft : ChevronRight;

  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      {/* ── Hero ── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[hsl(20_18%_7%)]">
        {/* Background gradient animation */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0"
            animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{
              background: "radial-gradient(ellipse at 20% 40%, hsl(22 48% 18% / 0.8) 0%, transparent 60%), radial-gradient(ellipse at 80% 70%, hsl(38 82% 20% / 0.4) 0%, transparent 50%), radial-gradient(ellipse at 50% 20%, hsl(20 18% 12% / 0.6) 0%, transparent 40%)",
            }}
          />
        </div>

        {/* Film grain overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.035,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "180px 180px",
          }}
        />

        {/* Floating beans */}
        {beans.map((b, i) => <CoffeeBean key={i} {...b} />)}

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xs font-semibold uppercase tracking-[0.3em] text-accent/80 mb-6"
          >
            {t("home.subtitle")}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-none tracking-tight mb-6"
          >
            {t("home.hero.title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-base lg:text-lg text-white/50 font-light mb-10 max-w-md mx-auto leading-relaxed"
          >
            {t("home.hero.description")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link href="/menu" data-testid="hero-btn-menu" className="px-8 py-4 bg-accent text-accent-foreground font-semibold rounded-full hover:bg-accent/90 transition-all duration-200 hover:shadow-xl hover:shadow-accent/20">
              {t("home.hero.exploreMenu")}
            </Link>
            <Link href="/about" data-testid="hero-btn-story" className="px-8 py-4 border border-white/20 text-white font-medium rounded-full hover:bg-white/5 transition-all duration-200">
              {t("home.hero.ourStory")}
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-5 h-8 border border-white/20 rounded-full flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2 bg-accent/60 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Featured Products ── */}
      <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          className="mb-12"
        >
          <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">{t("home.featured.label")}</motion.p>
          <div className="flex items-end justify-between gap-4">
            <motion.h2 variants={fadeUp} className="font-serif text-4xl lg:text-5xl font-bold text-foreground">{t("home.featured.title")}</motion.h2>
            <motion.div variants={fadeUp}>
              <Link href="/menu" data-testid="link-view-all-menu" className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors">{t("home.featured.viewAll")} <ArrowRight size={14} className="icon-rtl" /></Link>
            </motion.div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              data-testid={`card-featured-${product.id}`}
              className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="h-48 relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23333" width="400" height="300"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ECoffee%3C/text%3E%3C/svg%3E';
                  }}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                {product.badge && (
                  <span className="absolute top-3 start-3 text-xs font-semibold px-2.5 py-1 bg-accent text-accent-foreground rounded-full">
                    {product.badge}
                  </span>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-serif text-lg font-bold text-foreground mb-1">{product.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground">{product.price} {t("common.egp")}</span>
                  <Link href="/menu" data-testid={`btn-order-featured-${product.id}`} className="text-xs font-semibold text-accent hover:underline">{t("home.featured.orderNow")}
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Why BLEND ── */}
      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">{t("home.why.label")}</p>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-foreground">{t("home.why.title")}</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyItemKeys.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="p-6 rounded-2xl border border-border bg-background hover:border-accent/30 transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <item.Icon size={18} className="text-accent" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{t(item.titleKey)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t(item.descKey)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Best Sellers Carousel ── */}
      <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">{t("home.bestsellers.label")}</motion.p>
            <motion.h2 variants={fadeUp} className="font-serif text-4xl lg:text-5xl font-bold text-foreground">{t("home.bestsellers.title")}</motion.h2>
          </div>
          <motion.div variants={fadeUp} className="hidden sm:flex gap-2">
            <button data-testid="btn-carousel-prev" onClick={scrollPrev} aria-label={t("common.previous")} className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all cursor-pointer">
              <PrevIcon size={18} />
            </button>
            <button data-testid="btn-carousel-next" onClick={scrollNext} aria-label={t("common.next")} className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all cursor-pointer">
              <NextIcon size={18} />
            </button>
          </motion.div>
        </motion.div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y -me-5">
            {bestSellers.map((product) => (
              <div
                key={product.id}
                className="min-w-0 shrink-0 grow-0 basis-[85%] sm:basis-[70%] md:basis-64 pe-5"
                data-testid={`card-bestseller-${product.id}`}
              >
                <div className="h-full bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/30 transition-all duration-300 group">
                  <div className="h-36 relative overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23333" width="400" height="300"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ECoffee%3C/text%3E%3C/svg%3E';
                      }}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif font-bold text-foreground mb-1">{product.name}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{product.description}</p>
                    <span className="text-sm font-semibold text-foreground">{product.price} {t("common.egp")}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Coffee Experience ── */}
      <section className="py-24 bg-[hsl(20_18%_7%)] text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
            >
              <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-widest text-accent/80 mb-4">{t("home.process.label")}</motion.p>
              <motion.h2 variants={fadeUp} className="font-serif text-4xl lg:text-5xl font-bold leading-tight mb-8">
                {t("home.process.title")}
              </motion.h2>
              <div className="space-y-6">
                {processStepKeys.map((step, i) => (
                  <motion.div key={i} variants={fadeUp} className="flex gap-5 border-b border-white/10 pb-6 last:border-0">
                    <span className="font-serif text-2xl font-bold text-accent/40 shrink-0 mt-0.5">0{i + 1}</span>
                    <div>
                      <h3 className="font-semibold text-white mb-1">{t(step.labelKey)}</h3>
                      <p className="text-sm text-white/50 leading-relaxed">{t(step.descKey)}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <div className="grid grid-cols-3 gap-4">
              {statKeys.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  data-testid={`stat-${i}`}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center"
                >
                  <p className="font-serif text-2xl lg:text-3xl font-bold text-accent">
                    <Counter target={stat.value} suffix={"suffixKey" in stat ? t(stat.suffixKey) : (stat.suffix ?? "")} />
                  </p>
                  <p className="text-xs text-white/40 mt-1 leading-tight">{t(stat.labelKey)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">{t("home.testimonials.label")}</p>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-foreground">{t("home.testimonials.title")}</h2>
          </motion.div>

          <div className="relative">
            <div className="overflow-hidden" ref={testEmblaRef}>
              <div className="flex touch-pan-y -me-5">
                {testimonials.map((item) => (
                  <div
                    key={item.id}
                    className="min-w-0 shrink-0 grow-0 basis-full sm:basis-[480px] pe-5"
                  >
                    <div
                      data-testid={`testimonial-${item.id}`}
                      className="h-full bg-card/60 backdrop-blur-sm border border-border rounded-2xl p-8"
                    >
                      <div className="flex gap-1 mb-5">
                        {Array.from({ length: item.rating }).map((_, i) => (
                          <Star key={i} size={14} className="fill-accent text-accent" />
                        ))}
                      </div>
                      <p className="text-muted-foreground leading-relaxed mb-6 italic">
                        &ldquo;{isRtl ? item.textAr : item.text}&rdquo;
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-accent/20 flex items-center justify-center shrink-0">
                          <span className="text-xs font-bold text-accent">{item.initials}</span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{isRtl && item.nameAr ? item.nameAr : item.name}</p>
                          <p className="text-xs text-muted-foreground">{isRtl && item.locationAr ? item.locationAr : item.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center gap-3 mt-8">
              <button data-testid="btn-testimonial-prev" onClick={testPrev} aria-label={t("common.previous")} className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-all cursor-pointer">
                <PrevIcon size={16} />
              </button>
              <button data-testid="btn-testimonial-next" onClick={testNext} aria-label={t("common.next")} className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-all cursor-pointer">
                <NextIcon size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-12"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">{t("home.gallery.label")}</p>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-foreground">{t("home.gallery.title")}</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {galleryImageKeys.map((captionKey, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              data-testid={`gallery-item-${i}`}
              className={`group relative overflow-hidden rounded-xl cursor-pointer ${i === 0 || i === 5 ? "md:col-span-2 md:row-span-2" : ""}`}
            >
              <div className={`relative ${i === 0 || i === 5 ? "h-64 md:h-full md:min-h-[320px]" : "h-40 md:h-48"} overflow-hidden`}>
                <img 
                  src={galleryImages[i]} 
                  alt={t(captionKey)}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23333" width="400" height="300"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ECoffee%3C/text%3E%3C/svg%3E';
                  }}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
              <div className="absolute bottom-0 inset-x-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-white/80 text-xs font-medium uppercase tracking-widest">{t(captionKey)}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="py-20 bg-card border-y border-border">
        <div className="max-w-xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          >
            <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">{t("home.newsletter.label")}</motion.p>
            <motion.h2 variants={fadeUp} className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-3">{t("home.newsletter.title")}</motion.h2>
            <motion.p variants={fadeUp} className="text-sm text-muted-foreground mb-8">{t("home.newsletter.description")}</motion.p>
            <motion.div variants={fadeUp}>
              <AnimatePresence mode="wait">
                {subscribed ? (
                  <motion.p
                    key="ty"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-accent font-semibold"
                  >
                    {t("home.newsletter.success")}
                  </motion.p>
                ) : (
                  <motion.form
                    key="nl-form"
                    onSubmit={(e) => { e.preventDefault(); if (email) setSubscribed(true); }}
                    className="flex gap-3 max-w-sm mx-auto"
                  >
                    <input
                      data-testid="input-newsletter-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder={t("home.newsletter.placeholder")}
                      className="flex-1 px-4 py-3 bg-background border border-border rounded-full text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all text-sm"
                    />
                    <button
                      type="submit"
                      data-testid="btn-newsletter-subscribe"
                      className="px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-full hover:bg-accent/90 transition-all duration-200 text-sm whitespace-nowrap cursor-pointer"
                    >
                      {t("home.newsletter.subscribe")}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
