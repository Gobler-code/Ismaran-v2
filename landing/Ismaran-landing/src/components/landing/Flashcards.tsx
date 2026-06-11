import { motion, useTransform, type MotionValue } from "framer-motion";

interface Props { scrollYProgress: MotionValue<number>; }

const lines = [
  "Definition: The Forgetting Curve",
  "Spaced repetition counters",
  "natural memory decay over time.",
];

export function Flashcards({ scrollYProgress }: Props) {
  // Reveal lines progressively as the pen writes across them (matches Pencil stops 0.22–0.38)
  const r1 = useTransform(scrollYProgress, [0.23, 0.27], [0, 1]);
  const r2 = useTransform(scrollYProgress, [0.29, 0.33], [0, 1]);
  const r3 = useTransform(scrollYProgress, [0.35, 0.39], [0, 1]);
  const reveals = [r1, r2, r3];

  return (
    <section id="flashcards" className="relative flex min-h-screen items-center px-6 mb-20 md:mb-0">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:gap-20">
        <div className="md:pt-12">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-primary">01 — Smart Flashcards</p>
          <h2 className="font-display text-4xl font-bold leading-tight md:text-5xl">
            From PDF to <span className="text-glow text-primary">flashcards in seconds</span>.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Upload any PDF — textbook, research paper, lecture notes — and Ismaran's AI extracts
            the key concepts and drafts adaptive flashcards that mirror your recall rhythm.
          </p>
        </div>

        <div className="relative flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: -3 }}
            whileInView={{ opacity: 1, y: 0, rotate: -3 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="glass relative w-full max-w-md rounded-2xl p-5 sm:p-8 md:p-10"
            style={{ minHeight: 320 }}
          >
            <div className="mb-6 flex items-center justify-between gap-2 text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground">
              <span>Card 04 / 12</span>
              <span className="text-primary truncate">Neuroscience.pdf</span>
            </div>
            <div className="space-y-4">
              {lines.map((line, i) => (
                <motion.div key={i} className="overflow-hidden">
                  <motion.p
                    style={{ width: useTransform(reveals[i], (v) => `${v * 100}%`) }}
                    className={`whitespace-nowrap overflow-hidden ${
                      i === 0 ? "font-display text-lg sm:text-2xl font-semibold text-glow" : "text-sm sm:text-base text-muted-foreground"
                    }`}
                  >
                    {line}
                  </motion.p>
                </motion.div>
              ))}
            </div>
            <div className="mt-8 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="h-1 w-1 rounded-full bg-primary animate-pulse" />
              AI generated from your PDF
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
