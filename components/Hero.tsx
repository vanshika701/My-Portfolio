"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

interface Props { revealed: boolean }

/* ── Word-by-word reveal ─────────────────────────────────── */
function WordReveal({ text, active, startDelayMs = 300 }: { text: string; active: boolean; startDelayMs?: number }) {
  const words = text.split(" ");
  return (
    <p style={{
      fontFamily: "'Playfair Display', serif",
      fontStyle: "italic",
      fontWeight: 300,
      fontSize: "clamp(0.88rem, 1.5vw, 1.1rem)",
      lineHeight: 1.65,
      color: "var(--text-secondary)",
      display: "flex",
      flexWrap: "wrap",
      gap: "0 0.28em",
      maxWidth: "640px",
    }}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            opacity: active ? 1 : 0,
            transform: active ? "translateY(0)" : "translateY(12px)",
            transition: `opacity 0.5s ease ${startDelayMs + i * 65}ms, transform 0.5s cubic-bezier(0.25,0.1,0.25,1) ${startDelayMs + i * 65}ms`,
          }}
        >
          {word}
        </span>
      ))}
    </p>
  );
}

export default function Hero({ revealed }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* ── Three.js wave mesh ───────────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 3;
    const geo = new THREE.PlaneGeometry(7, 5, 70, 45);
    const mat = new THREE.MeshBasicMaterial({ color: 0xd4688f, wireframe: true, transparent: true, opacity: 0.18 });
    scene.add(new THREE.Mesh(geo, mat));
    const pos = geo.attributes.position;
    const origZ = new Float32Array(pos.count);
    for (let i = 0; i < pos.count; i++) origZ[i] = pos.getZ(i);
    let animId: number;
    const resize = () => {
      renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);
    const clock = new THREE.Clock();
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i), y = pos.getY(i);
        pos.setZ(i, origZ[i] + Math.sin(x * 1.1 + t * 0.65) * 0.09 + Math.sin(y * 1.4 + t * 0.45) * 0.07);
      }
      pos.needsUpdate = true;
      renderer.render(scene, camera);
    };
    animate();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); renderer.dispose(); };
  }, []);

  const fade = (delay: number): React.CSSProperties => ({
    opacity:    revealed ? 1 : 0,
    transform:  revealed ? "translateY(0)" : "translateY(22px)",
    transition: `opacity 0.9s ease ${delay}ms, transform 0.9s cubic-bezier(0.25,0.1,0.25,1) ${delay}ms`,
  });

  return (
    <section
      id="hero"
      className="relative overflow-hidden"
      style={{ minHeight: "100svh" }}
    >
      {/* Three.js background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }} />

      {/* ── Main layout ──────────────────────────────────── */}
      <div
        className="relative z-10 flex flex-col justify-between"
        style={{
          minHeight: "100svh",
          padding: "clamp(2rem, 4vw, 4rem) clamp(2rem, 4vw, 4rem) clamp(2.5rem, 4vw, 4rem)",
        }}
      >

        {/* ── Top: eyebrow ─────────────────────────────── */}
        <div style={fade(0)}>
          <p style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 300,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            fontSize: "0.68rem",
            color: "var(--text-muted)",
          }}>
            Portfolio — 2025
          </p>
        </div>

        {/* ── Centre: name + tagline ───────────────────── */}
        <div style={{ margin: "auto 0", paddingTop: "1rem" }}>

          {/* VANSHIKA — FLIP target #hero-first */}
          <div style={{ lineHeight: 0.88, marginBottom: "0.04em" }}>
            <span
              id="hero-first"
              style={{
                display:       "inline-block",
                fontFamily:    "'Playfair Display', serif",
                fontWeight:    900,
                fontSize:      "clamp(3.8rem, 11vw, 12rem)",
                lineHeight:    0.88,
                letterSpacing: "-0.02em",
                textTransform: "uppercase",
                color:         "var(--text-primary)",
                opacity:       0,
                willChange:    "transform, opacity",
              }}
            >
              Vanshika
            </span>
          </div>

          {/* Srivastava — FLIP target #hero-last */}
          <div style={{ lineHeight: 0.88 }}>
            <span
              id="hero-last"
              style={{
                display:       "inline-block",
                fontFamily:    "'Playfair Display', serif",
                fontWeight:    400,
                fontStyle:     "italic",
                fontSize:      "clamp(2.8rem, 8.5vw, 9rem)",
                lineHeight:    0.88,
                letterSpacing: "0.01em",
                color:         "var(--accent)",
                opacity:       0,
                willChange:    "transform, opacity",
              }}
            >
              Srivastava
            </span>
          </div>

          {/* Tagline — word-by-word reveal */}
          <div style={{ marginTop: "1.8rem" }}>
            <WordReveal
              text="When I'm not writing code, I'm playing Sudoku. Logic never takes a break."
              active={revealed}
              startDelayMs={300}
            />
          </div>
        </div>

        {/* ── Bottom section ───────────────────────────── */}
        <div className="flex items-end justify-between flex-wrap gap-8">

          {/* Bottom-left: descriptor + CTAs + ornament */}
          <div style={{ maxWidth: "460px" }}>
            <p style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 300,
              letterSpacing: "0.1em",
              fontSize: "clamp(0.88rem, 1.4vw, 1rem)",
              color: "var(--text-muted)",
              marginBottom: "0.6rem",
              ...fade(120),
            }}>
              Full-Stack Developer · ML Engineer
            </p>
            <p style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 300,
              letterSpacing: "0.06em",
              fontSize: "clamp(0.82rem, 1.3vw, 0.95rem)",
              color: "var(--text-muted)",
              marginBottom: "1.8rem",
              ...fade(180),
            }}>
              B.Tech CSE @ Shiv Nadar University &nbsp;·&nbsp; CGPA 8.00 &nbsp;·&nbsp; 2023 – 2027
            </p>
            <div className="flex flex-wrap gap-3" style={fade(260)}>
              <HeroBtn
                primary
                onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
              >View Work</HeroBtn>
              <HeroBtn
                onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              >Contact Me</HeroBtn>
            </div>
            {/* Ornament */}
            <div style={{ marginTop: "2.5rem", ...fade(360) }}>
              <OrnamentStar />
            </div>
          </div>

          {/* Bottom-right: role display watermark */}
          <div className="hidden md:block text-right" style={{ ...fade(80) }}>
            <p style={{
              fontFamily:    "'Playfair Display', serif",
              fontWeight:    700,
              fontStyle:     "italic",
              fontSize:      "clamp(2rem, 5vw, 5.5rem)",
              lineHeight:    0.9,
              color:         "var(--text-primary)",
              opacity:       0.12,
              letterSpacing: "-0.01em",
            }}>
              Software Engineer<br />in training
            </p>
          </div>

        </div>
      </div>

      {/* Scroll hint */}
      <div
        className="absolute bottom-6 left-1/2 flex flex-col items-center gap-2 animate-scroll-bounce"
        style={fade(500)}
      >
        <span style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 300,
          fontSize: "0.62rem",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
        }}>
          Scroll
        </span>
        <div className="w-px h-8" style={{ background: "linear-gradient(to bottom, var(--accent-light), transparent)" }} />
      </div>
    </section>
  );
}

