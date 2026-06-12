import { Link } from "wouter";
import { Instagram, Twitter, Facebook, Youtube } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { branches } from "@/data/contactData";

export function Footer() {
  const { language, t } = useLanguage();
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <p className="font-serif text-3xl font-bold tracking-[0.2em] text-foreground mb-3">AROMA</p>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-[220px]">
              {t("footer.tagline")}
            </p>
            <div className="flex gap-3 mt-6">
              <a
                href="#"
                data-testid="footer-social-instagram"
                aria-label="Instagram"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-white hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 hover:border-transparent transition-all duration-300"
              >
                <Instagram size={15} />
              </a>
              <a
                href="#"
                data-testid="footer-social-facebook"
                aria-label="Facebook"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-white hover:bg-[#1877F2] hover:border-[#1877F2] transition-all duration-300"
              >
                <Facebook size={15} />
              </a>
              <a
                href="#"
                data-testid="footer-social-twitter"
                aria-label="Twitter"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-white hover:bg-[#1DA1F2] hover:border-[#1DA1F2] transition-all duration-300"
              >
                <Twitter size={15} />
              </a>
              <a
                href="#"
                data-testid="footer-social-youtube"
                aria-label="YouTube"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-white hover:bg-[#FF0000] hover:border-[#FF0000] transition-all duration-300"
              >
                <Youtube size={15} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-5">{t("footer.navigate")}</p>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home", key: "nav.menu" },
                { href: "/menu", label: "Menu", key: "nav.menu" },
                { href: "/about", label: "About", key: "nav.about" },
                { href: "/reservations", label: "Reservations", key: "nav.reservations" },
                { href: "/blog", label: "Blog", key: "nav.blog" },
                { href: "/faq", label: "FAQ", key: "faq.label" },
              ].map(({ href, label, key }) => (
                <li key={href}>
                  <Link
                    href={href}
                    data-testid={`footer-link-${label.toLowerCase()}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {href === "/" ? t("nav.home") : t(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Branches */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-5">{t("footer.branches")}</p>
            <ul className="space-y-4">
              {branches.map((branch) => (
                <li key={branch.name}>
                  <p className="text-sm font-medium text-foreground">{language === "ar" ? branch.nameAr : branch.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{language === "ar" ? branch.addressAr : branch.address}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-5">{t("footer.contact")}</p>
            <ul className="space-y-3">
              <li className="text-sm text-muted-foreground">hello@aromacoffee.eg</li>
              <li className="text-sm text-muted-foreground">+20 100 123 4567</li>
              <li className="text-sm text-muted-foreground">{t("footer.daily")}</li>
            </ul>
            <Link
              href="/contact"
              data-testid="footer-contact-link"
              className="inline-block mt-6 text-sm font-medium text-accent hover:underline"
            >
              {t("footer.contactUs")}
            </Link>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; 2025 {t("footer.copyright")}. {t("footer.rights")}
          </p>
          <div className="flex gap-5">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              {t("footer.privacy")}
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              {t("footer.terms")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
