import { createFileRoute } from "@tanstack/react-router";
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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ismaran — AI PDF Study Assistant" },
      { name: "description", content: "Upload any PDF and Ismaran's AI instantly generates smart flashcards, interactive quizzes, categorized highlights, and vocabulary breakdowns to accelerate your learning." },
      { property: "og:title", content: "Ismaran — Study Smarter. Learn Faster." },
      { property: "og:description", content: "Turn PDFs into flashcards, quizzes, highlights, and vocab tools with AI." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap" },
    ],
  }),
  component: Index,
});

function Index() {
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
