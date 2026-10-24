import React, { useEffect, useRef } from 'react';

/**
 * Dynamic Wallpaper:
 * Sleek, simple, and slow-motion ambient background for the complete screen.
 * Optimized for mobile devices with lightweight particle rendering and zero layout thrashing.
 */
export const LiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const isMobileDevice = window.innerWidth < 768;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let animId: number;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Modest particle count (fewer on mobile for 60fps responsiveness)
    const particleCount = isMobileDevice ? 14 : 32;
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      alpha: number;
      alphaSpeed: number;
      color: string;
    }> = [];

    const colors = [
      'rgba(6, 182, 212, ',   // Clean Cyan
      'rgba(245, 158, 11, ',  // Solar Amber
      'rgba(16, 185, 129, ',  // Clean Emerald
      'rgba(56, 189, 248, ',  // Sky Blue
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.8 + 1,
        vx: (Math.random() - 0.5) * 0.1,
        vy: -Math.random() * 0.18 - 0.05, 
        alpha: Math.random() * 0.3 + 0.1,
        alphaSpeed: (Math.random() * 0.003 + 0.001) * (Math.random() > 0.5 ? 1 : -1),
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let isVisible = true;
    const handleVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    let lastFrameTime = 0;
    const fpsInterval = isMobileDevice ? 1000 / 30 : 1000 / 60; // 30fps cap on mobile saves battery & CPU

    const render = (now: number) => {
      animId = requestAnimationFrame(render);

      if (!isVisible) return;

      const elapsed = now - lastFrameTime;
      if (elapsed < fpsInterval) return;
      lastFrameTime = now - (elapsed % fpsInterval);

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += p.alphaSpeed;

        if (p.alpha > 0.4) {
          p.alpha = 0.4;
          p.alphaSpeed = -p.alphaSpeed;
        } else if (p.alpha < 0.08) {
          p.alpha = 0.08;
          p.alphaSpeed = -p.alphaSpeed;
        }

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        else if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha.toFixed(2)})`;
        ctx.fill();
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none bg-slate-950"
    >
      {/* 1. Deep Atmospheric Gradient Base */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-[#030917] to-slate-950" />

      {/* 2. Mobile-Optimized Slow-Motion Auroral Ambient Gradient Spheres */}
      {/* Cyan Clean-Tech Aura */}
      <div
        className="absolute -top-32 -left-28 w-[380px] h-[380px] sm:w-[650px] sm:h-[650px] rounded-full blur-[70px] sm:blur-[100px] opacity-30 animate-slow-drift-1 mobile-reduce-glow"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.28) 0%, rgba(6,182,212,0.06) 50%, transparent 75%)',
        }}
      />

      {/* Solar Amber Energy Aura */}
      <div
        className="absolute top-1/4 -right-24 w-[350px] h-[350px] sm:w-[600px] sm:h-[600px] rounded-full blur-[75px] sm:blur-[110px] opacity-25 animate-slow-drift-2 mobile-reduce-glow"
        style={{
          background: 'radial-gradient(circle, rgba(245,158,11,0.22) 0%, rgba(217,119,6,0.05) 55%, transparent 75%)',
        }}
      />

      {/* Renewable Emerald Aura */}
      <div
        className="absolute -bottom-36 left-1/3 w-[400px] h-[400px] sm:w-[700px] sm:h-[700px] rounded-full blur-[80px] sm:blur-[120px] opacity-20 animate-slow-drift-3 mobile-reduce-glow"
        style={{
          background: 'radial-gradient(circle, rgba(16,185,129,0.2) 0%, rgba(5,150,105,0.04) 50%, transparent 75%)',
        }}
      />

      {/* 3. Photovoltaic Grid Blueprint Texture */}
      <div
        className="absolute inset-0 opacity-[0.03] sm:opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)`,
          backgroundSize: '54px 54px',
        }}
      />

      {/* 4. Fine Slow-Motion Floating Solar Energy Particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
};
