import { Link } from "wouter";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-6 py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-md"
        >
          <p className="font-serif text-8xl font-bold text-accent/20 mb-2">404</p>
          <h1 className="font-serif text-3xl font-bold text-foreground mb-4">
            This cup is empty.
          </h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            The page you&apos;re looking for has moved, been removed, or never existed.
            Let&apos;s get you back to something worth tasting.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/"
              className="px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-full hover:bg-accent/90 transition-all duration-200"
            >
              Back to Home
            </Link>
            <Link
              href="/menu"
              className="px-6 py-3 border border-border text-foreground font-medium rounded-full hover:border-foreground/30 transition-all duration-200"
            >
              View Menu
            </Link>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
