import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
        >
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl font-serif font-bold text-primary tracking-widest relative"
            >
              BLEND
              {/* Coffee steam animation */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-full flex justify-center gap-2 opacity-50">
                <motion.div 
                  animate={{ y: [-10, -30], opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
                  className="w-1 h-8 bg-primary/40 blur-sm rounded-full"
                />
                <motion.div 
                  animate={{ y: [-5, -25], opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, delay: 0.5, ease: "easeOut" }}
                  className="w-1 h-10 bg-primary/40 blur-sm rounded-full"
                />
                <motion.div 
                  animate={{ y: [-15, -35], opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 2.2, delay: 0.2, ease: "easeOut" }}
                  className="w-1 h-6 bg-primary/40 blur-sm rounded-full"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
