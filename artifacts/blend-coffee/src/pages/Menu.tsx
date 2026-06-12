import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, X, Plus, Minus, Flame } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { products, categoryLabels, type Product } from "@/data/products";
import { hasRoastProfile, roastLevels, type RoastLevel } from "@/data/roastProfiles";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";

type Category = Product["category"] | "all";

const allCategories: Category[] = ["all", "beans", "ground", "capsules", "equipment", "drinks", "accessories"];

function ProductCard({ product, index, onOpen }: { product: Product; index: number; onOpen: (p: Product) => void }) {
  const [wished, setWished] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addToCart } = useCart();
  const { t, language } = useLanguage();
  
  const productName = language === "ar" ? product.nameAr : product.name;
  const productDescription = language === "ar" ? product.descriptionAr : product.description;
  const productBadge = product.badge ? (language === "ar" ? product.badgeAr : product.badge) : undefined;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.05, 0.3), duration: 0.4 }}
      data-testid={`card-product-${product.id}`}
      className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/30 transition-all duration-300 hover:shadow-lg"
    >
      {/* Image Area */}
      <div
        className="relative h-44 cursor-pointer overflow-hidden bg-muted"
        onClick={() => onOpen(product)}
      >
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
          </div>
        )}
        <img 
          src={product.image} 
          alt={product.name}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23333" width="400" height="300"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ECoffee%3C/text%3E%3C/svg%3E';
            setImageLoaded(true);
          }}
          className={`w-full h-full object-cover transition-all duration-700 ${imageLoaded ? 'opacity-100 group-hover:scale-110' : 'opacity-0'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        {productBadge && (
          <span className="absolute top-3 start-3 text-xs font-semibold px-2.5 py-1 bg-accent text-accent-foreground rounded-full z-10">
            {productBadge}
          </span>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <span className="text-white text-xs font-semibold uppercase tracking-widest">{t("menu.quickView")}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 cursor-pointer" onClick={() => onOpen(product)}>
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-serif text-lg font-bold text-foreground leading-tight">{productName}</h3>
          <motion.button
            data-testid={`btn-wish-${product.id}`}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              setWished((v) => !v);
            }}
            className="shrink-0 mt-0.5 cursor-pointer"
            aria-label={t("aria.addToWishlist")}
          >
            <Heart
              size={16}
              className={`transition-all duration-200 ${wished ? "fill-accent text-accent" : "text-muted-foreground hover:text-accent"}`}
            />
          </motion.button>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">{productDescription}</p>
        <div className="flex items-center justify-between">
          <span className="font-semibold text-foreground" data-testid={`text-price-${product.id}`}>
            {product.price} {t("common.egp")}
          </span>
          <motion.button
            data-testid={`btn-add-cart-${product.id}`}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product.id, 1);
            }}
            className="flex items-center gap-1.5 px-4 py-2 bg-accent text-accent-foreground text-xs font-semibold rounded-full hover:bg-accent/90 transition-all duration-200 cursor-pointer"
          >
            <ShoppingBag size={12} />
            {t("menu.addToCart")}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

function RoastSelector({
  selected,
  onSelect,
}: {
  selected: RoastLevel;
  onSelect: (roast: RoastLevel) => void;
}) {
  const { t } = useLanguage();

  const roastMeta: Record<RoastLevel, { intensity: number; tone: string }> = {
    R1: { intensity: 2, tone: "from-amber-200/20 to-amber-500/10" },
    R2: { intensity: 4, tone: "from-amber-700/25 to-amber-900/15" },
  };

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Flame size={14} className="text-accent" />
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {t("menu.roast.title")}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {roastLevels.map((level) => {
          const isSelected = selected === level;
          const meta = roastMeta[level];
          return (
            <button
              key={level}
              type="button"
              data-testid={`btn-roast-${level.toLowerCase()}`}
              onClick={() => onSelect(level)}
              className={`relative text-start rounded-xl border p-4 transition-all duration-200 cursor-pointer bg-gradient-to-br ${meta.tone} ${
                isSelected
                  ? "border-accent ring-2 ring-accent/30 shadow-md"
                  : "border-border hover:border-accent/40"
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-serif text-base font-bold text-foreground">
                  {t(`menu.roast.${level.toLowerCase()}.label`)}
                </span>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`w-1.5 h-1.5 rounded-full ${
                        i < meta.intensity ? "bg-accent" : "bg-border"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t(`menu.roast.${level.toLowerCase()}.desc`)}
              </p>
              {isSelected && (
                <span className="absolute top-3 end-3 w-2 h-2 rounded-full bg-accent" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const [qty, setQty] = useState(1);
  const [selectedRoast, setSelectedRoast] = useState<RoastLevel>("R1");
  const { addToCart } = useCart();
  const { t, language } = useLanguage();
  const showRoast = hasRoastProfile(product.category);

  useEffect(() => {
    setQty(1);
    setSelectedRoast("R1");
  }, [product.id]);
  
  const productName = language === "ar" ? product.nameAr : product.name;
  const productDescription = language === "ar" ? product.descriptionAr : product.description;
  const productBadge = product.badge ? (language === "ar" ? product.badgeAr : product.badge) : undefined;

  const handleAddToCart = () => {
    addToCart(product.id, qty, showRoast ? selectedRoast : undefined);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, y: 20 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="bg-card border border-border rounded-2xl overflow-hidden max-w-lg w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        data-testid="modal-product"
      >
        <div className="h-52 relative overflow-hidden">
          <img 
            src={product.image} 
            alt={productName}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23333" width="400" height="300"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ECoffee%3C/text%3E%3C/svg%3E';
            }}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          {productBadge && (
            <span className="absolute top-4 start-4 text-xs font-semibold px-3 py-1 bg-accent text-accent-foreground rounded-full z-10">
              {productBadge}
            </span>
          )}
          <motion.button
            data-testid="btn-close-modal"
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute top-4 end-4 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors z-10 cursor-pointer"
          >
            <X size={16} />
          </motion.button>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h2 className="font-serif text-2xl font-bold text-foreground">{productName}</h2>
            <span className="text-lg font-bold text-accent shrink-0">{product.price} {t("common.egp")}</span>
          </div>
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
            {t(`category.${product.category}`)}
          </span>
          <p className="text-muted-foreground leading-relaxed mb-4">{productDescription}</p>
          {product.weight && (
            <p className="text-xs text-muted-foreground mb-4">{product.weight}</p>
          )}
          {showRoast && (
            <RoastSelector selected={selectedRoast} onSelect={setSelectedRoast} />
          )}
          {product.ingredients && (
            <div className="mb-6 p-4 bg-background rounded-xl border border-border">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">{t("menu.ingredients")}</p>
              <p className="text-sm text-foreground">{product.ingredients}</p>
            </div>
          )}

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 border border-border rounded-full px-4 py-2">
              <motion.button
                data-testid="btn-qty-minus"
                whileTap={{ scale: 0.9 }}
                onClick={() => setQty((v) => Math.max(1, v - 1))}
                className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <Minus size={14} />
              </motion.button>
              <span className="w-6 text-center font-semibold text-foreground" data-testid="text-qty">{qty}</span>
              <motion.button
                data-testid="btn-qty-plus"
                whileTap={{ scale: 0.9 }}
                onClick={() => setQty((v) => v + 1)}
                className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <Plus size={14} />
              </motion.button>
            </div>
            <motion.button
              data-testid="btn-modal-add-cart"
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-accent text-accent-foreground font-semibold rounded-full hover:bg-accent/90 transition-all duration-200 cursor-pointer"
            >
              <ShoppingBag size={16} />
              {t("menu.addToCart")} &mdash; {product.price * qty} {t("common.egp")}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useLanguage();

  const filtered = activeCategory === "all" ? products : products.filter((p) => p.category === activeCategory);

  // Simulate initial load
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-8 px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">{t("menu.label")}</p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">{t("menu.title")}</h1>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex gap-2 flex-wrap mb-10" data-testid="category-tabs">
          {allCategories.map((cat) => (
            <motion.button
              key={cat}
              data-testid={`btn-category-${cat}`}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? "bg-accent text-accent-foreground shadow-md"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
              }`}
            >
              {cat === "all" ? t("menu.all") : t(`category.${cat}`)}
            </motion.button>
          ))}
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl overflow-hidden animate-pulse">
                <div className="h-44 bg-muted" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-full" />
                  <div className="h-3 bg-muted rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} onOpen={setSelectedProduct} />
            ))}
          </div>
        )}
      </section>

      <AnimatePresence>
        {selectedProduct && (
          <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
