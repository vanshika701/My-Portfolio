"use client";
import { useState, useCallback, useEffect } from "react";
import Loader       from "@/components/Loader";
import IntroOverlay from "@/components/IntroOverlay";
import Nav          from "@/components/Nav";
import Hero         from "@/components/Hero";
import About        from "@/components/About";
import Experience   from "@/components/Experience";
import Projects     from "@/components/Projects";
import Skills       from "@/components/Skills";
import Achievements from "@/components/Achievements";
import Contact      from "@/components/Contact";
import Footer       from "@/components/Footer";
import { useScrollEffects } from "@/lib/useScrollEffects";

type Stage = "loading" | "intro" | "page";
interface IntroRects { first: DOMRect; last: DOMRect }

const Divider = () => (
  <div style={{ height: "1px", background: "linear-gradient(to right, transparent, var(--border), transparent)", margin: "0 clamp(1.5rem,4vw,3.5rem)" }} />
);

export default function Home() {
  const [stage,        setStage]        = useState<Stage>("loading");
  const [navVisible,   setNavVisible]   = useState(false);
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [theme,        setTheme]        = useState<"pink" | "white">("pink");

  useScrollEffects(stage === "page");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  /* ── Loader done ───────────────────────────────────── */
  const onLoaderDone = useCallback(() => setStage("intro"), []);

  /* ── Intro done: FLIP both words individually ──────── */
  const onIntroDone = useCallback(async ({ first: ir1, last: ir2 }: IntroRects) => {
    const { gsap } = await import("gsap");

    const el1 = document.getElementById("hero-first") as HTMLElement | null;
    const el2 = document.getElementById("hero-last")  as HTMLElement | null;

    if (!el1 || !el2) {
      setStage("page");
      setNavVisible(true);
      setHeroRevealed(true);
      return;
    }

    /* Measure natural hero positions while page is still visibility:hidden */
    const r1 = el1.getBoundingClientRect();
    const r2 = el2.getBoundingClientRect();

    /* FLIP: start each word at its intro position, scaled to intro size */
    gsap.set(el1, {
      opacity:         1,
      x:               ir1.left + ir1.width  / 2 - (r1.left + r1.width  / 2),
      y:               ir1.top  + ir1.height / 2 - (r1.top  + r1.height / 2),
      scale:           ir1.height / r1.height,
      transformOrigin: "50% 50%",
    });

    gsap.set(el2, {
      opacity:         1,
      x:               ir2.left + ir2.width  / 2 - (r2.left + r2.width  / 2),
      y:               ir2.top  + ir2.height / 2 - (r2.top  + r2.height / 2),
      scale:           ir2.height / r2.height,
      transformOrigin: "50% 50%",
    });

    /* Make page visible — words are already in their starting positions */
    setStage("page");

    /* One rAF so React has applied visibility:visible before GSAP animates */
    await new Promise<void>((r) => requestAnimationFrame(() => r()));

    /* Animate FIRST word to its natural position */
    gsap.to(el1, {
      x: 0, y: 0, scale: 1,
      duration: 1.05,
      ease: "expo.out",
      clearProps: "transform,transformOrigin",
    });

    /* Animate SECOND word to its natural position — tiny stagger for a "peel apart" feel */
    gsap.to(el2, {
      x: 0, y: 0, scale: 1,
      duration: 1.05,
      delay: 0.07,
      ease: "expo.out",
      clearProps: "transform,transformOrigin",
      onComplete: () => {
        setNavVisible(true);
        setHeroRevealed(true);
      },
    });
  }, []);

  return (
    <>
      {stage === "loading" && <Loader onComplete={onLoaderDone} />}
      {stage === "intro"   && <IntroOverlay onComplete={onIntroDone} />}

      {/* Page — always mounted so hero rects can be measured while hidden */}
      <div style={{ visibility: stage === "page" ? "visible" : "hidden" }}>
        <Nav visible={navVisible} theme={theme} onToggleTheme={() => setTheme(t => t === "pink" ? "white" : "pink")} />

        <main>
          <Hero revealed={heroRevealed} />
          <Divider />
          <About />
          <Divider />
          <Experience />
          <Divider />
          <Projects />
          <Divider />
          <Skills />
          <Divider />
          <Achievements />
          <Divider />
          <Contact />
        </main>

        <Footer />
      </div>
    </>
  );
}
