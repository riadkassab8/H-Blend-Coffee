import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, X, Plus, Minus } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { products, categoryLabels, type Product } from "@/data/products";

type Category = Product["category"] | "all";

const allCategories: Category[] = ["all", "hot", "iced", "signature", "dessert", "beans", "merch"];

const cardGradients = [
  "from-[hsl(22_48%_16%)] to-[hsl(30_35%_22%)]",
  "from-[hsl(20_18%_12%)] to-[hsl(22_48%_20%)]",
  "from-[hsl(30_30%_18%)] to-[hsl(20_18%_12%)]",
  "from-[hsl(22_40%_20%)] to-[hsl(38_50%_18%)]",
  "from-[hsl(20_18%_14%)] to-[hsl(30_25%_20%)]",
  "from-[hsl(22_48%_18%)] to-[hsl(20_16%_14%)]",
];

function ProductCard({ product, index, onOpen }: { product: Product; index: number; onOpen: (p: Product) => void }) {
  const [wished, setWished] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 6) * 0.06, duration: 0.5 }}
      data-testid={`card-product-${product.id}`}
      className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/30 transition-all duration-300 hover:shadow-lg"
    >
      {/* Image Area */}
      <div
        className={`relative h-44 bg-gradient-to-br ${cardGradients[index % cardGradients.length]} cursor-pointer overflow-hidden`}
        onClick={() => onOpen(product)}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-accent/40" />
          </div>
        </div>
        {product.badge && (
          <span className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 bg-accent text-accent-foreground rounded-full">
            {product.badge}
          </span>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <span className="text-white text-xs font-semibold uppercase tracking-widest">Quick View</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-serif text-lg font-bold text-foreground leading-tight">{product.name}</h3>
          <button
            data-testid={`btn-wish-${product.id}`}
            onClick={() => setWished((v) => !v)}
            className="shrink-0 mt-0.5"
            aria-label="Add to wishlist"
          >
            <Heart
              size={16}
              className={`transition-all duration-200 ${wished ? "fill-accent text-accent" : "text-muted-foreground hover:text-accent"}`}
            />
          </button>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="font-semibold text-foreground" data-testid={`text-price-${product.id}`}>
            {product.price} EGP
          </span>
          <button
            data-testid={`btn-add-cart-${product.id}`}
            className="flex items-center gap-1.5 px-4 py-2 bg-accent text-accent-foreground text-xs font-semibold rounded-full hover:bg-accent/90 transition-all duration-200"
          >
            <ShoppingBag size={12} />
            Add
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const [qty, setQty] = useState(1);
  const gradIdx = product.id % cardGradients.length;

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
        <div className={`h-52 bg-gradient-to-br ${cardGradients[gradIdx]} relative`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full border-2 border-accent/40" />
            </div>
          </div>
          {product.badge && (
            <span className="absolute top-4 left-4 text-xs font-semibold px-3 py-1 bg-accent text-accent-foreground rounded-full">
              {product.badge}
            </span>
          )}
          <button
            data-testid="btn-close-modal"
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h2 className="font-serif text-2xl font-bold text-foreground">{product.name}</h2>
            <span className="text-lg font-bold text-accent shrink-0">{product.price} EGP</span>
          </div>
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
            {categoryLabels[product.category]}
          </span>
          <p className="text-muted-foreground leading-relaxed mb-4">{product.description}</p>
          {product.ingredients && (
            <div className="mb-6 p-4 bg-background rounded-xl border border-border">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">Ingredients</p>
              <p className="text-sm text-foreground">{product.ingredients}</p>
            </div>
          )}

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 border border-border rounded-full px-4 py-2">
              <button
                data-testid="btn-qty-minus"
                onClick={() => setQty((v) => Math.max(1, v - 1))}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Minus size={14} />
              </button>
              <span className="w-6 text-center font-semibold text-foreground" data-testid="text-qty">{qty}</span>
              <button
                data-testid="btn-qty-plus"
                onClick={() => setQty((v) => v + 1)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Plus size={14} />
              </button>
            </div>
            <button
              data-testid="btn-modal-add-cart"
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-accent text-accent-foreground font-semibold rounded-full hover:bg-accent/90 transition-all duration-200"
            >
              <ShoppingBag size={16} />
              Add to Cart &mdash; {product.price * qty} EGP
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filtered = activeCategory === "all" ? products : products.filter((p) => p.category === activeCategory);

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
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Our Menu</p>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-foreground">Every cup, considered.</h1>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex gap-2 flex-wrap mb-10" data-testid="category-tabs">
          {allCategories.map((cat) => (
            <button
              key={cat}
              data-testid={`btn-category-${cat}`}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-accent text-accent-foreground shadow-md"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
              }`}
            >
              {cat === "all" ? "All" : categoryLabels[cat as Product["category"]]}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} onOpen={setSelectedProduct} />
            ))}
          </AnimatePresence>
        </motion.div>
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
