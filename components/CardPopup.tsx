"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export default function CardPopup({ open, onClose, title, subtitle, children }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        style={{
          position: "fixed", inset: 0, zIndex: 2000,
          background: "rgba(0,0,0,0.45)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Panel — stop propagation so clicks inside don't bubble to the card */}
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "fixed",
          top: "50%", left: "50%",
          zIndex: 2001,
          width: "min(92vw, 560px)",
          maxHeight: "80vh",
          overflowY: "auto",
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          padding: "2.5rem",
          transform: open
            ? "translate(-50%, -50%) scale(1)"
            : "translate(-50%, -47%) scale(0.95)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "transform 0.35s cubic-bezier(0.25,0.1,0.25,1), opacity 0.3s ease",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close popup"
          style={{
            position: "absolute", top: "1.2rem", right: "1.2rem",
            background: "none", border: "none", cursor: "pointer",
            fontFamily: "var(--font-sans)",
            fontSize: "0.65rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            padding: "0.3rem 0.5rem",
            transition: "color 0.2s ease",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
        >
          Close ×
        </button>

        {/* Header */}
        <div style={{ marginBottom: "1.6rem", paddingRight: "3rem" }}>
          <h3 style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 400,
            fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
            lineHeight: 1.2,
            color: "var(--text-primary)",
            marginBottom: subtitle ? "0.5rem" : 0,
          }}>
            {title}
          </h3>
          {subtitle && (
            <p style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 400,
              fontSize: "0.72rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--accent)",
            }}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Body */}
        <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.75 }}>
          {children ?? (
            <p style={{ fontStyle: "italic", color: "var(--text-muted)", fontSize: "0.85rem" }}>
              More details coming soon.
            </p>
          )}
        </div>
      </div>
    </>,
    document.body
  );
}
