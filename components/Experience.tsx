"use client";
import { useReveal } from "@/lib/useReveal";

const bullets = [
  "Analyzed 5,000+ network packets using Wireshark & Burp Suite; identified 10+ OWASP Top 10 vulnerabilities, improving detection accuracy by 30%.",
  "Performed automated penetration testing using Kali Linux tools (Nmap, Gobuster, Metasploit); improved vulnerability coverage by 40%.",
];

export default function Experience() {
  const labelR = useReveal();
  const titleR = useReveal();
  const cardR  = useReveal();

  return (
    <section id="experience" className="py-28">
      <div className="max-w-6xl mx-auto px-8 md:px-12">
        <div ref={labelR.ref} style={labelR.style} className="section-label">
          Experience
        </div>
        <h2
          ref={titleR.ref}
          style={{
            ...titleR.style,
            transitionDelay: "100ms",
            fontFamily: "'Playfair Display', serif",
            fontWeight: 400,
            fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)",
            lineHeight: 1.1,
            color: "var(--text-primary)",
            marginBottom: "3rem",
          }}
        >
          Where I've Worked
        </h2>

        <div
          ref={cardR.ref}
          style={{
            ...cardR.style,
            transitionDelay: "200ms",
            border: "1px solid var(--border)",
            padding: "3rem",
            position: "relative",
            overflow: "hidden",
            transition: (cardR.style.transition ?? "") + ", border-color 0.4s ease",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.borderColor = "var(--accent-light)";
            const bar = el.querySelector<HTMLElement>(".exp-bar");
            if (bar) bar.style.transform = "scaleY(1)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.borderColor = "var(--border)";
            const bar = el.querySelector<HTMLElement>(".exp-bar");
            if (bar) bar.style.transform = "scaleY(0)";
          }}
        >
          {/* Accent bar */}
          <div
            className="exp-bar absolute left-0 top-0 bottom-0"
            style={{
              width: "3px",
              background: "var(--accent)",
              transform: "scaleY(0)",
              transformOrigin: "top",
              transition: "transform 0.5s cubic-bezier(0.25,0.1,0.25,1)",
            }}
          />

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-8">
            <div>
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 400,
                  fontSize: "2rem",
                  color: "var(--text-primary)",
                }}
              >
                DRDO
              </div>
              <div
                className="font-sans font-extralight text-[0.7rem] tracking-[0.2em] uppercase mt-1"
                style={{ color: "var(--accent)" }}
              >
                Security Research Intern
              </div>
            </div>
            <div className="text-left sm:text-right">
              <div
                className="font-sans font-extralight text-[0.7rem] tracking-[0.14em]"
                style={{ color: "var(--text-muted)" }}
              >
                May 2025 – July 2025
              </div>
              <div
                className="font-sans font-extralight text-[0.68rem] tracking-[0.12em] mt-1"
                style={{ color: "var(--text-muted)" }}
              >
                Dehradun, India
              </div>
            </div>
          </div>

          <ul className="flex flex-col gap-4">
            {bullets.map((b, i) => (
              <li
                key={i}
                className="font-sans font-light text-[0.83rem] leading-relaxed pl-5 relative"
                style={{ color: "var(--text-secondary)" }}
              >
                <span className="absolute left-0 top-0" style={{ color: "var(--accent-light)" }}>
                  —
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
