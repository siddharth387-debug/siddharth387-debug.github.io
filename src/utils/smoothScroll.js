import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance = null;

export function getLenis() {
  return lenisInstance;
}

export function scrollToTarget(target, options = {}) {
  if (!target) return;
  if (lenisInstance) {
    lenisInstance.scrollTo(target, {
      offset: -72,
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      ...options
    });
  } else {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

export function useLenisSmoothScroll(isModalOpen = false) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.085,
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5
    });

    lenisInstance = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Smooth anchor link interception for #hash navigation
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href || href === '#' || href.startsWith('#/')) return;

      const targetEl = document.querySelector(href);
      if (targetEl) {
        e.preventDefault();
        scrollToTarget(targetEl);
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // Refresh ScrollTrigger once layout settles
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    return () => {
      clearTimeout(refreshTimer);
      document.removeEventListener('click', handleAnchorClick);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  // Lock/unlock Lenis when modals (Command Palette / Resume) are open
  useEffect(() => {
    if (!lenisInstance) return;
    if (isModalOpen) {
      lenisInstance.stop();
    } else {
      lenisInstance.start();
    }
  }, [isModalOpen]);
}

export function useGsapSectionReveals() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section headers
      gsap.utils.toArray('[data-gsap="section-header"]').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            clearProps: 'transform',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // Animate staggered grids (Hero metrics, Bento grid, Project cards, Workflow steps)
      gsap.utils.toArray('[data-gsap="stagger-grid"]').forEach((grid) => {
        const items = grid.querySelectorAll('[data-gsap-item]');
        if (!items.length) return;
        gsap.fromTo(
          items,
          { opacity: 0, y: 32, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            stagger: 0.09,
            ease: 'power3.out',
            clearProps: 'transform',
            scrollTrigger: {
              trigger: grid,
              start: 'top 88%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);
}
