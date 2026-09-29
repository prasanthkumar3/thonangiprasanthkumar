import Header from "./components/Header";
import Hero from "./components/Hero";
import Work from "./components/Work";
import Skills from "./components/Skills";
import Background from "./components/Background";
import Credentials from "./components/Credentials";
import Contact from "./components/Contact";

export default function App() {
  return (
    <>
      <a className="skip" href="#work">
        Skip to selected work
      </a>
      <Header />
      <main>
        <Hero />
        <Work />
        <Skills />
        <Background />
        <Credentials />
      </main>
      <Contact />
    </>
  );
}
