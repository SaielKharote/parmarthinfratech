import React, { useState, useEffect, useRef } from 'react';
import { ModelViewer } from './ModelViewer';
import { Box, Play, Sparkles } from 'lucide-react';
import { ThemeMode } from '../../types';

interface LazyModelViewerProps {
  initialModel: 'solar' | 'meter' | 'transformer' | 'ev';
  theme: ThemeMode;
  onExploreService?: (serviceId: string) => void;
}

export const LazyModelViewer: React.FC<LazyModelViewerProps> = ({
  initialModel,
  theme,
  onExploreService,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldRender3D, setShouldRender3D] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();

    // On desktop, auto-mount when within 250px of viewport
    if (window.innerWidth >= 768) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setShouldRender3D(true);
            observer.disconnect();
          }
        },
        { rootMargin: '250px' }
      );

      if (containerRef.current) {
        observer.observe(containerRef.current);
      }

      return () => observer.disconnect();
    }
  }, []);

  return (
    <div ref={containerRef} className="w-full min-h-[420px] sm:min-h-[520px]">
      {shouldRender3D ? (
        <ModelViewer
          initialModel={initialModel}
          theme={theme}
          onExploreService={onExploreService}
        />
      ) : (
        /* Mobile / Lazy Placeholder with instant activate button */
        <div className="w-full h-[420px] sm:h-[520px] rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900/90 via-slate-950 to-slate-900 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden group">
          {/* Background Ambient Glow */}
          <div className="absolute inset-0 bg-radial from-cyan-500/10 via-transparent to-transparent opacity-50 pointer-events-none" />

          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mb-4 shadow-lg shadow-cyan-500/10 group-hover:scale-110 transition-transform">
            <Box className="w-8 h-8" />
          </div>

          <div className="max-w-md space-y-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400">
              WebGL 3D Visualizer
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-100">
              Interactive 3D Equipment Inspection
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tap below to launch 360° interactive WebGL view of {initialModel === 'transformer' ? 'Substation Transformer' : initialModel === 'meter' ? 'Smart Meter (AMI)' : initialModel === 'solar' ? 'Solar Plant' : 'EV Fast Charger'}.
            </p>
          </div>

          <button
            onClick={() => setShouldRender3D(true)}
            className="mt-6 px-6 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/20"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>Activate 3D Inspector</span>
          </button>

          <div className="mt-4 text-[11px] text-slate-500 font-mono">
            Optimized for fast mobile performance & zero battery lag
          </div>
        </div>
      )}
    </div>
  );
};
