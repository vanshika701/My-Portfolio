"use client";

const links = [
  { label: "About",      href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects",   href: "#projects" },
  { label: "Skills",     href: "#skills" },
  { label: "Contact",    href: "#contact" },
];

interface Props {
  visible:       boolean;
  theme:         "pink" | "white";
  onToggleTheme: () => void;
}

const linkStyle: React.CSSProperties = {
  fontFamily:     "var(--font-sans)",
  fontWeight:     300,
  fontSize:       "clamp(0.68rem, 1.1vw, 0.82rem)",
  letterSpacing:  "0.22em",
  textTransform:  "uppercase",
  color:          "var(--text-secondary)",
  textDecoration: "none",
  display:        "block",
  transition:     "color 0.3s ease",
};

export default function Nav({ visible, theme, onToggleTheme }: Props) {
  const anchor = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const vis: React.CSSProperties = {
    opacity:    visible ? 1 : 0,
    transform:  visible ? "translateY(0)" : "translateY(-10px)",
    transition: "opacity 0.9s cubic-bezier(0.25,0.1,0.25,1), transform 0.9s cubic-bezier(0.25,0.1,0.25,1)",
  };

  return (
    <>
      {/* ── Logo — fixed top-left ─────────────────────── */}
      <a
        href="#hero"
        onClick={(e) => anchor(e, "#hero")}
        style={{
          ...vis,
          position:       "fixed",
          top:            "clamp(1rem, 2.5vw, 2rem)",
          left:           "clamp(1.2rem, 3.5vw, 3.5rem)",
          zIndex:         901,
          fontFamily:     "'Playfair Display', serif",
          fontWeight:     700,
          fontStyle:      "italic",
          fontSize:       "clamp(0.85rem, 1.3vw, 1.1rem)",
          letterSpacing:  "0.06em",
          color:          "var(--text-primary)",
          textDecoration: "none",
        }}
      >
        V.S.
      </a>

      {/* ── Nav column — fixed top-right, always visible ─ */}
      <nav
        style={{
          ...vis,
          position:       "fixed",
          top:            "clamp(1rem, 2.5vw, 2rem)",
          right:          "clamp(1.2rem, 3.5vw, 3.5rem)",
          zIndex:         901,
          display:        "flex",
          flexDirection:  "column",
          alignItems:     "flex-end",
          gap:            "0.7rem",
        }}
      >
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            onClick={(e) => anchor(e, l.href)}
            style={linkStyle}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; }}
          >
            {l.label}
          </a>
        ))}

        {/* Divider */}
        <div style={{ width: "20px", height: "1px", background: "var(--border)", margin: "0.2rem 0" }} />

        {/* Theme toggle — active mode */}
        <button
          onClick={onToggleTheme}
          style={{
            ...linkStyle,
            background: "none",
            border:     "none",
            cursor:     "pointer",
            padding:    0,
            color:      "var(--accent)",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}
        >
          {theme === "pink" ? "Off-White" : "Pink"}
        </button>

        {/* Theme toggle — current (dimmed) */}
        <button
          onClick={onToggleTheme}
          style={{
            ...linkStyle,
            background: "none",
            border:     "none",
            cursor:     "pointer",
            padding:    0,
            color:      "var(--text-muted)",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
        >
          {theme === "pink" ? "Pink ✓" : "Off-White ✓"}
        </button>
      </nav>
    </>
  );
}