/* ── Ornament ─────────────────────────────────────────────── */
function OrnamentStar() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ opacity: 0.4 }}>
      {[0, 30, 60, 90, 120, 150].map((deg) => (
        <line
          key={deg}
          x1="16" y1="2" x2="16" y2="30"
          stroke="var(--accent)"
          strokeWidth="1"
          transform={`rotate(${deg} 16 16)`}
        />
      ))}
    </svg>
  );
}

/* ── Magnetic CTA button ─────────────────────────────────── */
function HeroBtn({ children, primary, onClick }: { children: React.ReactNode; primary?: boolean; onClick?: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseMove={(e) => {
        const el = ref.current; if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.transform  = `translate(${(e.clientX - r.left - r.width/2) * 0.2}px, ${(e.clientY - r.top - r.height/2) * 0.2}px)`;
        el.style.transition = "transform 0.1s ease";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.transform   = "translate(0,0)";
        el.style.transition  = "transform 0.55s cubic-bezier(0.25,0.1,0.25,1), background 0.4s, color 0.4s, border-color 0.4s";
        el.style.background  = "transparent";
        el.style.color       = primary ? "var(--accent)" : "var(--text-secondary)";
        el.style.borderColor = primary ? "var(--accent)" : "var(--border)";
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.background  = primary ? "var(--accent)" : "transparent";
        el.style.color       = primary ? "var(--bg)" : "var(--text-primary)";
        el.style.borderColor = primary ? "var(--accent)" : "var(--text-secondary)";
      }}
      style={{
        fontFamily:    "var(--font-sans)",
        fontWeight:    400,
        fontSize:      "0.72rem",
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        padding:       "0.8rem 2rem",
        border:        "1px solid",
        borderColor:   primary ? "var(--accent)" : "var(--border)",
        color:         primary ? "var(--accent)" : "var(--text-secondary)",
        background:    "transparent",
        cursor:        "pointer",
      }}
    >{children}</button>
  );
}
