"use client";
import { useReveal } from "@/lib/useReveal";

const items = [
  "Top 10 at HackData Hackathon — built a medical web app for real-time hospital bed tracking",
  "Qualified Smart India Hackathon 2024 & 2025",
  "200+ DSA problems on LeetCode · HackerRank 3★ in Problem Solving",
  "Content & Technical Team Member — ACMW",
];

export default function Achievements() {
  const labelR = useReveal();
  const titleR = useReveal();

  return (
    <section id="achievements" className="py-28">
      <div className="max-w-6xl mx-auto px-8 md:px-12">
        <div ref={labelR.ref} style={labelR.style} className="section-label">
          Recognition
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
          Achievements
        </h2>

        <div>
          {items.map((item, i) => (
            <AchievementRow key={i} index={i + 1} text={item} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AchievementRow({ index, text, delay }: { index: number; text: string; delay: number }) {
  const { ref, style } = useReveal();

  return (
    <div
      ref={ref}
      style={{
        ...style,
        transitionDelay: `${delay}ms`,
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gap: "2rem",
        padding: "1.8rem 0",
        borderBottom: "1px solid var(--border)",
        cursor: "default",
        transition: (style.transition ?? "") + ", opacity 0.3s ease",
      }}
      className="group"
      onMouseEnter={(e) => {
        const title = e.currentTarget.querySelector<HTMLElement>(".ach-title");
        if (title) title.style.color = "var(--accent)";
      }}
      onMouseLeave={(e) => {
        const title = e.currentTarget.querySelector<HTMLElement>(".ach-title");
        if (title) title.style.color = "var(--text-primary)";
      }}
    >
      <div
        className="font-serif font-light italic text-[0.82rem]"
        style={{ color: "var(--text-muted)", minWidth: "2.5rem", paddingTop: "2px" }}
      >
        {String(index).padStart(2, "0")}
      </div>
      <div
        className="ach-title font-sans font-light text-[0.86rem] leading-relaxed tracking-[0.04em]"
        style={{ color: "var(--text-primary)", transition: "color 0.3s ease" }}
      >
        {text}
      </div>
    </div>
  );
}
