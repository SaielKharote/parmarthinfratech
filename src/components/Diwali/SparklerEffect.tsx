import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  color: string;
  gravity: number;
  decay: number;
}

interface SparklerEffectProps {
  triggerCoords?: { x: number; y: number } | null;
  ambientMode?: boolean;
}

export const SparklerEffect: React.FC<SparklerEffectProps> = ({ 
  triggerCoords,
  ambientMode = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);

  // Spawn firework/sparkler burst at coordinates
  const spawnBurst = (x: number, y: number, count = 35) => {
    const colors = [
      '#F59E0B', // Amber Gold
      '#FCD34D', // Bright Yellow
      '#F97316', // Vibrant Orange
      '#FEF08A', // Light Spark Yellow
      '#EF4444', // Red-Orange fire
      '#FFFFFF', // White hot
    ];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4.5 + 1.2;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        size: Math.random() * 2.8 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        gravity: 0.04,
        decay: Math.random() * 0.02 + 0.012,
      });
    }
  };

  useEffect(() => {
    if (triggerCoords) {
      spawnBurst(triggerCoords.x, triggerCoords.y, 40);
    }
  }, [triggerCoords]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 400);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    let lastAmbientSpawn = 0;

    const render = (time: number) => {
      animId = requestAnimationFrame(render);
      ctx.clearRect(0, 0, width, height);

      // Ambient festive golden sparkles
      if (ambientMode && time - lastAmbientSpawn > 350) {
        lastAmbientSpawn = time;
        if (particlesRef.current.length < 50) {
          spawnBurst(Math.random() * width, Math.random() * height * 0.7, 4);
        }
      }

      // Update and draw sparkler particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.alpha -= p.decay;
        p.size *= 0.98;

        if (p.alpha <= 0 || p.size <= 0.3) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [ambientMode]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-20 w-full h-full overflow-hidden"
    />
  );
};
