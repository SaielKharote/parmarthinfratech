import React from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  RotateCcw, 
  Sliders, 
  Layers, 
  Maximize2
} from 'lucide-react';
import { ThemeMode } from '../../types';

interface ModelDockProps {
  modelType: 'solar' | 'meter' | 'transformer' | 'ev';
  onSelectModel: (type: 'solar' | 'meter' | 'transformer' | 'ev') => void;
  explodedValue: number;
  onExplodedChange: (val: number) => void;
  isWireframe: boolean;
  onToggleWireframe: () => void;
  autoRotate: boolean;
  onToggleAutoRotate: () => void;
  onResetCamera: () => void;
  lightingPreset: 'daylight' | 'cyber' | 'sunset';
  onSelectLighting: (preset: 'daylight' | 'cyber' | 'sunset') => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  theme: ThemeMode;
}

export const ModelDock: React.FC<ModelDockProps> = ({
  explodedValue,
  onExplodedChange,
  isWireframe,
  onToggleWireframe,
  autoRotate,
  onToggleAutoRotate,
  onResetCamera,
  lightingPreset,
  onSelectLighting,
  isCollapsed,
  onToggleCollapse,
  theme,
}) => {
  const isDark = theme === 'dark';

  return (
    <div
      className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-xl z-30 transition-transform duration-300 ease-out select-none"
      style={{
        transform: isCollapsed ? 'translate(-50%, calc(100% - 32px))' : 'translate(-50%, 0)',
      }}
    >
      {/* Collapse / Expand Tab Button */}
      <div className="flex justify-center mb-1">
        <button
          onClick={onToggleCollapse}
          className={`flex items-center gap-1.5 px-3 py-1 text-[11px] font-medium rounded-t-lg border border-b-0 shadow-sm transition-colors ${
            isDark 
              ? 'bg-slate-900/95 text-slate-300 border-slate-700/80 hover:text-white' 
              : 'bg-white/95 text-slate-700 border-slate-300 hover:text-slate-950'
          }`}
          aria-expanded={!isCollapsed}
          aria-label={isCollapsed ? 'Show 3D Controls' : 'Hide 3D Controls'}
        >
          {isCollapsed ? (
            <>
              <ChevronUp className="w-3.5 h-3.5 text-cyan-400" />
              <span>Show Controls</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5 text-cyan-400" />
              <span>Hide Controls (Zen View)</span>
            </>
          )}
        </button>
      </div>

      {/* Main Glassmorphic Dock Container */}
      <div
        className={`px-4 py-3 rounded-2xl border shadow-2xl backdrop-blur-md transition-colors ${
          isDark
            ? 'bg-slate-900/95 border-slate-700/80 text-slate-200'
            : 'bg-white/95 border-slate-200 text-slate-800'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          {/* Exploded Assembly Slider */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Sliders className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="font-medium whitespace-nowrap text-[11px]">Exploded:</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={explodedValue}
              onChange={(e) => onExplodedChange(parseFloat(e.target.value))}
              className="flex-1 sm:w-28 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              aria-label="Exploded assembly slider"
            />
            <span className="font-mono text-cyan-400 w-7 text-right text-[11px]">
              {Math.round(explodedValue * 100)}%
            </span>
          </div>

          {/* Controls Cluster */}
          <div className="flex items-center gap-2 justify-end w-full sm:w-auto flex-wrap">
            {/* Wireframe CAD mode */}
            <button
              onClick={onToggleWireframe}
              className={`flex items-center gap-1 px-2 py-1 rounded-lg border text-[11px] font-medium transition-colors ${
                isWireframe
                  ? 'bg-cyan-950/80 border-cyan-500 text-cyan-300'
                  : isDark
                  ? 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-600'
                  : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
              }`}
              title="Toggle Wireframe CAD Mode"
            >
              <Layers className="w-3 h-3" />
              <span>{isWireframe ? 'Wire' : 'Solid'}</span>
            </button>

            {/* Auto Orbit */}
            <button
              onClick={onToggleAutoRotate}
              className={`flex items-center gap-1 px-2 py-1 rounded-lg border text-[11px] font-medium transition-colors ${
                autoRotate
                  ? 'bg-cyan-950/80 border-cyan-500 text-cyan-300'
                  : isDark
                  ? 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-600'
                  : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Maximize2 className="w-3 h-3" />
              <span>{autoRotate ? 'Orbit: ON' : 'Orbit: OFF'}</span>
            </button>

            {/* Lighting Presets */}
            <div className="flex items-center gap-0.5 p-0.5 rounded-lg bg-slate-800/60 border border-slate-700/60">
              <button
                onClick={() => onSelectLighting('daylight')}
                className={`px-1.5 py-0.5 rounded text-[10px] font-medium transition-colors ${
                  lightingPreset === 'daylight'
                    ? 'bg-slate-600 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Studio Daylight"
              >
                Day
              </button>
              <button
                onClick={() => onSelectLighting('cyber')}
                className={`px-1.5 py-0.5 rounded text-[10px] font-medium transition-colors ${
                  lightingPreset === 'cyber'
                    ? 'bg-cyan-500 text-slate-950'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Cyber Obsidian"
              >
                Cyber
              </button>
              <button
                onClick={() => onSelectLighting('sunset')}
                className={`px-1.5 py-0.5 rounded text-[10px] font-medium transition-colors ${
                  lightingPreset === 'sunset'
                    ? 'bg-amber-500 text-slate-950'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Sunset Gold"
              >
                Gold
              </button>
            </div>

            {/* Reset Camera */}
            <button
              onClick={onResetCamera}
              className={`p-1.5 rounded-lg border transition-colors ${
                isDark
                  ? 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-white'
                  : 'bg-slate-100 border-slate-300 text-slate-600 hover:text-slate-950'
              }`}
              title="Reset Camera Orientation"
              aria-label="Reset Camera"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
