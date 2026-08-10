import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-[100] p-4 rounded-full glass border border-primary/40 hover:border-primary text-white shadow-[0_0_15px_rgba(255,0,127,0.3)] hover:shadow-[0_0_25px_rgba(255,0,127,0.8)] hover:-translate-y-1 transition-all group"
          aria-label="Scroll back to top"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform text-primary group-hover:text-white" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
