import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor = () => {
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseRef = useRef({ x: -100, y: -100 });
  const ringRef = useRef({ x: -100, y: -100 });
  const dotElRef = useRef(null);
  const ringElRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    // Only run on devices with fine pointer (mouse/trackpad), skip mobile/touch
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Inspect target element for cursor metadata
      const target = e.target;
      const cursorTarget = target.closest('[data-cursor]');
      const clickableTarget = target.closest('a, button, input, textarea, [role="button"]');

      if (cursorTarget) {
        const text = cursorTarget.getAttribute('data-cursor');
        setCursorText(text);
        setIsHovered(true);
      } else if (clickableTarget) {
        setCursorText('');
        setIsHovered(true);
      } else {
        setCursorText('');
        setIsHovered(false);
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // LERP animation loop for ultra-smooth trailing reticle
    const animate = () => {
      const { x: targetX, y: targetY } = mouseRef.current;
      ringRef.current.x += (targetX - ringRef.current.x) * 0.2;
      ringRef.current.y += (targetY - ringRef.current.y) * 0.2;

      if (dotElRef.current) {
        dotElRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      }

      if (ringElRef.current) {
        ringElRef.current.style.transform = `translate3d(${ringRef.current.x}px, ${ringRef.current.y}px, 0)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="hidden md:block pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
      {/* 1. Precision Center Dot */}
      <div
        ref={dotElRef}
        className={`fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-[#38bdf8] pointer-events-none transition-opacity duration-150 ${
          cursorText ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ willChange: 'transform' }}
      />

      {/* 2. Trailing Reticle & Smart Context Badge */}
      <div
        ref={ringElRef}
        className="fixed top-0 left-0 pointer-events-none flex items-center justify-center transition-all duration-150 ease-out"
        style={{ willChange: 'transform' }}
      >
        {cursorText ? (
          // Context Badge Mode (e.g. [ VIEW ➔ ], [ LIVE ↗ ], [ CODE ⌥ ])
          <div
            className={`-translate-x-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md bg-[#38bdf8] text-[#090d12] font-mono text-[10px] font-bold tracking-wider shadow-lg shadow-sky-400/25 flex items-center gap-1 scale-100 transition-transform ${
              isClicked ? 'scale-90' : 'scale-100'
            }`}
          >
            <span>{cursorText}</span>
          </div>
        ) : (
          // Precision Reticle Ring Mode
          <div
            className={`-translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-200 ${
              isHovered
                ? 'w-10 h-10 border-[#38bdf8] bg-sky-400/10'
                : 'w-7 h-7 border-[#38bdf8]/40'
            } ${isClicked ? 'scale-75' : 'scale-100'}`}
          />
        )}
      </div>
    </div>
  );
};
