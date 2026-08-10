import { useEffect } from "react";
import Lenis from "lenis";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative w-full bg-background min-h-screen text-foreground overflow-hidden selection:bg-primary/30 selection:text-white">
      {/* Global Background Glow Elements */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[150px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-accent/20 blur-[150px] rounded-full pointer-events-none" />
      
      <Navbar />

      <main className="relative z-10 w-full flex flex-col items-center">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <Contact />
      </main>

      <BackToTop />
      <Footer />
    </div>
  );
}

export default App;
