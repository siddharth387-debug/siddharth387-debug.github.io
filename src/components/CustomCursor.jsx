import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor = () => {
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const dotRef = useRef(null);
  const ringRef = useRef(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    let animId;

    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);

      // Immediately move precision dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check context under cursor
      const target = e.target;
      const cursorElem = target?.closest('[data-cursor]');
      const clickableElem = target?.closest('a, button, [role="button"], input, textarea');

      if (cursorElem) {
        const text = cursorElem.getAttribute('data-cursor');
        setCursorText(text || '');
        setIsHovered(true);
      } else if (clickableElem) {
        setCursorText('');
        setIsHovered(true);
      } else {
        setCursorText('');
        setIsHovered(false);
      }
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    // Disable only if active touch event occurs
    const onTouchStart = () => setIsVisible(false);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    window.addEventListener('touchstart', onTouchStart, { passive: true });

    // Smooth LERP loop for trailing reticle ring
    const render = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.22;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.22;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('touchstart', onTouchStart);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[99999] overflow-hidden transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* 1. Precision Center Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -ml-1 -mt-1 w-2.5 h-2.5 rounded-full bg-[#38bdf8] shadow-[0_0_8px_#38bdf8] pointer-events-none transition-opacity duration-150 ${
          cursorText ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ willChange: 'transform' }}
      />

      {/* 2. Trailing Reticle & Smart Context Badge */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none flex items-center justify-center transition-all duration-150 ease-out"
        style={{ willChange: 'transform' }}
      >
        {cursorText ? (
          // Context Badge (e.g. [ CASE STUDY ], [ LIVE DEMO ], [ VIEW CODE ])
          <div
            className={`-translate-x-1/2 -translate-y-1/2 px-3 py-1 rounded-md bg-[#38bdf8] text-[#090d12] font-mono text-[11px] font-extrabold tracking-wider shadow-xl shadow-sky-400/30 flex items-center gap-1 transition-transform duration-100 ${
              isClicked ? 'scale-90' : 'scale-100'
            }`}
          >
            <span>{cursorText}</span>
          </div>
        ) : (
          // Precision Reticle Ring
          <div
            className={`-translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-200 ${
              isHovered
                ? 'w-10 h-10 border-[#38bdf8] bg-sky-400/15 shadow-[0_0_12px_rgba(56,189,248,0.3)]'
                : 'w-7 h-7 border-[#38bdf8]/60'
            } ${isClicked ? 'scale-75 bg-sky-400/30' : 'scale-100'}`}
          />
        )}
      </div>
    </div>
  );
};
