import React, { useRef, useState } from 'react';
import gsap from 'gsap';

export const SpotlightCard = ({
  children,
  className = '',
  spotlightColor = 'rgba(56, 189, 248, 0.18)',
  enableTilt = true,
  maxTilt = 4.5,
  ...props
}) => {
  const divRef = useRef(null);
  const glowRef = useRef(null);
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    const el = divRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    el.style.setProperty('--mouse-x', `${x}px`);
    el.style.setProperty('--mouse-y', `${y}px`);
    setOpacity(1);

    if (enableTilt) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      gsap.to(el, {
        rotateX,
        rotateY,
        y: -4,
        scale: 1.006,
        transformPerspective: 1100,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    } else {
      gsap.to(el, {
        y: -2,
        duration: 0.25,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    }
  };

  const handleMouseLeave = () => {
    setOpacity(0);
    const el = divRef.current;
    if (!el) return;

    gsap.to(el, {
      rotateX: 0,
      rotateY: 0,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: 'elastic.out(1, 0.65)',
      overwrite: 'auto'
    });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
      className={`relative overflow-hidden rounded-2xl border border-[#222b38] bg-[#12171f] transition-colors duration-300 ${className}`}
      {...props}
    >
      {/* Dynamic Cursor Spotlight Radial Overlay */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300 z-0"
        style={{
          opacity,
          background: `radial-gradient(460px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), ${spotlightColor}, transparent 75%)`,
        }}
      />
      <div className="relative z-10 h-full flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
};
