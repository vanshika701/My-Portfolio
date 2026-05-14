"use client";
import { useRef, useState } from "react";
import { useReveal } from "@/lib/useReveal";
import CardPopup from "./CardPopup";

const projects = [
  {
    num: "01 / 04",
    title: "Pharmacy Management System",
    desc: "Full-stack platform with 4-layer architecture; reduced manual data entry by 85%.",
    tags: ["Java", "React", "PostgreSQL", "Supabase", "REST APIs"],
    stat: "85% reduction in manual data entry",
  },
  {
    num: "02 / 04",
    title: "Smart Traffic Management System",
    desc: "Real-time traffic optimization using Computer Vision + Reinforcement Learning; reduced wait times by 60%, CO₂ by 35%.",
    tags: ["YOLOv8", "OpenCV", "FastAPI", "React", "TypeScript"],
    stat: "60% reduction in wait times",
  },
  {
    num: "03 / 04",
    title: "SONIC: Network Immunization Algorithm",
    desc: "GNN-based epidemic source detection achieving 96.7% top-5 accuracy with a 27% performance gain over baselines.",
    tags: ["Python", "PyTorch", "GraphSAGE", "NetworkX"],
    stat: "96.7% top-5 accuracy",
  },
  {
    num: "04 / 04",
    title: "Content-Aware Caching Algorithm",
    desc: "Outperformed LRU across 30,000 simulated file operations using a 4-factor priority scoring algorithm.",
    tags: ["C++", "STL"],
    stat: "Outperformed LRU on 30k ops",
  },
];

export default function Projects() {
  const labelR = useReveal();
  const titleR = useReveal();

  return (
    <section id="projects" className="py-28">
      <div className="max-w-6xl mx-auto px-8 md:px-12">
        <div ref={labelR.ref} style={labelR.style} className="section-label">
          Selected Work
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
          Projects
        </h2>

        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((p, i) => (
            <ProjectCard key={p.num} project={p} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  delay,
}: {
  project: (typeof projects)[number];
  delay: number;
}) {
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

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r  = el.getBoundingClientRect();
    const dx = (e.clientX - r.left - r.width  / 2) / (r.width  / 2);
    const dy = (e.clientY - r.top  - r.height / 2) / (r.height / 2);
    el.style.transform  = `perspective(1200px) rotateX(${-dy * 7}deg) rotateY(${dx * 7}deg) translateZ(10px) scale(1.01)`;
    el.style.transition = "transform 0.08s ease";
    el.style.boxShadow  = "0 24px 60px rgba(0,0,0,0.1)";
  };

  const onLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.style.transform  = "perspective(1200px) rotateX(0) rotateY(0) translateZ(0) scale(1)";
    el.style.transition = "transform 0.6s cubic-bezier(0.25,0.1,0.25,1), background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease";
    el.style.boxShadow  = "0 4px 24px rgba(212,104,143,0.08)";
    el.style.background   = "rgba(255,255,255,0.45)";
    el.style.borderColor  = "rgba(255,255,255,0.6)";
    clearHover();
    if (!clickOpenedRef.current) setPopupOpen(false);
  };

  return (
    <div
      ref={ref}
      style={{
        ...style,
        transitionDelay: `${delay}ms`,
        background: "rgba(255,255,255,0.45)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.6)",
        boxShadow: "0 4px 24px rgba(212,104,143,0.08)",
        padding: "2.5rem",
        cursor: "pointer",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onMouseEnter={(e) => {
        e.currentTarget.style.background  = "rgba(255,255,255,0.65)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.85)";
        startHover();
      }}
      onClick={handleClick}
    >
      <div style={{
        fontFamily: "'Playfair Display', serif",
        fontStyle: "italic",
        fontWeight: 300,
        fontSize: "0.82rem",
        letterSpacing: "0.15em",
        color: "var(--text-muted)",
        marginBottom: "1.25rem",
      }}>
        {project.num}
      </div>

      <h3 style={{
        fontFamily: "'Playfair Display', serif",
        fontWeight: 400,
        fontSize: "1.5rem",
        lineHeight: 1.2,
        color: "var(--text-primary)",
        marginBottom: "0.9rem",
      }}>
        {project.title}
      </h3>

      <p style={{
        fontFamily: "var(--font-sans)",
        fontWeight: 300,
        fontSize: "0.92rem",
        lineHeight: 1.75,
        color: "var(--text-secondary)",
        marginBottom: "1.5rem",
      }}>
        {project.desc}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.25rem" }}>
        {project.tags.map((t) => (
          <span
            key={t}
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 400,
              fontSize: "0.68rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              padding: "0.25rem 0.65rem",
              color: "var(--accent)",
              border: "1px solid var(--tag-border)",
              background: "var(--tag-bg)",
            }}
          >
            {t}
          </span>
        ))}
      </div>

      <div style={{
        fontFamily: "'Playfair Display', serif",
        fontStyle: "italic",
        fontSize: "0.88rem",
        color: "var(--text-muted)",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
      }}>
        <span style={{ display: "block", height: "1px", width: "20px", background: "var(--accent-light)" }} />
        {project.stat}
      </div>

      {/* Click hint */}
      <div style={{
        marginTop: "1.2rem",
        fontFamily: "var(--font-sans)",
        fontSize: "0.62rem",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: "var(--text-muted)",
        opacity: 0.5,
        display: "flex",
        alignItems: "center",
        gap: "0.4rem",
      }}>
        <span style={{ width: "14px", height: "1px", background: "var(--accent-light)", display: "inline-block" }} />
        click to expand
      </div>

      <CardPopup
        open={popupOpen}
        onClose={handleClose}
        title={project.title}
        subtitle={project.num}
      />
    </div>
  );
}
