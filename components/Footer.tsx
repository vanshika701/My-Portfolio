export default function Footer() {
  return (
    <footer
      className="flex flex-wrap justify-between items-center gap-4 px-8 md:px-12 py-6"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <span
        className="font-sans font-extralight text-[0.63rem] tracking-[0.2em] uppercase"
        style={{ color: "var(--text-muted)" }}
      >
        © 2025 Vanshika Srivastava
      </span>
      <span
        className="font-sans font-extralight text-[0.63rem] tracking-[0.2em] uppercase"
        style={{ color: "var(--text-muted)" }}
      >
        B.Tech CSE · Shiv Nadar University
      </span>
    </footer>
  );
}
