"use client";
import { useRef, useState } from "react";
import { useReveal } from "@/lib/useReveal";
import CardPopup from "./CardPopup";

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
}

const experiences: ExperienceItem[] = [
  {
    company: "DRDO",
    role: "Security Research Intern",
    period: "May 2025 – July 2025",
    location: "Dehradun, India",
    bullets: [
      "Analyzed 5,000+ network packets using Wireshark & Burp Suite; identified 10+ OWASP Top 10 vulnerabilities, improving detection accuracy by 30%.",
      "Performed automated penetration testing using Kali Linux tools (Nmap, Gobuster, Metasploit); improved vulnerability coverage by 40%.",
    ],
  },
  {
    company: "Buddy4Travel",
    role: "Software Testing Intern",
    period: "April 2026 – May 2026",
    location: "Remote",
    bullets: [
      "Conducted manual and volume/load testing for iOS and Android applications.",
      "Prepared and submitted daily testing reports.",
      "Re-tested features after fixes to ensure issues were resolved properly.",
      "Identified and reported 40+ bugs and software errors.",
      "Helped improve application stability, usability, and performance.",
    ],
  },
];

export default function Experience() {
  const labelR = useReveal();
  const titleR = useReveal();

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

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.company} exp={exp} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({ exp, delay }: { exp: ExperienceItem; delay: number }) {
  const { ref, style } = useReveal();
  const [popupOpen, setPopupOpen] = useState(false);
  const clickOpenedRef = useRef(false);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startHover = () => {
    hoverTimer.current = setTimeout(() => {
      if (!clickOpenedRef.current) setPopupOpen(true);
    }, 2500);
  };

  const clearHover = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
  };

  const handleClick = () => {
    clearHover();
    const next = !clickOpenedRef.current;
    clickOpenedRef.current = next;
    setPopupOpen(next);
  };

  const handleClose = () => {
    clickOpenedRef.current = false;
    setPopupOpen(false);
  };

  return (
    <div
      ref={ref}
      onClick={handleClick}
      style={{
        ...style,
        transitionDelay: `${delay}ms`,
        border: "1px solid var(--border)",
        padding: "3rem",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        transition: (style.transition ?? "") + ", border-color 0.4s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = "var(--accent-light)";
        const bar = el.querySelector<HTMLElement>(".exp-bar");
        if (bar) bar.style.transform = "scaleY(1)";
        startHover();
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = "var(--border)";
        const bar = el.querySelector<HTMLElement>(".exp-bar");
        if (bar) bar.style.transform = "scaleY(0)";
        clearHover();
        if (!clickOpenedRef.current) setPopupOpen(false);
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
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 400,
            fontSize: "2rem",
            color: "var(--text-primary)",
          }}>
            {exp.company}
          </div>
          <div style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 400,
            fontSize: "0.82rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginTop: "0.3rem",
          }}>
            {exp.role}
          </div>
        </div>
        <div className="text-left sm:text-right">
          <div style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 300,
            fontSize: "0.82rem",
            letterSpacing: "0.14em",
            color: "var(--text-muted)",
          }}>
            {exp.period}
          </div>
          <div style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 300,
            fontSize: "0.78rem",
            letterSpacing: "0.12em",
            color: "var(--text-muted)",
            marginTop: "0.25rem",
          }}>
            {exp.location}
          </div>
        </div>
      </div>

      <ul style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {exp.bullets.map((b, i) => (
          <li
            key={i}
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 300,
              fontSize: "0.95rem",
              lineHeight: 1.75,
              color: "var(--text-secondary)",
              paddingLeft: "1.25rem",
              position: "relative",
            }}
          >
            <span style={{ position: "absolute", left: 0, top: 0, color: "var(--accent-light)" }}>—</span>
            {b}
          </li>
        ))}
      </ul>

      {/* Click hint */}
      <div style={{
        marginTop: "1.8rem",
        fontFamily: "var(--font-sans)",
        fontSize: "0.65rem",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: "var(--text-muted)",
        opacity: 0.55,
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
      }}>
        <span style={{ width: "16px", height: "1px", background: "var(--accent-light)", display: "inline-block" }} />
        click to expand
      </div>

      <CardPopup
        open={popupOpen}
        onClose={handleClose}
        title={exp.company}
        subtitle={exp.role}
      />
    </div>
  );
}
