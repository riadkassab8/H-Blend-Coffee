import { Link } from "wouter";
import { Instagram, Twitter, Facebook, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <p className="font-serif text-3xl font-bold tracking-[0.2em] text-foreground mb-3">BLEND</p>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-[220px]">
              A luxury digital coffee experience. Rooted in Cairo. Reaching for the extraordinary.
            </p>
            <div className="flex gap-3 mt-6">
              {[
                { Icon: Instagram, href: "#", label: "Instagram" },
                { Icon: Facebook, href: "#", label: "Facebook" },
                { Icon: Twitter, href: "#", label: "Twitter" },
                { Icon: Youtube, href: "#", label: "YouTube" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  data-testid={`footer-social-${label.toLowerCase()}`}
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-accent hover:border-accent transition-colors duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-5">Navigate</p>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/menu", label: "Menu" },
                { href: "/about", label: "About" },
                { href: "/reservations", label: "Reservations" },
                { href: "/blog", label: "Blog" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    data-testid={`footer-link-${label.toLowerCase()}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Branches */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-5">Our Branches</p>
            <ul className="space-y-4">
              {[
                { name: "Maadi", address: "12 Road 9, Maadi, Cairo" },
                { name: "Zamalek", address: "4 Hassan Sabri St, Zamalek" },
                { name: "Downtown", address: "22 Talaat Harb, Downtown" },
              ].map(({ name, address }) => (
                <li key={name}>
                  <p className="text-sm font-medium text-foreground">{name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{address}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-5">Get in Touch</p>
            <ul className="space-y-3">
              <li className="text-sm text-muted-foreground">hello@blendcoffee.eg</li>
              <li className="text-sm text-muted-foreground">+20 100 123 4567</li>
              <li className="text-sm text-muted-foreground">Daily: 7:00 AM – 11:00 PM</li>
            </ul>
            <Link
              href="/contact"
              data-testid="footer-contact-link"
              className="inline-block mt-6 text-sm font-medium text-accent hover:underline"
            >
              Contact us
            </Link>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; 2025 BLEND Coffee. All rights reserved.
          </p>
          <div className="flex gap-5">
            {["Privacy Policy", "Terms of Service"].map((item) => (
              <a key={item} href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
