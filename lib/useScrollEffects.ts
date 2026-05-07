import { useEffect } from "react";

export function useScrollEffects(ready: boolean) {
  useEffect(() => {
    if (!ready) return;

    let lenis: import("lenis").default | null = null;

    const init = async () => {
      /* ── Lenis smooth scroll ── */
      const { default: Lenis } = await import("lenis");
      lenis = new Lenis({ lerp: 0.08, smoothWheel: true });

      const raf = (time: number) => {
        lenis!.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);

      /* ── GSAP ScrollTrigger wave fold ── */
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ScrollTrigger.scrollerProxy(document.body, {
        scrollTop(value) {
          if (arguments.length && lenis) {
            lenis.scrollTo(value as number, { immediate: true });
          }
          return lenis?.scroll ?? window.scrollY;
        },
        getBoundingClientRect() {
          return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
      });

      lenis.on("scroll", ScrollTrigger.update);

      /* Wave fold on each section */
      document.querySelectorAll("section:not(#hero)").forEach((sec) => {
        gsap.fromTo(
          sec,
          {
            rotateX: 5,
            transformOrigin: "center bottom",
            transformPerspective: 1200,
          },
          {
            rotateX: 0,
            ease: "none",
            scrollTrigger: {
              trigger: sec,
              start: "top 90%",
              end: "top 30%",
              scrub: 1.2,
              scroller: document.body,
            },
          }
        );
      });

      /* Hero parallax */
      const heroName = document.querySelector<HTMLElement>(".hero-parallax-name");
      const heroSub  = document.querySelector<HTMLElement>(".hero-parallax-sub");
      if (heroName) {
        gsap.to(heroName, {
          y: 120,
          ease: "none",
          scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
            scroller: document.body,
          },
        });
      }
      if (heroSub) {
        gsap.to(heroSub, {
          y: 60,
          ease: "none",
          scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
            scroller: document.body,
          },
        });
      }

      ScrollTrigger.refresh();
    };

    init();

    return () => {
      lenis?.destroy();
    };
  }, [ready]);
}
