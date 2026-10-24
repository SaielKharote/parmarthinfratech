import React, { useEffect, useRef } from 'react';

/**
 * Dynamic Wallpaper:
 * Sleek, simple, and slow-motion ambient background for the complete screen.
 * Operates purely on slow-motion GPU-accelerated atmospheric gradients and
 * tranquil floating solar photon particles without any mouse/gyro tilt listeners.
 */
export const LiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let animId: number;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Modest particle count for calm, slow-motion elegance (36 peaceful solar photons)
    const particleCount = 36;
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
      'rgba(56, 189, 248, ',  // Electric Sky Blue
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 1,
        // Ultra-slow, gentle floating speed
        vx: (Math.random() - 0.5) * 0.12,
        vy: -Math.random() * 0.22 - 0.08, 
        alpha: Math.random() * 0.35 + 0.1,
        alphaSpeed: (Math.random() * 0.004 + 0.002) * (Math.random() > 0.5 ? 1 : -1),
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let isVisible = true;
    const handleVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const render = () => {
      if (isVisible) {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particleCount; i++) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.alpha += p.alphaSpeed;

          // Pulse alpha smoothly between 0.08 and 0.45
          if (p.alpha > 0.45) {
            p.alpha = 0.45;
            p.alphaSpeed = -p.alphaSpeed;
          } else if (p.alpha < 0.08) {
            p.alpha = 0.08;
            p.alphaSpeed = -p.alphaSpeed;
          }

          // Wrap edges
          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          if (p.x < -10) p.x = width + 10;
          else if (p.x > width + 10) p.x = -10;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${p.alpha.toFixed(3)})`;
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
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

      {/* 2. Slow-Motion Auroral Ambient Gradient Spheres */}
      {/* Cyan Clean-Tech Aura (Top Left / Center) */}
      <div
        className="absolute -top-32 -left-28 w-[450px] h-[450px] sm:w-[650px] sm:h-[650px] rounded-full blur-[100px] opacity-35 animate-slow-drift-1"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.3) 0%, rgba(6,182,212,0.08) 50%, transparent 75%)',
        }}
      />

      {/* Solar Amber Energy Aura (Top Right / Middle) */}
      <div
        className="absolute top-1/4 -right-24 w-[420px] h-[420px] sm:w-[600px] sm:h-[600px] rounded-full blur-[110px] opacity-30 animate-slow-drift-2"
        style={{
          background: 'radial-gradient(circle, rgba(245,158,11,0.25) 0%, rgba(217,119,6,0.06) 55%, transparent 75%)',
        }}
      />

      {/* Renewable Emerald Aura (Bottom Center) */}
      <div
        className="absolute -bottom-36 left-1/3 w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] rounded-full blur-[120px] opacity-25 animate-slow-drift-3"
        style={{
          background: 'radial-gradient(circle, rgba(16,185,129,0.22) 0%, rgba(5,150,105,0.05) 50%, transparent 75%)',
        }}
      />

      {/* Deep Cobalt Substation Aura (Center Breathing Pulse) */}
      <div
        className="absolute top-1/2 left-1/4 w-[380px] h-[380px] sm:w-[550px] sm:h-[550px] rounded-full blur-[90px] opacity-20 animate-slow-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.22) 0%, rgba(30,64,175,0.05) 60%, transparent 80%)',
        }}
      />

      {/* 3. Sleek Photovoltaic Grid Blueprint Texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.7) 1px, transparent 1px)`,
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
