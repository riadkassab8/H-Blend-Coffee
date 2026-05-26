import { useLanguage } from "@/contexts/LanguageContext";
import { products, type Product } from "@/data/products";
import { blogPosts, type BlogPost } from "@/data/blogPosts";
import { productTranslations, blogTranslations, aboutTranslations } from "@/data/translations";

// Helper function to translate text
function translateText(text: string, translations: Record<string, string>, language: string): string {
  if (language === "en") return text;
  return translations[text] || text;
}

// Hook for translated products
export function useTranslatedProducts() {
  const { language } = useLanguage();
  
  if (language === "en") return products;
  
  return products.map((product) => ({
    ...product,
    name: translateText(product.name, productTranslations.ar, language),
    description: translateText(product.description, productTranslations.ar, language),
    badge: product.badge ? translateText(product.badge, productTranslations.ar, language) : undefined,
  }));
}

// Hook for translated blog posts
export function useTranslatedBlogPosts() {
  const { language } = useLanguage();
  
  if (language === "en") return blogPosts;
  
  return blogPosts.map((post) => ({
    ...post,
    title: translateText(post.title, blogTranslations.ar, language),
    excerpt: translateText(post.excerpt, blogTranslations.ar, language),
  }));
}

// Hook for translated about data
export function useTranslatedAboutData() {
  const { language } = useLanguage();
  
  const timeline = [
    { year: "2019", title: "Founded", description: "Two coffee-obsessed friends opened a single espresso bar in Maadi with a secondhand La Marzocco and a clear vision." },
    { year: "2020", title: "First Roastery", description: "We brought roasting in-house. More control meant better coffee — and the beginning of our house blend." },
    { year: "2022", title: "Three Branches", description: "Zamalek and Downtown joined Maadi. Each branch designed to feel distinct but unmistakably AROMA." },
    { year: "2024", title: "Digital Launch", description: "Taking AROMA beyond the café — beans to your door, reservations online, and a community built around craft." },
  ];
  
  const team = [
    { name: "Yasmine Adel", role: "Co-Founder & Head Roaster", bio: "Trained in Melbourne. Obsessed with Ethiopia." },
    { name: "Ahmed Saleh", role: "Co-Founder & Creative Director", bio: "Former architect. Now designs experiences, not buildings." },
    { name: "Nour Ibrahim", role: "Head Barista", bio: "SCA certified. Placed 2nd in Egyptian Barista Championship 2023." },
    { name: "Rania Khalil", role: "Operations Director", bio: "Keeps three branches running like one perfect shot." },
  ];
  
  const origins = [
    { country: "Ethiopia", region: "Yirgacheffe", notes: "Floral, bergamot, bright acidity" },
    { country: "Colombia", region: "Huila", notes: "Caramel, red fruit, silky body" },
    { country: "Brazil", region: "Cerrado", notes: "Chocolate, walnut, low acidity" },
    { country: "Guatemala", region: "Antigua", notes: "Spice, dark fruit, complex finish" },
  ];
  
  if (language === "en") {
    return { timeline, team, origins };
  }
  
  return {
    timeline: timeline.map((item) => ({
      ...item,
      title: translateText(item.title, aboutTranslations.ar, language),
      description: translateText(item.description, aboutTranslations.ar, language),
    })),
    team: team.map((member) => ({
      ...member,
      role: translateText(member.role, aboutTranslations.ar, language),
      bio: translateText(member.bio, aboutTranslations.ar, language),
    })),
    origins: origins.map((origin) => ({
      ...origin,
      notes: translateText(origin.notes, aboutTranslations.ar, language),
    })),
  };
}
