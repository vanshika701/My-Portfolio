"use client";
import { useReveal } from "@/lib/useReveal";

const links = [
  { label: "vs905@snu.edu.in",               href: "mailto:vs905@snu.edu.in" },
  { label: "+91 88659 53423",                 href: "tel:+918865953423" },
  { label: "LinkedIn",                        href: "https://linkedin.com/in/vanshika-srivastava" },
  { label: "GitHub",                          href: "https://github.com/vanshikasrivastava" },
];

export default function Contact() {
  const labelR    = useReveal();
  const headlineR = useReveal();
  const subR      = useReveal();
  const linksR    = useReveal();
  const btnR      = useReveal();

  return (
    <section id="contact" className="py-36 text-center">
      <div className="max-w-6xl mx-auto px-8 md:px-12">

        <div
          ref={labelR.ref}
          style={{ ...labelR.style, justifyContent: "center" }}
          className="section-label"
        >
          Get In Touch
        </div>

        <h2
          ref={headlineR.ref}
          style={{
            ...headlineR.style,
            transitionDelay: "100ms",
            fontFamily: "'Playfair Display', serif",
            fontWeight: 300,
            fontStyle: "italic",
            fontSize: "clamp(2.8rem, 7vw, 6rem)",
            lineHeight: 1.1,
            color: "var(--text-primary)",
            marginBottom: "1.5rem",
          }}
        >
          Let's build something<br />remarkable together.
        </h2>

        <p
          ref={subR.ref}
          className="font-sans font-extralight text-[0.8rem] tracking-[0.15em] mb-12"
          style={{ ...subR.style, transitionDelay: "200ms", color: "var(--text-muted)" }}
        >
          Open to internships, collaborations, and interesting problems.
        </p>

        <div
          ref={linksR.ref}
          className="flex flex-wrap justify-center gap-8 mb-14"
          style={{ ...linksR.style, transitionDelay: "300ms" }}
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="flex items-center gap-3 font-sans font-extralight text-[0.7rem] tracking-[0.22em] uppercase group"
              style={{ color: "var(--text-secondary)", textDecoration: "none", transition: "color 0.3s ease" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; }}
            >
              <span
                className="block h-px transition-all duration-300 group-hover:w-9"
                style={{ width: "20px", background: "currentColor" }}
              />
              {l.label}
            </a>
          ))}
        </div>

        <div ref={btnR.ref} style={{ ...btnR.style, transitionDelay: "400ms" }}>
          <a
            href="mailto:vs905@snu.edu.in"
            className="inline-block font-sans font-light text-[0.7rem] tracking-[0.25em] uppercase px-9 py-4"
            style={{
              border: "1px solid var(--accent)",
              color: "var(--accent)",
              textDecoration: "none",
              transition: "background 0.4s ease, color 0.4s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "var(--accent)";
              el.style.color      = "var(--bg)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "transparent";
              el.style.color      = "var(--accent)";
            }}
          >
            Say Hello
          </a>
        </div>

      </div>
    </section>
  );
}
