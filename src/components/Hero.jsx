import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]);
  const y2 = useTransform(scrollY, [0, 1000], [0, 150]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  // Typewriter effect state
  const [text, setText] = useState("");
  const fullText = "Full Stack Web Developer";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full h-screen flex flex-col items-center justify-center pt-20 overflow-hidden"
    >
      {/* Background Image Scaled to hide Watermark */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://www.shutterstock.com/image-vector/black-red-purple-silk-satin-260nw-2709704487.jpg')",
          transform: "scale(1.15)", // Scales up by 15% to push the watermark off-screen
        }}
      />

      {/* Dark overlay for text readability against the silk background */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      <motion.div
        style={{ y: y1, opacity }}
        className="z-10 flex flex-col items-center text-center px-4"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-4 inline-block glass px-4 py-2 rounded-full border border-primary/30"
        >
          <span className="text-sm md:text-base font-semibold text-primary">
            Available for new opportunities
          </span>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 relative"
        >
          Thonangi <br className="md:hidden" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent drop-shadow-[0_0_25px_rgba(255,0,127,0.5)]">
            Prasanth Kumar
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-lg md:text-2xl text-gray-400 font-mono h-8"
        >
          {text}
          <motion.span
            animate={{ opacity: [0, 1] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="inline-block w-[3px] h-6 bg-primary ml-1 align-middle"
          />
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#projects"
            className="group relative px-8 py-3 bg-primary text-white font-bold rounded-full overflow-hidden flex items-center gap-2 hover:scale-105 transition-transform"
          >
            <span className="relative z-10 flex items-center gap-2">
              View Work{" "}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform origin-bottom duration-300"></div>
          </a>
          <a
            href="#contact"
            className="px-8 py-3 glass hover:bg-white/10 text-white font-bold rounded-full transition-colors border border-white/10 hover:border-primary/50"
          >
            Contact Me
          </a>
        </motion.div>
      </motion.div>

      {/* Floating Particles/Elements */}
      <motion.div
        style={{ y: y2 }}
        className="absolute inset-0 pointer-events-none z-0"
      >
        <div className="absolute top-[20%] left-[15%] w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[30%] right-[10%] w-48 h-48 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-gray-500 uppercase tracking-widest">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="text-primary opacity-70" />
        </motion.div>
      </motion.div>
    </section>
  );
}
