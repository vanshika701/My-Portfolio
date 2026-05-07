"use client";
import { useReveal } from "@/lib/useReveal";

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
    el.style.boxShadow  = "none";
    el.style.background   = "var(--bg-card)";
    el.style.borderColor  = "var(--border)";
  };

  return (
    <div
      ref={ref}
      style={{
        ...style,
        transitionDelay: `${delay}ms`,
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        padding: "2.5rem",
        cursor: "default",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onMouseEnter={(e) => {
        e.currentTarget.style.background  = "var(--bg-card-hover)";
        e.currentTarget.style.borderColor = "var(--accent-light)";
      }}
    >
      <div
        className="font-serif font-light italic text-[0.75rem] tracking-[0.15em] mb-5"
        style={{ color: "var(--text-muted)" }}
      >
        {project.num}
      </div>
      <h3
        style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 400,
          fontSize: "1.5rem",
          lineHeight: 1.2,
          color: "var(--text-primary)",
          marginBottom: "0.9rem",
        }}
      >
        {project.title}
      </h3>
      <p
        className="font-sans font-light text-[0.8rem] leading-[1.75] mb-6"
        style={{ color: "var(--text-secondary)" }}
      >
        {project.desc}
      </p>
      <div className="flex flex-wrap gap-2 mb-5">
        {project.tags.map((t) => (
          <span
            key={t}
            className="font-sans font-extralight text-[0.58rem] tracking-[0.18em] uppercase px-2.5 py-1 rounded-sm"
            style={{
              color: "var(--accent)",
              border: "1px solid var(--tag-border)",
              background: "var(--tag-bg)",
            }}
          >
            {t}
          </span>
        ))}
      </div>
      <div
        className="font-serif italic text-[0.82rem] flex items-center gap-3"
        style={{ color: "var(--text-muted)" }}
      >
        <span className="block h-px w-5" style={{ background: "var(--accent-light)" }} />
        {project.stat}
      </div>
    </div>
  );
}
