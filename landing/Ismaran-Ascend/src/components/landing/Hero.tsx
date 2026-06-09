import { motion } from "framer-motion";

export function Hero() {
  return (
    <section id="hero" className="relative flex min-h-screen items-center justify-center px-6 pt-24">
      <div className="absolute inset-0 star-bg pointer-events-none" />
      <div className="relative z-10 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-primary"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          AI PDF Study Assistant
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl"
        >
          Study Smarter.{" "}
          <span className="bg-gradient-to-r from-[oklch(0.82_0.2_230)] via-[oklch(0.7_0.22_270)] to-[oklch(0.65_0.25_295)] bg-clip-text text-transparent text-glow">
            Learn Faster.
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl"
        >
          Transform your PDFs and notes into interactive flashcards, targeted quizzes, and smart
          highlights with the power of AI. Accelerate your learning journey with Ismaran.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <button className="rounded-full btn-glow px-8 py-4 text-base transition hover:translate-y-[-2px]">
            Upload Your PDF
          </button>
          <button className="rounded-full border border-border glass px-8 py-4 text-base text-foreground transition hover:border-primary/60">
            Watch Demo
          </button>
        </motion.div>

        {/* Spacer below CTA where the horizontal sleeping pencil floats */}
        <div className="mt-24 h-32" aria-hidden />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="mt-6 text-xs uppercase tracking-widest text-muted-foreground"
        >
          Scroll to follow the pen ↓
        </motion.div>
      </div>
    </section>
  );
}
