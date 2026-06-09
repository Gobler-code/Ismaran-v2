import { motion, useTransform, useMotionValueEvent, type MotionValue } from "framer-motion";
import { useState } from "react";
import penAsset from "@/assets/pen.jpg";
import { useIsMobile } from "@/hooks/use-mobile";


interface PencilProps {
  scrollYProgress: MotionValue<number>;
}

// Rotation: 0deg = vertical tip-down. 90deg = flat horizontal tip-right. 45deg = writing tilt.
// `yDesktop` is used on >=md screens; `yMobile` is used on phones where the
// hero CTAs stack vertically and push the "scroll" hint further down.
const stops = [
  { p: 0.00, x: 0,   yDesktop: 70, yMobile: 82, r: 90,  s: 1.0 },
  { p: 0.13, x: 0,   yDesktop: 70, yMobile: 82, r: 90,  s: 1.0 },
  { p: 0.20, x: 14,  yDesktop: 22, yMobile: 22, r: 45,  s: 0.95 },
  { p: 0.26, x: 18,  yDesktop: 28, yMobile: 28, r: 45,  s: 0.95 },
  { p: 0.32, x: 18,  yDesktop: 34, yMobile: 34, r: 45,  s: 0.95 },
  { p: 0.38, x: 18,  yDesktop: 40, yMobile: 40, r: 45,  s: 0.95 },
  { p: 0.46, x: -22, yDesktop: 24, yMobile: 24, r: 55,  s: 0.95 },
  { p: 0.50, x: -22, yDesktop: 28, yMobile: 28, r: 55,  s: 0.95 },
  { p: 0.52, x: -22, yDesktop: 32, yMobile: 32, r: 55,  s: 0.95 },
  { p: 0.57, x: -22, yDesktop: 30, yMobile: 30, r: 55,  s: 0.95 },
  { p: 0.66, x: -28, yDesktop: 38, yMobile: 38, r: -10, s: 0.95 },
  { p: 0.74, x: 28,  yDesktop: 38, yMobile: 38, r: -10, s: 0.95 },
  { p: 0.82, x: 15,  yDesktop: 30, yMobile: 30, r: 40,  s: 0.95 },
  { p: 0.88, x: 15,  yDesktop: 36, yMobile: 36, r: 50,  s: 0.95 },
  { p: 0.93, x: 0,   yDesktop: 50, yMobile: 50, r: 90,  s: 0.85 },
  { p: 1.00, x: 0,   yDesktop: 60, yMobile: 60, r: 90,  s: 0.6 },
];

// Flashcard writing range — zig-zag only here (matches reveal timings in Flashcards.tsx)
const ZIG_START = 0.22;
const ZIG_END = 0.38;

export function Pencil({ scrollYProgress }: PencilProps) {
  const isMobile = useIsMobile();
  const ps = stops.map((s) => s.p);
  const x = useTransform(scrollYProgress, ps, stops.map((s) => `${s.x}vw`));
  const y = useTransform(
    scrollYProgress,
    ps,
    stops.map((s) => `${isMobile ? s.yMobile : s.yDesktop}vh`),
  );

  const rotate = useTransform(scrollYProgress, ps, stops.map((s) => s.r));
  const scale = useTransform(scrollYProgress, ps, stops.map((s) => s.s));
  const opacity = useTransform(scrollYProgress, [0.9, 0.96, 1], [1, 0.3, 0]);

  const [writing, setWriting] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = v >= ZIG_START && v <= ZIG_END;
    setWriting((prev) => (prev === next ? prev : next));
  });

  return (
    <motion.div
      style={{ x, y, rotate, scale, opacity }}
      className="pointer-events-none fixed left-1/2 top-0 z-40 -ml-[90px] h-[180px] w-[180px] md:-ml-[120px] md:h-[240px] md:w-[240px]"
    >
      {/* Slow, gentle idle float — never causes rotation */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="h-full w-full"
      >
        {/* Zig-zag writing motion — ONLY active in flashcard section */}
        <motion.div
          animate={
            writing
              ? { x: [0, 2, -2, 1.5, -1.5, 0], y: [0, -1.5, 1.5, -1, 1, 0] }
              : { x: 0, y: 0 }
          }
          transition={
            writing
              ? { duration: 0.35, repeat: Infinity, ease: "linear" }
              : { duration: 0.3, ease: "easeOut" }
          }
          className="h-full w-full"
          style={{
            filter:
              "drop-shadow(0 0 24px oklch(0.82 0.2 230 / 0.55)) drop-shadow(0 18px 36px oklch(0 0 0 / 0.5))",
          }}
        >
          {/* Pre-rotate source -45° so the diagonal pen becomes vertical tip-down,
              preserving the existing rotation semantics in `stops`. */}
          <img
            src={penAsset}
            alt=""
            className="h-full w-full object-contain"
            style={{ transform: "rotate(-45deg)" }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
