import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X, ShoppingBag, Languages } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";

const navLinks = [
  { href: "/menu", label: "nav.menu" },
  { href: "/about", label: "nav.about" },
  { href: "/reservations", label: "nav.reservations" },
  { href: "/blog", label: "nav.blog" },
  { href: "/contact", label: "nav.contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { getTotalItems } = useCart();
  const { language, toggleLanguage, t } = useLanguage();
  const [location] = useLocation();
  const totalItems = getTotalItems();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-xl bg-background/80 border-b border-border shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              href="/"
              data-testid="nav-logo"
              className={`font-serif text-2xl font-bold tracking-[0.2em] transition-colors duration-300 hover:text-accent ${
                theme === "light" && !scrolled ? "text-white" : "text-foreground"
              }`}
            >
              AROMA
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  data-testid={`nav-link-${label}`}
                  className={`text-sm font-medium tracking-wide transition-colors duration-200 relative group ${
                    location === href ? "text-accent" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t(label)}
                  <span className={`absolute -bottom-1 ${language === 'ar' ? 'right-0' : 'left-0'} h-px bg-accent transition-all duration-300 ${location === href ? "w-full" : "w-0 group-hover:w-full"}`} />
                </Link>
              ))}
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-3">
              <Link
                href="/cart"
                data-testid="btn-cart"
                className="hidden lg:flex w-9 h-9 items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200 relative"
                aria-label={t("aria.cart")}
              >
                <ShoppingBag size={18} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -end-1 w-4 h-4 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>

              <button
                data-testid="btn-toggle-language"
                onClick={toggleLanguage}
                className="hidden lg:flex w-9 h-9 items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200"
                aria-label={t("aria.language")}
              >
                <Languages size={16} />
              </button>

              <button
                data-testid="btn-toggle-theme"
                onClick={toggleTheme}
                className="hidden lg:flex w-9 h-9 items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200"
                aria-label={t("aria.theme")}
              >
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </button>

              <Link
                href="/menu"
                data-testid="btn-order-now"
                className="hidden lg:inline-flex items-center px-5 py-2 bg-accent text-accent-foreground text-sm font-semibold rounded-full hover:bg-accent/90 transition-all duration-200 hover:shadow-md"
              >
                {t("nav.orderNow")}
              </Link>

              {/* Mobile Hamburger */}
              <button
                data-testid="btn-mobile-menu"
                onClick={() => setMobileOpen((v) => !v)}
                className="lg:hidden w-9 h-9 flex items-center justify-center text-foreground"
                aria-label={t("aria.menu")}
              >
                <AnimatePresence mode="wait">
                  {mobileOpen ? (
                    <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <X size={20} />
                    </motion.div>
                  ) : (
                    <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Menu size={20} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-overlay"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col"
          >
            <div className="flex-1 flex flex-col justify-center px-8">
              <div className="space-y-1">
                {navLinks.map(({ href, label }, i) => (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, x: language === "ar" ? 30 : -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={href}
                      data-testid={`mobile-nav-${label}`}
                      className="block py-4 font-serif text-4xl font-semibold text-foreground hover:text-accent transition-colors border-b border-border/30"
                    >
                      {t(label)}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.4 }}
                className="mt-10 flex items-center gap-4"
              >
                <Link
                  href="/menu"
                  data-testid="mobile-btn-order"
                  className="px-8 py-3 bg-accent text-accent-foreground font-semibold rounded-full text-lg"
                >
                  {t("nav.orderNow")}
                </Link>
                <button
                  data-testid="mobile-btn-language"
                  onClick={toggleLanguage}
                  className="w-12 h-12 flex items-center justify-center rounded-full border border-border text-muted-foreground"
                >
                  <Languages size={18} />
                </button>
                <button
                  data-testid="mobile-btn-theme"
                  onClick={toggleTheme}
                  className="w-12 h-12 flex items-center justify-center rounded-full border border-border text-muted-foreground"
                >
                  {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
