"use client";

import { motion, useReducedMotion } from "framer-motion";

interface SealMarkProps {
  size?: number;
  className?: string;
  /** Renders the assembled state immediately with no animation — for nav/footer use. */
  static?: boolean;
}

const SEGMENTS = 5;
const CENTER = 100;
const OUTER_R = 86;
const INNER_R = 54;
const GAP_DEG = 5;

function toRad(deg: number) {
  return (deg * Math.PI) / 180;
}

function point(radius: number, angleDeg: number) {
  const a = toRad(angleDeg);
  return [CENTER + radius * Math.cos(a), CENTER + radius * Math.sin(a)];
}

function segmentPath(startDeg: number, endDeg: number) {
  const [ox0, oy0] = point(OUTER_R, startDeg);
  const [ox1, oy1] = point(OUTER_R, endDeg);
  const [ix1, iy1] = point(INNER_R, endDeg);
  const [ix0, iy0] = point(INNER_R, startDeg);
  return `M ${ox0} ${oy0} A ${OUTER_R} ${OUTER_R} 0 0 1 ${ox1} ${oy1} L ${ix1} ${iy1} A ${INNER_R} ${INNER_R} 0 0 0 ${ix0} ${iy0} Z`;
}

const step = 360 / SEGMENTS;
const segments = Array.from({ length: SEGMENTS }, (_, i) => {
  const start = i * step - 90 + GAP_DEG / 2;
  const end = (i + 1) * step - 90 - GAP_DEG / 2;
  const mid = (start + end) / 2;
  return { d: segmentPath(start, end), mid };
});

export function SealMark({ size = 120, className, static: isStatic = false }: SealMarkProps) {
  const prefersReduced = useReducedMotion();
  const skipAnimation = isStatic || prefersReduced;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={className}
      role="img"
      aria-label="Continuum seal — five fragments forming one registry"
    >
      <circle cx={CENTER} cy={CENTER} r={INNER_R - 10} fill="none" stroke="currentColor" strokeOpacity={0.18} strokeWidth={1} />
      {segments.map((seg, i) => {
        const [dx, dy] = point(1, seg.mid);
        const offset = skipAnimation ? 0 : 16;
        return (
          <motion.path
            key={i}
            d={seg.d}
            fill={i % 2 === 0 ? "currentColor" : "currentColor"}
            fillOpacity={i % 2 === 0 ? 1 : 0.72}
            initial={skipAnimation ? false : { x: dx * offset, y: dy * offset, rotate: i % 2 === 0 ? -10 : 10, opacity: 0 }}
            animate={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
            transition={{
              duration: 0.9,
              delay: skipAnimation ? 0 : 0.15 + i * 0.09,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        );
      })}
      <circle cx={CENTER} cy={CENTER} r={4} fill="currentColor" />
    </svg>
  );
}
