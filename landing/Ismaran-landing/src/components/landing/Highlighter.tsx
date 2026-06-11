import { motion, useTransform, type MotionValue } from "framer-motion";

interface Props { scrollYProgress: MotionValue<number>; }

const categories = [
  { label: "Important", color: "oklch(0.82 0.2 230)" },      // neon blue
  { label: "Less Important", color: "oklch(0.78 0.18 145)" }, // green
  { label: "Sure Question", color: "oklch(0.75 0.22 60)" },   // amber
];

export function Highlighter({ scrollYProgress }: Props) {
  // Sweep matches Pencil 0.66 → 0.74
  const width = useTransform(scrollYProgress, [0.66, 0.74], ["0%", "100%"]);

  return (
    <section id="highlight" className="relative flex min-h-screen items-center px-6 mb-20 md:mb-0">
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-primary">03 — Categorized Highlights</p>
        <h2 className="mb-8 font-display text-4xl font-bold leading-tight md:text-5xl">
          Mark what matters. <span className="text-glow text-primary">Color-coded by AI.</span>
        </h2>

        <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
          {categories.map((c) => (
            <div
              key={c.label}
              className="glass flex items-center gap-2 rounded-full px-4 py-1.5 text-xs uppercase tracking-widest"
            >
              <span className="h-2 w-2 rounded-full" style={{ background: c.color, boxShadow: `0 0 12px ${c.color}` }} />
              {c.label}
            </div>
          ))}
        </div>

        <motion.article
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="glass rounded-2xl p-8 text-left md:p-12"
        >
          <p className="font-display text-lg leading-relaxed text-muted-foreground md:text-xl">
            Memory is not a recording device, but a reconstructive act.{" "}
            <span className="relative inline-block">
              <motion.span
                style={{ width }}
                className="absolute inset-y-0 left-0 -z-0 rounded-md"
                aria-hidden
              >
                <span
                  className="block h-full w-full rounded-md"
                  style={{
                    background: "linear-gradient(90deg, oklch(0.82 0.2 230 / 0.5), oklch(0.78 0.18 145 / 0.5), oklch(0.75 0.22 60 / 0.5))",
                    boxShadow: "0 0 24px oklch(0.82 0.2 230 / 0.6), 0 0 48px oklch(0.65 0.25 295 / 0.3)",
                  }}
                />
              </motion.span>
              <span className="relative z-10 px-1 font-semibold text-foreground">
                Every recall reshapes the trace, strengthening what matters most
              </span>
            </span>
            {" "}— Ismaran auto-tags each highlight as Important, Less Important, or Sure Question
            so you always know what to revisit first.
          </p>
        </motion.article>
      </div>
    </section>
  );
}
