import { motion, useTransform, type MotionValue } from "framer-motion";
import { Check } from "lucide-react";

interface Props { scrollYProgress: MotionValue<number>; }

const options = [
  { label: "Encoding, storage, retrieval", correct: true },
  { label: "Read, repeat, recite", correct: false },
  { label: "Input, process, output", correct: false },
  { label: "Sense, store, share", correct: false },
];

export function Quiz({ scrollYProgress }: Props) {
  // Tick the box exactly when the pen reaches the correct option
  const checkScale = useTransform(scrollYProgress, [0.49, 0.52], [0, 1]);
  const splash = useTransform(scrollYProgress, [0.49, 0.55], [0, 1]);
  const splashOpacity = useTransform(splash, [0, 0.5, 1], [0, 0.8, 0]);
  const splashScale = useTransform(splash, [0, 1], [1, 3]);

  return (
    <section id="quiz" className="relative flex min-h-screen items-center px-6 mb-20 md:mb-0">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:gap-20">
        <div className="order-2 md:order-1 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="glass w-full max-w-md rounded-2xl p-8 md:p-10"
          >
            <p className="mb-2 text-xs uppercase tracking-widest text-primary">Question 3 of 10</p>
            <h3 className="mb-6 font-display text-xl font-semibold">
              What are the three core stages of memory?
            </h3>
            <div className="space-y-3">
              {options.map((opt, i) => (
                <div
                  key={i}
                  className={`relative flex items-center gap-3 rounded-xl border px-4 py-3 transition ${
                    opt.correct ? "border-primary/50" : "border-border"
                  }`}
                >
                  <div className="relative h-5 w-5 shrink-0 rounded-md border border-border bg-background/40">
                    {opt.correct && (
                      <>
                        <motion.div
                          style={{ scale: checkScale }}
                          className="absolute inset-0 flex items-center justify-center rounded-md bg-gradient-to-br from-[oklch(0.82_0.2_230)] to-[oklch(0.65_0.25_295)]"
                        >
                          <Check className="h-3.5 w-3.5 text-[oklch(0.1_0.02_265)]" strokeWidth={4} />
                        </motion.div>
                        <motion.div
                          style={{ opacity: splashOpacity, scale: splashScale }}
                          className="absolute inset-0 rounded-md bg-primary blur-md"
                        />
                      </>
                    )}
                  </div>
                  <span className="text-sm">{opt.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="order-1 md:order-2 md:pt-12">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-primary">02 — Interactive Quizzes</p>
          <h2 className="font-display text-4xl font-bold leading-tight md:text-5xl">
            Test recall. <span className="text-glow text-primary">Lock it in.</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Ismaran builds targeted quizzes from your uploaded PDFs, surfacing the questions you're
            most likely to miss. Every correct tap rewards your brain with a satisfying spark.
          </p>
        </div>
      </div>
    </section>
  );
}
