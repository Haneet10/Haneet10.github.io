"use client";

import { useId, useState } from "react";

/** Rise → run calculator for an accessibility ramp, with a true-scale elevation. */
export function RampCalculator() {
  const [rise, setRise] = useState(36); // inches
  const [n, setN] = useState(12); // slope 1:N
  const riseId = useId();
  const slopeId = useId();

  const runIn = rise * n;
  const runFt = runIn / 12;
  const runM = runIn * 0.0254;
  const angle = (Math.atan(1 / n) * 180) / Math.PI;
  const grade = 100 / n;
  const landings = Math.max(0, Math.ceil(runFt / 30) - 1);

  // Elevation geometry (true scale)
  const W = 640;
  const pad = 28;
  const scale = (W - pad * 2) / Math.max(runIn, 432);
  const x0 = pad;
  const yBase = 120;
  const x1 = x0 + runIn * scale;
  const y1 = yBase - rise * scale;

  return (
    <div className="border border-line">
      <div className="flex items-center justify-between border-b border-line px-5 py-3">
        <p className="label flex items-center gap-3">
          <span className="text-accent">◆</span> Working model · ramp length
        </p>
        <p className="label hidden sm:block">True scale</p>
      </div>

      <div className="grid-paper bg-paper-2 px-2 pt-4">
        <svg viewBox={`0 0 ${W} 150`} className="block h-auto w-full text-ink" role="img" aria-label={`Ramp elevation: ${rise} inch rise over ${runFt.toFixed(1)} feet of run`}>
          <defs>
            <marker id="rarr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M0 1.5 L9 5 L0 8.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
            </marker>
          </defs>
          <line x1={0} x2={W} y1={yBase} y2={yBase} stroke="currentColor" strokeWidth="0.75" opacity="0.35" />
          <path d={`M${x0} ${yBase} L${x1} ${y1} L${x1} ${yBase} Z`} fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.5" strokeLinejoin="round" style={{ transition: "d 0.3s" }} />
          {/* Door / deck */}
          <rect x={x1} y={y1} width={W - x1 - 6} height={yBase - y1} fill="currentColor" opacity="0.08" />
          <line x1={x1} x2={W - 6} y1={y1} y2={y1} stroke="currentColor" strokeWidth="1.2" />
          {/* Dimensions */}
          <g className="text-muted" stroke="currentColor" strokeWidth="0.75">
            <line x1={x0} x2={x1} y1={yBase + 16} y2={yBase + 16} markerStart="url(#rarr)" markerEnd="url(#rarr)" />
            <line x1={x1 + 8} x2={x1 + 8} y1={y1} y2={yBase} markerStart="url(#rarr)" markerEnd="url(#rarr)" />
          </g>
          <g className="fill-current font-mono text-[11px] text-ink-2">
            <text x={(x0 + x1) / 2} y={yBase + 30} textAnchor="middle">
              {runFt.toFixed(1)} ft run
            </text>
            <text x={Math.min(x1 + 14, W - 60)} y={y1 - 6}>
              {rise} in
            </text>
            <text x={x0 + 40} y={yBase - 6} className="fill-[var(--accent)]">
              {angle.toFixed(1)}°
            </text>
          </g>
        </svg>
      </div>

      <div className="grid gap-px bg-line sm:grid-cols-2">
        <div className="bg-paper p-5">
          <label htmlFor={riseId} className="flex justify-between text-sm">
            <span>Rise at the door</span>
            <span className="font-mono text-ink-2">{rise} in · {(rise * 25.4).toFixed(0)} mm</span>
          </label>
          <input id={riseId} type="range" min={6} max={60} step={1} value={rise} onChange={(e) => setRise(+e.target.value)} className="mt-3 w-full accent-[var(--accent)]" />
        </div>
        <div className="bg-paper p-5">
          <label htmlFor={slopeId} className="flex justify-between text-sm">
            <span>Slope</span>
            <span className="font-mono text-ink-2">1 : {n}{n === 12 ? " (max)" : ""}</span>
          </label>
          <input id={slopeId} type="range" min={12} max={20} step={1} value={n} onChange={(e) => setN(+e.target.value)} className="mt-3 w-full accent-[var(--accent)]" />
        </div>
      </div>

      <dl className="grid grid-cols-2 gap-px border-t border-line bg-line sm:grid-cols-4">
        {[
          ["Ramp length", `${runFt.toFixed(1)} ft`],
          ["Metric", `${runM.toFixed(2)} m`],
          ["Grade", `${grade.toFixed(1)} %`],
          ["Rest landings", landings ? `≈ ${landings}` : "None"],
        ].map(([k, v]) => (
          <div key={k} className="bg-paper px-5 py-3">
            <dt className="label !text-[10px]">{k}</dt>
            <dd className="mt-0.5 font-mono text-sm tabular-nums">{v}</dd>
          </div>
        ))}
      </dl>
      <p className="border-t border-line px-5 py-3 text-[13px] leading-relaxed text-muted">
        Length is rise × N for a 1:N slope. Long runs generally need a level rest landing about every 30 ft (9 m); local codes govern
        the exact requirements. This is a planning aid, not a substitute for them.
      </p>
    </div>
  );
}
