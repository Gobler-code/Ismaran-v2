import { motion, useTransform, type MotionValue } from "framer-motion";
import { Check, X } from "lucide-react";

interface Props { scrollYProgress: MotionValue<number>; }

export function Vocab({ scrollYProgress }: Props) {
  // Word selection glow matches pencil dip at ~0.88
  const wordGlow = useTransform(scrollYProgress, [0.84, 0.9], [0, 1]);
  const cardReveal = useTransform(scrollYProgress, [0.86, 0.92], [0, 1]);
  const cardY = useTransform(cardReveal, [0, 1], [20, 0]);

  return (
    <section id="vocab" className="relative flex min-h-screen items-center px-6 mb-20 md:mb-0">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:gap-20">
        <div className="md:pt-12">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-primary">04 — Vocab Tool</p>
          <h2 className="font-display text-4xl font-bold leading-tight md:text-5xl">
            Tap any word. <span className="text-glow text-primary">Master it.</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Ismaran breaks down difficult vocabulary from your PDFs with crisp definitions and
            side-by-side example sentences — correct usage versus common misuse — so the meaning
            sticks the first time.
          </p>
        </div>

        <div className="relative flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="glass w-full max-w-md rounded-2xl p-8 md:p-10"
          >
            <p className="mb-4 text-xs uppercase tracking-widest text-muted-foreground">
              Passage excerpt
            </p>
            <p className="font-display text-lg leading-relaxed text-muted-foreground">
              The phenomenon is best described as a{" "}
              <span className="relative inline-block">
                <motion.span
                  style={{
                    opacity: wordGlow,
                    boxShadow: useTransform(
                      wordGlow,
                      (v) => `0 0 ${v * 24}px oklch(0.82 0.2 230 / ${v * 0.8})`,
                    ),
                  }}
                  className="absolute inset-0 -z-0 rounded bg-primary/20"
                  aria-hidden
                />
                <span className="relative z-10 px-1 font-semibold text-foreground">
                  reconstructive
                </span>
              </span>{" "}
              act of cognition.
            </p>

            <motion.div
              style={{ opacity: cardReveal, y: cardY }}
              className="mt-6 space-y-3"
            >
              <div className="rounded-xl border border-primary/40 bg-primary/5 p-3">
                <p className="mb-1 text-[10px] uppercase tracking-widest text-primary">
                  Definition
                </p>
                <p className="text-sm text-foreground">
                  <span className="font-semibold">reconstructive</span> — built up from parts
                  rather than recalled whole.
                </p>
              </div>
              <div className="flex items-start gap-2 rounded-xl border border-[oklch(0.78_0.18_145)]/40 bg-[oklch(0.78_0.18_145)]/5 p-3">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[oklch(0.78_0.18_145)]" strokeWidth={3} />
                <p className="text-sm text-muted-foreground">
                  Memory is a <span className="text-foreground">reconstructive</span> process
                  shaped by context.
                </p>
              </div>
              <div className="flex items-start gap-2 rounded-xl border border-destructive/40 bg-destructive/5 p-3">
                <X className="mt-0.5 h-4 w-4 shrink-0 text-destructive" strokeWidth={3} />
                <p className="text-sm text-muted-foreground line-through decoration-destructive/60">
                  The builder used <span className="text-foreground">reconstructive</span>{" "}
                  bricks for the wall.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
