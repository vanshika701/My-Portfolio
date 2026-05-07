"use client";
import Image from "next/image";
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
  const photoR  = useReveal();

  return (
    <section id="about" className="py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-8 md:px-12">

        {/* ── Top row: label + bio ──────────────────────── */}
        <div className="grid md:grid-cols-[1fr_1.5fr] gap-14 md:gap-24 items-start mb-20">
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
                className="flex gap-6 py-4"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <span
                  className="font-sans font-extralight text-[0.63rem] tracking-[0.25em] uppercase pt-0.5"
                  style={{ color: "var(--text-muted)", minWidth: "90px" }}
                >
                  {d.label}
                </span>
                <span
                  className="font-sans font-light text-[0.82rem] tracking-[0.04em] leading-relaxed"
                  style={{ color: "var(--text-primary)", whiteSpace: "pre-line" }}
                >
                  {d.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Photo collage ─────────────────────────────── */}
        <div
          ref={photoR.ref}
          style={{ ...photoR.style, transitionDelay: "300ms" }}
          className="relative"
        >
          {/* Editorial label */}
          <div
            className="font-sans font-extralight text-[0.6rem] tracking-[0.35em] uppercase mb-10 flex items-center gap-4"
            style={{ color: "var(--text-muted)" }}
          >
            <span
              className="block h-px w-10"
              style={{ background: "var(--accent-light)" }}
            />
            Behind the screen
          </div>

          {/* Photos */}
          <div className="flex flex-col sm:flex-row items-start gap-0 sm:gap-0 relative" style={{ minHeight: "420px" }}>

            {/* Photo 1 — flowers (main, larger, left) */}
            <div
              className="relative group"
              style={{
                width: "min(340px, 85vw)",
                zIndex: 2,
                transform: "rotate(-2.5deg)",
                transition: "transform 0.6s cubic-bezier(0.25,0.1,0.25,1), box-shadow 0.6s ease",
                boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "rotate(-1deg) scale(1.02)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 60px rgba(0,0,0,0.14)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "rotate(-2.5deg)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 40px rgba(0,0,0,0.08)";
              }}
            >
              {/* Polaroid frame */}
              <div
                className="p-3 pb-10"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
              >
                <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
                  <Image
                    src="/images/vanshika-flowers.jpg"
                    alt="Vanshika Srivastava"
                    fill
                    style={{ objectFit: "cover", objectPosition: "center top" }}
                    sizes="340px"
                  />
                </div>
              </div>
              {/* Caption */}
              <div
                className="absolute bottom-3 left-0 right-0 text-center font-serif font-light italic text-[0.72rem] tracking-[0.08em]"
                style={{ color: "var(--text-muted)" }}
              >
                SNU Campus, 2025
              </div>
            </div>

            {/* Photo 2 — books (offset right + down) */}
            <div
              className="relative group"
              style={{
                width: "min(280px, 75vw)",
                zIndex: 3,
                marginLeft: "clamp(-60px, -10vw, -80px)",
                marginTop: "clamp(60px, 12vw, 100px)",
                transform: "rotate(3deg)",
                transition: "transform 0.6s cubic-bezier(0.25,0.1,0.25,1), box-shadow 0.6s ease",
                boxShadow: "0 8px 40px rgba(0,0,0,0.1)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "rotate(1.5deg) scale(1.02)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 60px rgba(0,0,0,0.14)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "rotate(3deg)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 40px rgba(0,0,0,0.1)";
              }}
            >
              <div
                className="p-3 pb-10"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
              >
                <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
                  <Image
                    src="/images/vanshika-books.jpg"
                    alt="Vanshika Srivastava reading"
                    fill
                    style={{ objectFit: "cover", objectPosition: "center top" }}
                    sizes="280px"
                  />
                </div>
              </div>
              <div
                className="absolute bottom-3 left-0 right-0 text-center font-serif font-light italic text-[0.72rem] tracking-[0.08em]"
                style={{ color: "var(--text-muted)" }}
              >
                always reading
              </div>
            </div>

            {/* Decorative editorial text — floats to the right */}
            <div
              className="hidden md:flex flex-col justify-end pb-10 ml-auto self-end"
              style={{ gap: "0.6rem", maxWidth: "220px" }}
            >
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 300,
                  fontStyle: "italic",
                  fontSize: "clamp(2.5rem, 4vw, 4rem)",
                  lineHeight: 0.9,
                  color: "var(--text-primary)",
                  opacity: 0.15,
                  userSelect: "none",
                }}
              >
                beyond
                <br />
                the code.
              </div>
              <p
                className="font-sans font-extralight text-[0.68rem] tracking-[0.15em] leading-loose"
                style={{ color: "var(--text-muted)" }}
              >
                Building things that matter —
                <br />
                one line at a time.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
