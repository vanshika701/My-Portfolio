"use client";
import { useEffect, useRef } from "react";

interface Props {
  onComplete: () => void;
}

export default function Loader({ onComplete }: Props) {
  const barRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let pct = 0;
    const interval = setInterval(() => {
      pct += Math.random() * 20 + 10;
      if (pct >= 100) {
        pct = 100;
        clearInterval(interval);
        if (barRef.current) barRef.current.style.width = "100%";
        if (pctRef.current) pctRef.current.textContent = "100%";
        setTimeout(() => {
          if (rootRef.current) {
            rootRef.current.style.opacity = "0";
            rootRef.current.style.transition = "opacity 0.7s ease";
          }
          setTimeout(onComplete, 700);
        }, 300);
      } else {
        if (barRef.current) barRef.current.style.width = pct + "%";
        if (pctRef.current) pctRef.current.textContent = Math.floor(pct) + "%";
      }
    }, 55);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center gap-8"
      style={{ background: "var(--bg)" }}
    >
      <span
        className="font-sans font-extralight text-[0.65rem] tracking-[0.35em] uppercase animate-fade-in"
        style={{ color: "var(--text-muted)", animationDelay: "0.2s" }}
      >
        Loading Portfolio
      </span>
      <div
        className="relative overflow-hidden"
        style={{
          width: "min(320px, 80vw)",
          height: "1px",
          background: "var(--border)",
        }}
      >
        <div
          ref={barRef}
          className="absolute left-0 top-0 h-full w-0 transition-[width]"
          style={{
            background: "var(--accent)",
            transitionDuration: "0.05s",
            transitionTimingFunction: "linear",
          }}
        />
      </div>
      <span
        ref={pctRef}
        className="font-serif font-light text-[0.75rem] tracking-[0.2em]"
        style={{ color: "var(--text-muted)" }}
      >
        0%
      </span>
    </div>
  );
}
