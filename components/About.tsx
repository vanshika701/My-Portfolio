"use client";
import { useReveal } from "@/lib/useReveal";

const details = [
  { label: "Degree",     value: "B.Tech Computer Science\nMinor in Management" },
  { label: "University", value: "Shiv Nadar University" },
  { label: "Duration",   value: "2023 – 2027" },
  { label: "CGPA",       value: "8.00 / 10" },
  { label: "Focus",      value: "Systems · AI · Security" },
];

export default function About() {
  const labelR  = useReveal();
  const textR   = useReveal();
  const detailR = useReveal();

  return (
    <section id="about" className="py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-8 md:px-12">

        {/* ── Top row: label + bio ──────────────────────── */}
        <div className="grid md:grid-cols-[1fr_1.5fr] gap-14 md:gap-24 items-start">
          <div>
            <div ref={labelR.ref} style={labelR.style} className="section-label">
              About
            </div>
            <p
              ref={textR.ref}
              style={{
                ...textR.style,
                transitionDelay: "100ms",
                fontFamily: "'Playfair Display', serif",
                fontWeight: 300,
                fontSize: "clamp(1.2rem, 2.2vw, 1.65rem)",
                lineHeight: 1.75,
                color: "var(--text-primary)",
              }}
            >
              CS undergrad passionate about building{" "}
              <em style={{ fontStyle: "italic", color: "var(--accent)" }}>intelligent systems</em>{" "}
              and secure software. Interned at DRDO where I analyzed 5,000+ network packets and
              improved vulnerability detection by 30%. I build across the stack — from React
              frontends to{" "}
              <em style={{ fontStyle: "italic", color: "var(--accent)" }}>RL-powered backends</em>{" "}
              — and love solving problems at the intersection of systems, AI, and real-world impact.
            </p>
          </div>

          <div
            ref={detailR.ref}
            style={{ ...detailR.style, transitionDelay: "200ms", paddingTop: "2.5rem" }}
          >
            {details.map((d) => (
              <div
                key={d.label}
                style={{ borderBottom: "1px solid var(--border)", display: "flex", gap: "1.5rem", padding: "1rem 0" }}
              >
                <span style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 400,
                  fontSize: "0.75rem",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  minWidth: "100px",
                  paddingTop: "2px",
                }}>
                  {d.label}
                </span>
                <span style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 400,
                  fontSize: "0.92rem",
                  letterSpacing: "0.04em",
                  lineHeight: 1.65,
                  color: "var(--text-primary)",
                  whiteSpace: "pre-line",
                }}>
                  {d.value}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
