import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window === "undefined") return false;
    const seen = sessionStorage.getItem("blend-loaded");
    return !seen;
  });

  useEffect(() => {
    if (!isLoading) return;
    const timer = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem("blend-loaded", "1");
    }, 2200);
    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ backgroundColor: "hsl(20 18% 7%)" }}
        >
          <div className="flex flex-col items-center gap-8">
            {/* Steam animation */}
            <div className="relative h-10 w-16 flex items-end justify-center gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1 rounded-full"
                  style={{ backgroundColor: "hsl(38 82% 58% / 0.5)" }}
                  animate={{
                    height: ["8px", "28px", "8px"],
                    y: [0, -10, 0],
                    opacity: [0.2, 0.6, 0.2],
                  }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    delay: i * 0.25,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <p
                className="font-serif text-5xl font-bold tracking-[0.35em]"
                style={{ color: "hsl(38 82% 58%)" }}
              >
                BLEND
              </p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-xs tracking-[0.25em] mt-2 uppercase"
                style={{ color: "hsl(35 30% 88% / 0.35)" }}
              >
                Cairo&apos;s Specialty Coffee
              </motion.p>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              className="w-32 h-px overflow-hidden"
              style={{ backgroundColor: "hsl(38 82% 58% / 0.12)" }}
            >
              <motion.div
                className="h-full"
                style={{ backgroundColor: "hsl(38 82% 58%)" }}
                initial={{ scaleX: 0, transformOrigin: "left" }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
