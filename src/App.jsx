import Header from "./components/Header";
import Hero from "./components/Hero";
import Work from "./components/Work";
import Stack from "./components/Stack";
import Creative from "./components/Creative";
import Journey from "./components/Journey";
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
        <Stack />
        <Creative />
        <Journey />
        <Credentials />
      </main>
      <Contact />
    </>
  );
}
