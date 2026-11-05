import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Work } from "@/components/Work";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { Education } from "@/components/Education";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Work />
      <Experience />
      <Skills />
      <Education />
      <Contact />
    </>
  );
}
