import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Cart() {
  const { items, updateQuantity, removeFromCart } = useCart();
  const { t, language } = useLanguage();
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const applyPromo = () => {
    if (promoCode.toUpperCase() === "AROMA10") {
      setDiscount(0.1);
    }
  };

  const cartProducts = items.map((item) => {
    const product = products.find((p) => p.id === item.productId)!;
    return {
      ...product,
      displayName: language === "ar" ? product.nameAr : product.name,
      quantity: item.quantity,
      roast: item.roast,
      cartKey: `${item.productId}-${item.roast ?? "none"}`,
    };
  });

  const subtotal = cartProducts.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = subtotal * discount;
  const delivery = subtotal > 200 ? 0 : 30;
  const total = subtotal - discountAmount + delivery;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-24 px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">{t("cart.title")}</p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            {items.length === 0 ? t("cart.empty") : `${items.length} ${items.length === 1 ? t("cart.item") : t("cart.items")}`}
          </h1>
        </motion.div>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 rounded-full bg-muted/30 flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={32} className="text-muted-foreground" />
            </div>
            <p className="text-muted-foreground mb-6">{t("cart.empty")}</p>
            <Link href="/menu">
              <a className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-full hover:bg-accent/90 transition-all">
                {t("cart.browseMenu")} <ArrowRight size={16} className="icon-rtl" />
              </a>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {cartProducts.map((item, i) => (
                  <motion.div
                    key={item.cartKey}
                    initial={{ opacity: 0, x: language === "ar" ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: language === "ar" ? -20 : 20 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-card border border-border rounded-2xl p-4 sm:p-5 flex gap-4 sm:gap-5"
                  >
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.displayName} 
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23333" width="200" height="200"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ECoffee%3C/text%3E%3C/svg%3E';
                        }}
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-serif text-lg font-bold text-foreground">{item.displayName}</h3>
                          <p className="text-sm text-muted-foreground">
                            {item.price} {t("common.egp")} {t("cart.each")}
                            {item.roast && (
                              <span className="ms-2 text-accent">· {t(`menu.roast.${item.roast.toLowerCase()}.label`)}</span>
                            )}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id, item.roast)}
                          className="text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
                          aria-label={t("aria.removeItem")}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 border border-border rounded-full px-4 py-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1, item.roast)}
                            className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-6 text-center font-semibold text-foreground">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1, item.roast)}
                            className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="font-bold text-foreground">{item.price * item.quantity} {t("common.egp")}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card border border-border rounded-2xl p-4 sm:p-6 h-fit sticky top-24"
            >
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">{t("cart.orderSummary")}</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t("cart.subtotal")}</span>
                  <span className="text-foreground font-medium">{subtotal} {t("common.egp")}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-accent">{t("cart.discount")} (10%)</span>
                    <span className="text-accent font-medium">-{discountAmount.toFixed(0)} {t("common.egp")}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t("cart.delivery")}</span>
                  <span className="text-foreground font-medium">{delivery === 0 ? t("cart.free") : `${delivery} ${t("common.egp")}`}</span>
                </div>
                {subtotal < 200 && subtotal > 0 && (
                  <p className="text-xs text-muted-foreground">{t("cart.freeDeliveryNote").replace("{amount}", String(200 - subtotal))}</p>
                )}
              </div>

              <div className="border-t border-border pt-4 mb-6">
                <div className="flex justify-between">
                  <span className="font-semibold text-foreground">{t("cart.total")}</span>
                  <span className="font-bold text-xl text-foreground">{total.toFixed(0)} {t("common.egp")}</span>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                  {t("cart.promoCode")}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="AROMA10"
                    className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/40 text-sm"
                  />
                  <button
                    onClick={applyPromo}
                    className="px-4 py-2 bg-accent/10 text-accent font-semibold rounded-lg hover:bg-accent/20 transition-all text-sm cursor-pointer"
                  >
                    {t("cart.apply")}
                  </button>
                </div>
              </div>

              <Link href="/checkout">
                <a className="w-full flex items-center justify-center gap-2 py-4 bg-accent text-accent-foreground font-semibold rounded-full hover:bg-accent/90 transition-all duration-200 hover:shadow-lg">
                  {t("cart.checkout")} <ArrowRight size={16} className="icon-rtl" />
                </a>
              </Link>

              <Link href="/menu">
                <a className="block text-center text-sm text-muted-foreground hover:text-accent transition-colors mt-4">
                  {t("cart.continueShopping")}
                </a>
              </Link>
            </motion.div>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
