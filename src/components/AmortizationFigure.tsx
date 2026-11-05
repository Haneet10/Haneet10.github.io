"use client";

import { useId, useMemo, useState } from "react";

const fmt = (v: number) => v.toLocaleString("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 });

/** The core calculation behind the model's loan scenarios: a standard amortization schedule. */
export function AmortizationFigure() {
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(6);
  const [years, setYears] = useState(5);
  const ids = { p: useId(), r: useId(), y: useId() };

  const s = useMemo(() => {
    const n = years * 12;
    const i = rate / 100 / 12;
    const pay = i === 0 ? principal / n : (principal * i) / (1 - (1 + i) ** -n);
    let bal = principal;
    let cumI = 0;
    const rows: { bal: number; int: number; prin: number }[] = [];
    for (let k = 0; k < n; k++) {
      const int = bal * i;
      const prin = pay - int;
      bal = Math.max(0, bal - prin);
      cumI += int;
      rows.push({ bal, int, prin });
    }
    return { pay, rows, total: cumI };
  }, [principal, rate, years]);

  // Chart: per-payment split (interest vs principal) as thin bars, balance as a line.
  const W = 640;
  const H = 200;
  const padL = 8;
  const padB = 22;
  const n = s.rows.length;
  const bw = (W - padL * 2) / n;
  const yPay = (v: number) => (H - padB) - (v / s.pay) * (H - padB - 70);
  const yBal = (v: number) => 12 + (1 - v / principal) * (H - padB - 12 - 4);
  const balPath = s.rows.map((r, k) => `${k ? "L" : "M"}${(padL + (k + 0.5) * bw).toFixed(1)} ${yBal(r.bal).toFixed(1)}`).join("");

  return (
    <div className="border border-line">
      <div className="flex items-center justify-between border-b border-line px-5 py-3">
        <p className="label flex items-center gap-3">
          <span className="text-accent">◆</span> Working model · amortization schedule
        </p>
        <p className="label hidden sm:block">Your numbers</p>
      </div>
      <div className="grid-paper bg-paper-2 px-2 pt-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full text-ink" role="img" aria-label={`Amortization chart: monthly payment ${fmt(s.pay)}, total interest ${fmt(s.total)}`}>
          {s.rows.map((r, k) => {
            const x = padL + k * bw;
            return (
              <g key={k}>
                <rect x={x + bw * 0.15} width={bw * 0.7} y={yPay(r.int + r.prin)} height={yPay(0) - yPay(r.int)} fill="var(--accent)" opacity="0.85" />
                <rect x={x + bw * 0.15} width={bw * 0.7} y={yPay(r.prin)} height={yPay(0) - yPay(r.prin)} fill="currentColor" opacity="0.18" />
              </g>
            );
          })}
          <path d={balPath} fill="none" stroke="currentColor" strokeWidth="1.4" />
          <line x1={padL} x2={W - padL} y1={H - padB} y2={H - padB} stroke="currentColor" strokeWidth="0.75" opacity="0.4" />
          <g className="fill-current font-mono text-[10px] text-muted">
            <text x={padL} y={H - 6}>Month 1</text>
            <text x={W - padL} y={H - 6} textAnchor="end">Month {n}</text>
            <text x={padL + 4} y={22}>Balance</text>
          </g>
        </svg>
      </div>
      <div className="flex flex-wrap gap-5 border-t border-line px-5 py-2.5 text-[12px] text-muted">
        <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 bg-accent" />Interest in each payment</span>
        <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 bg-ink/20" />Principal in each payment</span>
        <span className="flex items-center gap-2"><span className="h-px w-4 bg-ink" />Remaining balance</span>
      </div>
      <div className="grid gap-px border-t border-line bg-line sm:grid-cols-3">
        {[
          { id: ids.p, label: "Amount", val: fmt(principal), min: 1000, max: 50000, step: 500, v: principal, set: setPrincipal },
          { id: ids.r, label: "Annual rate", val: `${rate.toFixed(1)} %`, min: 0, max: 15, step: 0.5, v: rate, set: setRate },
          { id: ids.y, label: "Term", val: `${years} yr`, min: 1, max: 25, step: 1, v: years, set: setYears },
        ].map((c) => (
          <div key={c.label} className="bg-paper p-5">
            <label htmlFor={c.id} className="flex justify-between text-sm">
              <span>{c.label}</span>
              <span className="font-mono text-ink-2">{c.val}</span>
            </label>
            <input id={c.id} type="range" min={c.min} max={c.max} step={c.step} value={c.v} onChange={(e) => c.set(+e.target.value)} className="mt-3 w-full accent-[var(--accent)]" />
          </div>
        ))}
      </div>
      <dl className="grid grid-cols-3 gap-px border-t border-line bg-line">
        {[
          ["Monthly payment", fmt(s.pay)],
          ["Total interest", fmt(s.total)],
          ["Total paid", fmt(s.pay * n)],
        ].map(([k, v]) => (
          <div key={k} className="bg-paper px-5 py-3">
            <dt className="label !text-[10px]">{k}</dt>
            <dd className="mt-0.5 font-mono text-sm tabular-nums">{v}</dd>
          </div>
        ))}
      </dl>
      <p className="border-t border-line px-5 py-3 text-[13px] leading-relaxed text-muted">
        Payment = P·i / (1 − (1 + i)⁻ⁿ) with a monthly rate i over n payments. Early payments are mostly interest; that shift is what
        the model compares across repayment schedules. Example inputs only, not figures from the original model.
      </p>
    </div>
  );
}
