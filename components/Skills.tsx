"use client";
import { useReveal } from "@/lib/useReveal";

const marqueeItems = [
  "Java","Python","React","FastAPI","PostgreSQL","TensorFlow",
  "YOLOv8","Kali Linux","C++","TypeScript","PyTorch","Wireshark",
  "GraphSAGE","Scikit-learn","Supabase","Metasploit","NumPy","Pandas",
];

const groups = [
  {
    title: "Languages",
    items: ["Java","Python","JavaScript","TypeScript","PostgreSQL","MySQL","HTML / CSS","C++"],
  },
  {
    title: "Frameworks & Libraries",
    items: ["React","Tailwind CSS","FastAPI","TensorFlow","YOLOv8","Scikit-learn","NumPy / Pandas","PyTorch / GraphSAGE"],
  },
  {
    title: "Tools & Platforms",
    items: ["Git / GitHub","Supabase","Vercel","Kali Linux","Wireshark","Burp Suite","Metasploit","Nmap / Gobuster"],
  },
];

export default function Skills() {
  const labelR   = useReveal();
  const titleR   = useReveal();
  const marqueeR = useReveal();

  return (
    <section id="skills" className="py-28">
      <div className="max-w-6xl mx-auto px-8 md:px-12">
        <div ref={labelR.ref} style={labelR.style} className="section-label">
          Expertise
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
          Skills
        </h2>

        {/* Marquee */}
        <div
          ref={marqueeR.ref}
          style={{
            ...marqueeR.style,
            transitionDelay: "150ms",
            overflow: "hidden",
            borderTop: "1px solid var(--border)",
            borderBottom: "1px solid var(--border)",
            padding: "1.6rem 0",
            marginBottom: "4rem",
          }}
        >
          <div className="animate-marquee flex whitespace-nowrap w-max">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span
                key={i}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "2.5rem",
                  padding: "0 2.5rem",
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: "1.1rem",
                  color: "var(--text-muted)",
                }}
              >
                {item}
                <span style={{ color: "var(--accent-light)" }}>·</span>
              </span>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-12">
          {groups.map((g, gi) => (
            <SkillGroup key={g.title} group={g} delay={gi * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillGroup({
  group,
  delay,
}: {
  group: (typeof groups)[number];
  delay: number;
}) {
  const { ref, style } = useReveal();
  return (
    <div ref={ref} style={{ ...style, transitionDelay: `${delay}ms` }}>
      <div style={{
        fontFamily: "var(--font-sans)",
        fontWeight: 500,
        fontSize: "0.82rem",
        letterSpacing: "0.3em",
        textTransform: "uppercase",
        color: "var(--accent)",
        marginBottom: "1.25rem",
      }}>
        {group.title}
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {group.items.map((item) => (
          <div
            key={item}
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 300,
              fontSize: "0.95rem",
              letterSpacing: "0.04em",
              borderBottom: "1px solid var(--border)",
              color: "var(--text-secondary)",
              transition: "color 0.3s ease",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0.75rem 0",
              cursor: "default",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; }}
          >
            {item}
            <span style={{ display: "block", width: "5px", height: "5px", borderRadius: "50%", background: "var(--accent-light)" }} />
          </div>
        ))}
      </div>
    </div>
  );
}
