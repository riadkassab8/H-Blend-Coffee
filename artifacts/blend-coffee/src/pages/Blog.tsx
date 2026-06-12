import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Clock, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { blogPosts, categoryLabels, type BlogPost } from "@/data/blogPosts";
import { useLanguage } from "@/contexts/LanguageContext";

const categories = ["all", "guides", "stories", "recipes", "news"] as const;
type FilterCategory = typeof categories[number];

const categoryColors: Record<BlogPost["category"], string> = {
  guides: "bg-primary/10 text-primary",
  stories: "bg-accent/10 text-accent",
  recipes: "bg-green-500/10 text-green-600 dark:text-green-400",
  news: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
};

export default function Blog() {
  const { language, t } = useLanguage();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("all");

  const featured = blogPosts.find((p) => p.featured);
  const rest = blogPosts.filter((p) => !p.featured);

  const filtered = rest.filter((post) => {
    const matchCat = activeCategory === "all" || post.category === activeCategory;
    const title = language === "ar" ? post.titleAr : post.title;
    const excerpt = language === "ar" ? post.excerptAr : post.excerpt;
    const matchSearch = title.toLowerCase().includes(search.toLowerCase()) || excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-12 px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-xl mb-12"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">{t("blog.label")}</p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">{t("blog.title")}</h1>
          <p className="text-muted-foreground">{t("blog.subtitle")}</p>
        </motion.div>

        {/* Featured */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-14 rounded-2xl overflow-hidden border border-border group cursor-pointer"
            data-testid={`post-featured-${featured.id}`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="h-56 lg:h-auto relative overflow-hidden">
                <img 
                  src={featured.image} 
                  alt={language === "ar" ? featured.titleAr : featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8 lg:p-10 bg-card">
                <span className={`inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4 ${categoryColors[featured.category]}`}>
                  {language === "ar" ? categoryLabels[featured.category].ar : categoryLabels[featured.category].en}
                </span>
                <h2 className="font-serif text-2xl lg:text-3xl font-bold text-foreground mb-4 group-hover:text-accent transition-colors duration-200 leading-snug">
                  {language === "ar" ? featured.titleAr : featured.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-3">{language === "ar" ? featured.excerptAr : featured.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{language === "ar" ? featured.dateAr : featured.date}</span>
                    <span>&middot;</span>
                    <Clock size={12} className="inline" />
                    <span>{language === "ar" ? featured.readTimeAr : featured.readTime}</span>
                  </div>
                  <span className="flex items-center gap-1 text-sm text-accent font-medium group-hover:gap-2 transition-all duration-200">
                    {t("blog.read")} <ArrowRight size={14} className="icon-rtl" />
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-sm">
            <Search size={15} className="absolute start-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              data-testid="input-blog-search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("blog.search")}
              className="w-full ps-10 pe-4 py-2.5 bg-card border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                data-testid={`btn-blog-filter-${cat}`}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 capitalize ${
                  activeCategory === cat
                    ? "bg-accent text-accent-foreground"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                }`}
              >
                {cat === "all" ? t("blog.all") : (language === "ar" ? categoryLabels[cat as BlogPost["category"]].ar : categoryLabels[cat as BlogPost["category"]].en)}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.length === 0 ? (
            <div className="col-span-full text-center py-16 text-muted-foreground">
              {t("blog.noResults")}
            </div>
          ) : (
            filtered.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                data-testid={`post-card-${post.id}`}
                className="bg-card border border-border rounded-2xl overflow-hidden group cursor-pointer hover:border-accent/30 transition-colors duration-300"
              >
                <div className="h-44 relative overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={language === "ar" ? post.titleAr : post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <span className={`inline-block text-xs font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full mb-3 ${categoryColors[post.category]}`}>
                    {language === "ar" ? categoryLabels[post.category].ar : categoryLabels[post.category].en}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors duration-200 leading-snug">
                    {language === "ar" ? post.titleAr : post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">{language === "ar" ? post.excerptAr : post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{language === "ar" ? post.dateAr : post.date}</span>
                    <span className="flex items-center gap-1">
                      <Clock size={11} />
                      {language === "ar" ? post.readTimeAr : post.readTime}
                    </span>
                  </div>
                </div>
              </motion.article>
            ))
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
