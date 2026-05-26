export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  category: "guides" | "news" | "recipes" | "stories";
  date: string;
  readTime: string;
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Perfect Extraction: A Guide to Espresso",
    slug: "perfect-extraction-espresso-guide",
    excerpt: "Espresso is unforgiving. Get the grind wrong by two microns and you taste it. Here's everything we've learned in five years of obsessing over extraction.",
    category: "guides",
    date: "May 12, 2025",
    readTime: "8 min read",
    featured: true,
  },
  {
    id: 2,
    title: "Why Single-Origin Coffee Changes Everything",
    slug: "why-single-origin-matters",
    excerpt: "When you strip away the blend, you hear one voice clearly. Single-origin coffee is the difference between a painting and a collage — both beautiful, but one more intimate.",
    category: "stories",
    date: "April 28, 2025",
    readTime: "5 min read",
  },
  {
    id: 3,
    title: "Cold Brew vs. Iced Coffee: The Real Difference",
    slug: "cold-brew-vs-iced-coffee",
    excerpt: "One is brewed hot and chilled. The other never meets heat at all. The result? Two completely different experiences from the same bean.",
    category: "guides",
    date: "April 14, 2025",
    readTime: "4 min read",
  },
  {
    id: 4,
    title: "BLEND's Journey to Direct Trade",
    slug: "blend-journey-direct-trade",
    excerpt: "We visited the farms. We sat with the farmers. We learned that great coffee starts not in the roastery, but in the relationship between two people who care deeply about the same thing.",
    category: "stories",
    date: "March 30, 2025",
    readTime: "7 min read",
  },
  {
    id: 5,
    title: "Morning Ritual: Building Your Coffee Routine",
    slug: "morning-ritual-coffee-routine",
    excerpt: "The best morning routine isn't the most elaborate one. It's the one that makes you feel like yourself before the world starts asking things of you.",
    category: "recipes",
    date: "March 15, 2025",
    readTime: "6 min read",
  },
  {
    id: 6,
    title: "The Science of Milk Steaming",
    slug: "science-of-milk-steaming",
    excerpt: "Microfoam is not just foam — it's a texture, a temperature, a decision. Here's the physics of why your latte art either holds or falls apart.",
    category: "guides",
    date: "March 2, 2025",
    readTime: "5 min read",
  },
];

export const categoryLabels: Record<BlogPost["category"], string> = {
  guides: "Guides",
  news: "News",
  recipes: "Recipes",
  stories: "Stories",
};
