import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
      syncTouch: false,
    });

    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    let usingGsap = false;
    let onScroll;
    let tickerFn;

    if (gsap && ScrollTrigger) {
      onScroll = () => ScrollTrigger.update();
      lenis.on('scroll', onScroll);
      tickerFn = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);
      usingGsap = true;
    }

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    if (!usingGsap) rafId = requestAnimationFrame(raf);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (usingGsap && tickerFn) gsap.ticker.remove(tickerFn);
      if (onScroll) lenis.off('scroll', onScroll);
      lenis.destroy();
    };
  }, []);

  return children;
}
