import React from 'react';
import { X, CheckCircle, ShieldCheck } from 'lucide-react';
import { HotspotInfo, ThemeMode } from '../../types';

interface ComponentDetailModalProps {
  hotspot: HotspotInfo | null;
  onClose: () => void;
  theme: ThemeMode;
}

export const ComponentDetailModal: React.FC<ComponentDetailModalProps> = ({
  hotspot,
  onClose,
  theme,
}) => {
  if (!hotspot) return null;

  const isDark = theme === 'dark';

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className={`w-full max-w-lg rounded-2xl border p-6 shadow-2xl transition-all ${
          isDark
            ? 'bg-slate-900 border-slate-700 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="hotspot-modal-title"
      >
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-700/40">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-500">
              {hotspot.category}
            </span>
            <h3 id="hotspot-modal-title" className="text-xl font-bold font-heading mt-1 text-slate-100">
              {hotspot.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              isDark ? 'hover:bg-slate-800 text-slate-400 hover:text-white' : 'hover:bg-slate-100 text-slate-500'
            }`}
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className={`mt-4 text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          {hotspot.description}
        </p>

        <div className="mt-6">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Engineering Specifications & Standards
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {hotspot.techSpecs.map((spec, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg border text-xs ${
                  isDark
                    ? 'bg-slate-800/60 border-slate-700/60'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="text-slate-400 font-medium">{spec.label}</div>
                <div className="text-slate-100 font-mono font-semibold mt-1">
                  {spec.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-700/40 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <CheckCircle className="w-4 h-4 text-cyan-400" />
            <span>ISO 9001:2015 Execution Protocol</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium bg-cyan-500 text-slate-950 rounded-lg hover:bg-cyan-400 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
