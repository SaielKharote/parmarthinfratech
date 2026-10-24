import React, { useEffect, useRef } from 'react';
import { BackgroundStyle, ThemeMode } from '../types';

interface LiveBackgroundProps {
  style?: BackgroundStyle;
  theme?: ThemeMode;
  interactive?: boolean;
}

/**
 * High-performance, silky-smooth ambient background.
 * Uses GPU-accelerated CSS transforms and lightweight canvas particles without heavy 3D geometries
 * or O(N^2) loops that previously caused mobile lag, sticky scrolling, and visual clutter.
 */
export const LiveBackground: React.FC<LiveBackgroundProps> = ({
  style = 'grid',
  theme = 'dark',
  interactive = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDark = theme === 'dark';

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !interactive) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId: number;

    // Smooth lerp loop using CSS variables on the container to avoid React re-renders
    const updateMotion = () => {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;

      container.style.setProperty('--tilt-x', `${currentX.toFixed(3)}px`);
      container.style.setProperty('--tilt-y', `${currentY.toFixed(3)}px`);

      rafId = requestAnimationFrame(updateMotion);
    };

    rafId = requestAnimationFrame(updateMotion);

    // Desktop Mouse Parallax
    const handlePointerMove = (e: PointerEvent) => {
      // Normalize from -15px to 15px
      const nx = ((e.clientX / window.innerWidth) - 0.5) * 30;
      const ny = ((e.clientY / window.innerHeight) - 0.5) * 30;
      targetX = nx;
      targetY = ny;
    };

    // Mobile Device Orientation (Gyroscope) Parallax
    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        // gamma: left-to-right [-90, 90], beta: front-to-back [-180, 180]
        const gx = Math.max(-15, Math.min(15, (e.gamma / 30) * 15));
        const gy = Math.max(-15, Math.min(15, ((e.beta - 45) / 35) * 15));
        targetX = gx;
        targetY = gy;
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
      window.addEventListener('deviceorientation', handleDeviceOrientation, { passive: true });
    }

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
        window.removeEventListener('deviceorientation', handleDeviceOrientation);
      }
      cancelAnimationFrame(rafId);
    };
  }, [interactive]);

  // Lightweight 2D canvas for subtle solar photon particles (zero CPU overhead, runs at smooth 60fps)
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

    // Modest particle count: 40 particles is more than enough for high-end elegance without lagging
    const particleCount = 38;
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;
    }> = [];

    const colors = isDark
      ? ['rgba(6, 182, 212, ', 'rgba(245, 158, 11, ', 'rgba(16, 185, 129, ']
      : ['rgba(2, 132, 199, ', 'rgba(217, 119, 6, ', 'rgba(5, 150, 105, '];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.5 - 0.1, // Gently floating upwards like solar energy
        alpha: Math.random() * 0.4 + 0.15,
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

          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          if (p.x < -10) p.x = width + 10;
          else if (p.x > width + 10) p.x = -10;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${p.alpha})`;
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
  }, [isDark]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none"
      style={{
        // CSS variables dynamically updated by mouse/gyro without React re-renders
        ['--tilt-x' as any]: '0px',
        ['--tilt-y' as any]: '0px',
      }}
    >
      {/* 1. Deep Atmospheric Gradient */}
      <div
        className={`absolute inset-0 transition-colors duration-700 ${
          isDark
            ? 'bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950'
            : 'bg-gradient-to-b from-slate-50 via-sky-50/40 to-slate-100'
        }`}
      />

      {/* 2. Interactive Reactive Glow Orbs (Subtle Cyan & Solar Amber) */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 sm:w-[500px] sm:h-[500px] rounded-full blur-3xl opacity-35 transition-transform duration-300 ease-out"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(6,182,212,0.22) 0%, rgba(6,182,212,0) 70%)'
            : 'radial-gradient(circle, rgba(2,132,199,0.18) 0%, rgba(2,132,199,0) 70%)',
          transform: 'translate3d(var(--tilt-x), var(--tilt-y), 0)',
        }}
      />

      <div
        className="absolute top-1/3 -right-32 w-96 h-96 sm:w-[600px] sm:h-[600px] rounded-full blur-3xl opacity-30 transition-transform duration-300 ease-out"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(245,158,11,0.18) 0%, rgba(245,158,11,0) 70%)'
            : 'radial-gradient(circle, rgba(217,119,6,0.15) 0%, rgba(217,119,6,0) 70%)',
          transform: 'translate3d(calc(var(--tilt-x) * -1.2), calc(var(--tilt-y) * -1.2), 0)',
        }}
      />

      <div
        className="absolute -bottom-32 left-1/4 w-96 h-96 sm:w-[500px] sm:h-[500px] rounded-full blur-3xl opacity-25 transition-transform duration-300 ease-out"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(16,185,129,0.16) 0%, rgba(16,185,129,0) 70%)'
            : 'radial-gradient(circle, rgba(5,150,105,0.12) 0%, rgba(5,150,105,0) 70%)',
          transform: 'translate3d(calc(var(--tilt-x) * 0.8), calc(var(--tilt-y) * 0.8), 0)',
        }}
      />

      {/* 3. Subtle Solar Photovoltaic Grid Pattern (Reacts subtly to motion) */}
      {style === 'grid' && (
        <div
          className="absolute inset-0 opacity-[0.035] dark:opacity-[0.06] transition-transform duration-300 ease-out"
          style={{
            backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
            transform: 'translate3d(calc(var(--tilt-x) * 0.4), calc(var(--tilt-y) * 0.4), 0)',
          }}
        />
      )}

      {/* 4. Lightweight Solar Energy Photon Particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
};
