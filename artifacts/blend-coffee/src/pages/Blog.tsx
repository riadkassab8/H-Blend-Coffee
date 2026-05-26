import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Clock, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { blogPosts, categoryLabels, type BlogPost } from "@/data/blogPosts";

const categories = ["all", "guides", "stories", "recipes", "news"] as const;
type FilterCategory = typeof categories[number];

const categoryColors: Record<BlogPost["category"], string> = {
  guides: "bg-primary/10 text-primary",
  stories: "bg-accent/10 text-accent",
  recipes: "bg-green-500/10 text-green-600 dark:text-green-400",
  news: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
};

const gradients = [
  "from-primary/40 to-accent/20",
  "from-accent/40 to-primary/20",
  "from-primary/30 to-muted",
  "from-accent/30 to-primary/30",
  "from-muted to-primary/20",
  "from-primary/20 to-accent/30",
];

export default function Blog() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("all");

  const featured = blogPosts.find((p) => p.featured);
  const rest = blogPosts.filter((p) => !p.featured);

  const filtered = rest.filter((post) => {
    const matchCat = activeCategory === "all" || post.category === activeCategory;
    const matchSearch = post.title.toLowerCase().includes(search.toLowerCase()) || post.excerpt.toLowerCase().includes(search.toLowerCase());
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
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">The BLEND Journal</p>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-4">Coffee, craft, and stories.</h1>
          <p className="text-muted-foreground">Guides, origin stories, and honest writing about the world of specialty coffee.</p>
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
              <div className={`h-56 lg:h-auto bg-gradient-to-br ${gradients[0]} min-h-[200px] relative`}>
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <div className="w-32 h-32 rounded-full border-4 border-foreground" />
                </div>
              </div>
              <div className="p-8 lg:p-10 bg-card">
                <span className={`inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4 ${categoryColors[featured.category]}`}>
                  {categoryLabels[featured.category]}
                </span>
                <h2 className="font-serif text-2xl lg:text-3xl font-bold text-foreground mb-4 group-hover:text-accent transition-colors duration-200 leading-snug">
                  {featured.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-3">{featured.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{featured.date}</span>
                    <span>&middot;</span>
                    <Clock size={12} className="inline" />
                    <span>{featured.readTime}</span>
                  </div>
                  <span className="flex items-center gap-1 text-sm text-accent font-medium group-hover:gap-2 transition-all duration-200">
                    Read <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-sm">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              data-testid="input-blog-search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all"
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
                {cat === "all" ? "All" : categoryLabels[cat as BlogPost["category"]]}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.length === 0 ? (
            <div className="col-span-full text-center py-16 text-muted-foreground">
              No articles found matching your search.
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
                <div className={`h-44 bg-gradient-to-br ${gradients[i % gradients.length]} relative`}>
                  <div className="absolute inset-0 flex items-center justify-center opacity-8">
                    <div className="w-20 h-20 rounded-full border-2 border-foreground/20" />
                  </div>
                </div>
                <div className="p-6">
                  <span className={`inline-block text-xs font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full mb-3 ${categoryColors[post.category]}`}>
                    {categoryLabels[post.category]}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors duration-200 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{post.date}</span>
                    <span className="flex items-center gap-1">
                      <Clock size={11} />
                      {post.readTime}
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
