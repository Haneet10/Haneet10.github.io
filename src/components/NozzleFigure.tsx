"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

/* ─────────────────────────────────────────────────────────────
   FIG. 1: Converging–diverging nozzle, half section.
   Move across the drawing to probe ideal isentropic flow (γ = 1.4):
   the local area ratio sets the Mach number, which sets pressure
   and temperature. All values are computed live, nothing is canned.
   ───────────────────────────────────────────────────────────── */

const G = 1.4;
const XT = 0.3; // throat position, fraction of length
const R_IN = 1.6;
const R_T = 0.6;
const R_E = 1.35;

function radius(x: number) {
  if (x <= XT) {
    const u = x / XT;
    return R_T + (R_IN - R_T) * (1 + Math.cos(Math.PI * u)) / 2;
  }
  const u = (x - XT) / (1 - XT);
  const blend = 1 - Math.exp(-((u / 0.09) ** 2)); // rounds the throat
  return R_T + (R_E - R_T) * (1 - (1 - u) ** 3) * blend;
}

const areaRatioOf = (M: number) =>
  (1 / M) * ((2 / (G + 1)) * (1 + ((G - 1) / 2) * M * M)) ** ((G + 1) / (2 * (G - 1)));

/** Solve A/A* = ratio for Mach on the subsonic or supersonic branch. */
function machFromArea(ratio: number, supersonic: boolean) {
  if (ratio <= 1.0000001) return 1;
  let lo = supersonic ? 1 : 1e-4;
  let hi = supersonic ? 12 : 1;
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    const f = areaRatioOf(mid) - ratio;
    // A/A* decreases with M below 1, increases above 1.
    if ((f > 0) === supersonic) hi = mid;
    else lo = mid;
  }
  return (lo + hi) / 2;
}

function flowAt(x: number) {
  const r = radius(x);
  const ar = (r / R_T) ** 2;
  const M = machFromArea(ar, x > XT);
  const k = 1 + ((G - 1) / 2) * M * M;
  return { r, ar, M, p: k ** (-G / (G - 1)), T: 1 / k };
}

// Drawing geometry (SVG units)
const W = 800;
const X0 = 70;
const X1 = 730;
const AXIS = 196;
const S = 78; // px per radius unit
const WALL = 15;
const STRIP_TOP = 360;
const STRIP_H = 70;
const M_MAX = 3.4;

const px = (x: number) => X0 + x * (X1 - X0);
const mY = (M: number) => STRIP_TOP + STRIP_H - (M / M_MAX) * STRIP_H;

