import { useRef } from "react";
import { useScroll } from "framer-motion";
import { Hero } from "@/components/landing/Hero";
import { Pencil } from "@/components/landing/Pencil";
import { Flashcards } from "@/components/landing/Flashcards";
import { Quiz } from "@/components/landing/Quiz";
import { Highlighter } from "@/components/landing/Highlighter";
import { Vocab } from "@/components/landing/Vocab";
import { Footer } from "@/components/landing/Footer";
import { SignInButton } from "@/components/landing/SignInButton";
import { Logo } from "@/components/landing/Logo";

export default function App() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <div ref={ref} className="relative overflow-hidden">
      <Logo />
      <SignInButton />
      <Pencil scrollYProgress={scrollYProgress} />
      <Hero />
      <Flashcards scrollYProgress={scrollYProgress} />
      <Quiz scrollYProgress={scrollYProgress} />
      <Highlighter scrollYProgress={scrollYProgress} />
      <Vocab scrollYProgress={scrollYProgress} />
      <Footer />
    </div>
  );
}
