"use client";
import { useEffect, useRef } from "react";

const FIRST = "Vanshika";
const LAST  = "Srivastava";

interface Rects { first: DOMRect; last: DOMRect }
interface Props  { onComplete: (rects: Rects) => void }

/* Font size for the ONE-LINE intro — smaller so both words fit */
const INTRO_SIZE = "clamp(2rem, 5.5vw, 5.2rem)";

export default function IntroOverlay({ onComplete }: Props) {
  const rootRef      = useRef<HTMLDivElement>(null);
  const firstWordRef = useRef<HTMLSpanElement>(null);
  const lastWordRef  = useRef<HTMLSpanElement>(null);
  const firstChars   = useRef<(HTMLSpanElement | null)[]>([]);
  const lastChars    = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const all = [...firstChars.current, ...lastChars.current];

    all.forEach((span, i) => {
      if (!span) return;
      setTimeout(() => {
        span.style.opacity   = "1";
        span.style.transform = "translateY(0)";
      }, 55 + i * 48);
    });

    const holdMs = 55 + all.length * 48 + 650;

    const t = setTimeout(() => {
      const first = firstWordRef.current?.getBoundingClientRect() ?? new DOMRect();
      const last  = lastWordRef.current?.getBoundingClientRect()  ?? new DOMRect();
      onComplete({ first, last });

      /* fade out the overlay */
      if (rootRef.current) {
        rootRef.current.style.transition = "opacity 0.4s ease";
        rootRef.current.style.opacity    = "0";
      }
      setTimeout(() => { if (rootRef.current) rootRef.current.style.display = "none"; }, 450);
    }, holdMs);

    return () => clearTimeout(t);
  }, [onComplete]);

  const charStyle = (italic: boolean): React.CSSProperties => ({
    display: "inline-block",
    fontFamily: "'Playfair Display', serif",
    fontWeight: italic ? 400 : 700,
    fontStyle:  italic ? "italic" : "normal",
    fontSize:   INTRO_SIZE,
    lineHeight: 1,
    letterSpacing: "0.01em",
    color: italic ? "var(--accent)" : "var(--text-primary)",
    opacity:   0,
    transform: "translateY(22px)",
    transition: "opacity 0.6s cubic-bezier(0.25,0.1,0.25,1), transform 0.6s cubic-bezier(0.25,0.1,0.25,1)",
  });

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
      style={{ background: "var(--bg)" }}
    >
      {/* ONE line: Vanshika·space·Srivastava */}
      <div style={{ display: "flex", alignItems: "baseline", gap: "0.35em" }}>

        {/* First word */}
        <span ref={firstWordRef} style={{ display: "inline-block" }}>
          {[...FIRST].map((ch, i) => (
            <span
              key={i}
              ref={(el) => { firstChars.current[i] = el; }}
              style={charStyle(false)}
            >{ch}</span>
          ))}
        </span>

        {/* Last word */}
        <span ref={lastWordRef} style={{ display: "inline-block" }}>
          {[...LAST].map((ch, i) => (
            <span
              key={i}
              ref={(el) => { lastChars.current[i] = el; }}
              style={charStyle(true)}
            >{ch}</span>
          ))}
        </span>

      </div>
    </div>
  );
}