export function NozzleFigure() {
  const reduce = useReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);
  const [x, setX] = useState(0.62);
  const hovering = useRef(false);

  const geo = useMemo(() => {
    const N = 140;
    const xs = Array.from({ length: N + 1 }, (_, i) => i / N);
    const inner = xs.map((t) => [px(t), AXIS - radius(t) * S] as const);
    const outer = xs.map((t) => [px(t), AXIS - radius(t) * S - WALL] as const);
    const lower = xs.map((t) => [px(t), AXIS + radius(t) * S] as const);
    const toPath = (pts: readonly (readonly [number, number])[]) => pts.map(([a, b], i) => `${i ? "L" : "M"}${a.toFixed(1)} ${b.toFixed(1)}`).join("");
    const section = `${toPath(inner)}L${outer[N][0]} ${outer[N][1]}${outer
      .slice()
      .reverse()
      .map(([a, b]) => `L${a.toFixed(1)} ${b.toFixed(1)}`)
      .join("")}Z`;
    const mach = xs.map((t) => [px(t), mY(flowAt(t).M)] as const);
    const exit = flowAt(1);
    return { inner: toPath(inner), outer: toPath(outer), lower: toPath(lower), section, mach: toPath(mach), exit };
  }, []);

  // Idle sweep so the figure is alive even without a pointer (skipped for reduced motion).
  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    let t0: number | null = null;
    const tick = (t: number) => {
      if (t0 === null) t0 = t;
      if (!hovering.current) {
        const phase = ((t - t0) / 9000) % 1;
        const tri = phase < 0.5 ? phase * 2 : 2 - phase * 2;
        const eased = tri * tri * (3 - 2 * tri);
        setX(0.04 + eased * 0.92);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const sx = ((e.clientX - rect.left) / rect.width) * W;
    hovering.current = true;
    setX(Math.min(1, Math.max(0, (sx - X0) / (X1 - X0))));
  };

  const f = flowAt(x);
  const cx = px(x);
  const regime = Math.abs(x - XT) < 0.012 ? "Sonic" : x < XT ? "Subsonic" : "Supersonic";

  const draw = (delay: number, duration = 1.6) => ({
    initial: reduce ? false : { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: { pathLength: { delay, duration, ease: [0.65, 0, 0.35, 1] as const }, opacity: { delay, duration: 0.2 } },
  });

  return (
    <figure className="relative">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} 460`}
        className="block h-auto w-full touch-pan-y select-none text-ink"
        onPointerMove={onMove}
        onPointerDown={onMove}
        onPointerLeave={() => (hovering.current = false)}
        role="img"
        aria-label={`Half-section drawing of a converging–diverging rocket nozzle. Exit area ratio ${geo.exit.ar.toFixed(2)}, exit Mach ${geo.exit.M.toFixed(2)} for ideal isentropic flow.`}
      >
        <defs>
          <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="6" stroke="currentColor" strokeWidth="0.8" opacity="0.55" />
          </pattern>
          <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 1.5 L9 5 L0 8.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
          </marker>
        </defs>

        {/* Centre line */}
        <motion.line x1={X0 - 30} x2={X1 + 30} y1={AXIS} y2={AXIS} stroke="currentColor" strokeWidth="0.75" strokeDasharray="18 4 3 4" opacity="0.45" {...draw(0.1, 1.2)} />
        <text x={X0 - 34} y={AXIS + 4} textAnchor="end" className="fill-current font-mono text-[11px]" opacity="0.5">℄</text>

        {/* Section (upper half, hatched) */}
        <motion.path d={geo.section} fill="url(#hatch)" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3, duration: 0.8 }} />
        <motion.path d={geo.inner} fill="none" stroke="currentColor" strokeWidth="1.6" {...draw(0.25)} />
        <motion.path d={geo.outer} fill="none" stroke="currentColor" strokeWidth="1.6" {...draw(0.35)} />
        {/* Lower half, outline only */}
        <motion.path d={geo.lower} fill="none" stroke="currentColor" strokeWidth="1.1" opacity="0.7" {...draw(0.45)} />
        <motion.line x1={X0} x2={X0} y1={AXIS - R_IN * S - WALL} y2={AXIS + R_IN * S} stroke="currentColor" strokeWidth="1.1" opacity="0.7" {...draw(0.9, 0.6)} />
        <motion.line x1={X1} x2={X1} y1={AXIS - R_E * S - WALL} y2={AXIS + R_E * S} stroke="currentColor" strokeWidth="1.1" opacity="0.7" {...draw(1.0, 0.6)} />

        {/* Dimensions */}
        <motion.g className="text-muted" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 0.8 }}>
          <g stroke="currentColor" strokeWidth="0.75">
            {/* Overall length */}
            <line x1={X0} x2={X0} y1={AXIS - R_IN * S - WALL - 6} y2={AXIS - R_IN * S - WALL - 40} />
            <line x1={X1} x2={X1} y1={AXIS - R_E * S - WALL - 6} y2={AXIS - R_IN * S - WALL - 40} />
            <line x1={X0} x2={X1} y1={AXIS - R_IN * S - WALL - 32} y2={AXIS - R_IN * S - WALL - 32} markerStart="url(#arr)" markerEnd="url(#arr)" />
            {/* Throat diameter */}
            <line x1={px(XT)} x2={px(XT)} y1={AXIS - R_T * S + 2} y2={AXIS + R_T * S - 2} markerStart="url(#arr)" markerEnd="url(#arr)" />
            {/* Exit diameter */}
            <line x1={X1 + 18} x2={X1 + 18} y1={AXIS - R_E * S} y2={AXIS + R_E * S} markerStart="url(#arr)" markerEnd="url(#arr)" />
            <line x1={X1 + 4} x2={X1 + 24} y1={AXIS - R_E * S} y2={AXIS - R_E * S} />
            <line x1={X1 + 4} x2={X1 + 24} y1={AXIS + R_E * S} y2={AXIS + R_E * S} />
          </g>
          <g className="fill-current font-mono text-[11px]">
            <rect x={(X0 + X1) / 2 - 16} y={AXIS - R_IN * S - WALL - 39} width="32" height="14" className="fill-[var(--paper)]" />
            <text x={(X0 + X1) / 2} y={AXIS - R_IN * S - WALL - 28} textAnchor="middle">L</text>
            <text x={px(XT) + 8} y={AXIS + 32}>Ø D*</text>
            <text x={X1 + 28} y={AXIS + 4}>Ø Dₑ</text>
            <text x={px(XT) - 4} y={AXIS + R_T * S + 54} textAnchor="middle" className="text-[10px]">THROAT</text>
          </g>
        </motion.g>

        {/* Probe: section line */}
        <g>
          <line x1={cx} x2={cx} y1={AXIS - f.r * S - WALL - 10} y2={STRIP_TOP + STRIP_H} stroke="var(--accent)" strokeWidth="1" strokeDasharray="3 3" />
          <line x1={cx} x2={cx} y1={AXIS - f.r * S} y2={AXIS + f.r * S} stroke="var(--accent)" strokeWidth="1.6" />
          <circle cx={cx} cy={AXIS - f.r * S} r="3" fill="var(--paper)" stroke="var(--accent)" strokeWidth="1.4" />
          <circle cx={cx} cy={AXIS + f.r * S} r="3" fill="var(--paper)" stroke="var(--accent)" strokeWidth="1.4" />
        </g>

        {/* Mach number strip */}
        <motion.g initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 0.6 }}>
          <line x1={X0} x2={X1} y1={STRIP_TOP + STRIP_H} y2={STRIP_TOP + STRIP_H} stroke="currentColor" strokeWidth="0.75" opacity="0.4" />
          <line x1={X0} x2={X1} y1={mY(1)} y2={mY(1)} stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 4" opacity="0.4" />
          <text x={X0 - 10} y={mY(1) + 3.5} textAnchor="end" className="fill-current font-mono text-[10px]" opacity="0.55">M=1</text>
          <text x={X0 - 10} y={STRIP_TOP + 4} textAnchor="end" className="fill-current font-mono text-[10px]" opacity="0.55">M</text>
        </motion.g>
        <motion.path d={geo.mach} fill="none" stroke="var(--accent)" strokeWidth="1.5" {...draw(1.2, 1.8)} />
        <circle cx={cx} cy={mY(f.M)} r="3.5" fill="var(--accent)" />
      </svg>

      {/* Live readout */}
      <figcaption className="mt-4 grid grid-cols-3 border-y border-line sm:grid-cols-6" aria-live="off">
        {[
          ["x / L", x.toFixed(2)],
          ["A / A*", f.ar.toFixed(2)],
          ["Mach", f.M.toFixed(2)],
          ["p / p₀", f.p.toFixed(3)],
          ["T / T₀", f.T.toFixed(3)],
          ["Regime", regime],
        ].map(([k, v], i) => (
          <div key={k} className={`px-3 py-2.5 ${i % 3 ? "border-l border-line" : ""} ${i >= 3 ? "border-t border-line sm:border-t-0" : ""} ${i === 3 ? "sm:border-l" : ""}`}>
            <div className="label !text-[10px]">{k}</div>
            <div className={`mt-0.5 font-mono text-sm tabular-nums ${k === "Mach" ? "text-accent" : "text-ink"}`}>{v}</div>
          </div>
        ))}
      </figcaption>
      <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-faint">
        Fig. 1 · C–D nozzle study · ideal isentropic flow, <span className="normal-case">γ</span> = 1.4 · <span className="hidden sm:inline">move across the drawing to probe</span>
        <span className="sm:hidden">drag across the drawing to probe</span>
      </p>
    </figure>
  );
}
