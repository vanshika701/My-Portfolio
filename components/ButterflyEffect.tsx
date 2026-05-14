'use client';

import { useEffect } from 'react';

export default function ButterflyEffect() {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes bf-flap {
        0%, 100% { transform: scaleX(1); }
        50%       { transform: scaleX(0.05); }
      }
      .bf-w { animation: bf-flap var(--bf-spd, 0.26s) ease-in-out infinite; }
    `;
    document.head.appendChild(style);

    let lx = 0, ly = 0, lt = performance.now();
    let active = 0;
    const MAX = 160;
    // token bucket: refills over time, prevents burst → drought
    let tokens = 6;
    const TOKEN_MAX  = 10;
    const TOKEN_RATE = 0.07; // tokens per ms  →  ~70 butterflies / sec sustained

    function getColors() {
      const theme = document.documentElement.getAttribute('data-theme') || 'pink';
      return theme === 'white'
        ? { fore: '176,88,120', hind: '206,160,181', body: '106,64,85', stroke: '80,48,65' }
        : { fore: '212,104,143', hind: '232,168,192', body: '160,72,110', stroke: '100,48,72' };
    }

    function spawn(x: number, y: number) {
      if (active >= MAX) return;
      active++;

      const c   = getColors();
      const a   = (Math.random() * 0.15 + 0.48).toFixed(2);        // 0.48 – 0.63
      const aH  = (parseFloat(a) * 0.80).toFixed(2);               // hindwing slightly softer
      const sc  = Math.random() * 0.30 + 0.65;                     // 0.65 – 0.95  (~29–42 px)
      const spd = (Math.random() * 100 + 185) + 'ms';
      const ns  = 'http://www.w3.org/2000/svg';

      const svg = document.createElementNS(ns, 'svg');
      svg.setAttribute('width', '44');
      svg.setAttribute('height', '36');
      svg.setAttribute('viewBox', '0 0 44 36');
      svg.style.cssText = 'position:fixed;pointer-events:none;z-index:9999;will-change:transform,opacity;';

      const TO = '22px 18px'; // transform-origin = body centre in SVG coords
      const sk = `rgba(${c.stroke},0.22)`;

      const wing = (d: string, fill: string) => {
        const p = document.createElementNS(ns, 'path');
        p.setAttribute('d', d);
        p.setAttribute('fill', fill);
        p.setAttribute('stroke', sk);
        p.setAttribute('stroke-width', '0.6');
        p.classList.add('bf-w');
        p.style.transformOrigin = TO;
        p.style.setProperty('--bf-spd', spd);
        p.style.animationDelay = `-${(Math.random() * 500).toFixed(0)}ms`;
        return p;
      };

      // draw hindwings first so forewings overlap them naturally
      // Lower hindwings — rounder, smaller
      svg.appendChild(wing(
        'M22,20 C16,21 5,24 3,29 C1,34 11,36 21,28 C22,26 22,23 22,20',
        `rgba(${c.hind},${aH})`
      ));
      svg.appendChild(wing(
        'M22,20 C28,21 39,24 41,29 C43,34 33,36 23,28 C22,26 22,23 22,20',
        `rgba(${c.hind},${aH})`
      ));

      // Upper forewings — larger, elegant pointed tip
      svg.appendChild(wing(
        'M22,17 C20,10 12,2 5,5 C0,8 1,17 10,20 C15,21 20,19 22,17',
        `rgba(${c.fore},${a})`
      ));
      svg.appendChild(wing(
        'M22,17 C24,10 32,2 39,5 C44,8 43,17 34,20 C29,21 24,19 22,17',
        `rgba(${c.fore},${a})`
      ));

      // Body
      const body = document.createElementNS(ns, 'ellipse');
      body.setAttribute('cx', '22'); body.setAttribute('cy', '19');
      body.setAttribute('rx', '1.4'); body.setAttribute('ry', '5.5');
      body.setAttribute('fill', `rgba(${c.body},${(parseFloat(a) * 0.88).toFixed(2)})`);
      svg.appendChild(body);

      // Head dot
      const head = document.createElementNS(ns, 'circle');
      head.setAttribute('cx', '22'); head.setAttribute('cy', '12.5');
      head.setAttribute('r', '1.2');
      head.setAttribute('fill', `rgba(${c.body},${(parseFloat(a) * 0.75).toFixed(2)})`);
      svg.appendChild(head);

      document.body.appendChild(svg);

      const sx  = x - 22, sy = y - 18;
      const dx  = (Math.random() - 0.5) * 95;
      const dy  = -(Math.random() * 72 + 48);
      const dur = Math.random() * 900 + 1200;
      const rot = (Math.random() - 0.5) * 40;
      const t0  = performance.now();

      const tick = (now: number) => {
        const t  = Math.min((now - t0) / dur, 1);
        const e  = 1 - (1 - t) * (1 - t);
        const op = t < 0.12 ? t / 0.12 : (1 - t) / 0.88;

        svg.style.left      = (sx + dx * e) + 'px';
        svg.style.top       = (sy + dy * e) + 'px';
        svg.style.opacity   = (op * 0.58).toFixed(3);
        svg.style.transform = `scale(${sc}) rotate(${rot * Math.sin(t * Math.PI)}deg)`;

        if (t < 1) requestAnimationFrame(tick);
        else { svg.remove(); active--; }
      };
      requestAnimationFrame(tick);
    }

    const onMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      const px = lx, py = ly;
      const dx = e.clientX - px;
      const dy = e.clientY - py;
      const dt = Math.max(now - lt, 1);
      const speed = Math.hypot(dx, dy) / dt;
      const dist  = Math.hypot(dx, dy);
      lx = e.clientX; ly = e.clientY; lt = now;

      // refill token bucket based on elapsed time
      tokens = Math.min(TOKEN_MAX, tokens + dt * TOKEN_RATE);

      // desired count driven by speed, but capped by available tokens
      const desired = Math.min(Math.round(speed * 2.6), 5);
      const n = Math.min(desired, Math.floor(tokens));
      if (n <= 0) return;
      tokens -= n;

      // spread spawn points along the swipe path so fast sweeps
      // leave a continuous trail rather than a single cluster
      const steps = Math.max(1, Math.round(dist / 38));
      for (let i = 0; i < n; i++) {
        const t = steps > 1 ? (i % steps) / (steps - 1) : Math.random();
        spawn(
          px + dx * t + (Math.random() - 0.5) * 20,
          py + dy * t + (Math.random() - 0.5) * 20,
        );
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      style.remove();
    };
  }, []);

  return null;
}
