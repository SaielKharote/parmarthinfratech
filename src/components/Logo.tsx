import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = 'w-8 h-8 sm:w-9 sm:h-9', showText = true }) => {
  return (
    <div className="flex items-center gap-2 sm:gap-2.5">
      {/* Authentic PIPL Emblem matching company identity */}
      <svg
        viewBox="0 0 100 120"
        className={`${className} shrink-0`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="PIPL Parmaarth Infratech Logo"
      >
        {/* Top Blue curve of 'P' */}
        <path
          d="M38 12 H62 C78 12 88 22 88 38 C88 52 78 62 62 62 H38 V12 Z"
          stroke="#1e40af"
          strokeWidth="14"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Orange Head Dot inside P */}
        <circle cx="60" cy="36" r="10" fill="#f97316" />
        {/* Lower Red curve flowing down */}
        <path
          d="M62 62 C46 62 38 72 38 88 V110"
          stroke="#dc2626"
          strokeWidth="14"
          strokeLinecap="round"
        />
        {/* Green lower upright stem for 'i' */}
        <rect x="52" y="76" width="14" height="34" rx="7" fill="#22c55e" />
      </svg>

      {showText && (
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-1.5 sm:gap-2 leading-none">
            <span className="font-heading font-extrabold text-base sm:text-xl tracking-tight text-slate-100">
              PIPL
            </span>
            <span className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-semibold border border-emerald-500/30 font-mono">
              SOLAR & EPC
            </span>
          </div>
          <span className="text-[9.5px] sm:text-[11px] font-medium text-slate-400 block tracking-tight leading-tight mt-0.5">
            Parmaarth Infratech Pvt. Ltd.
          </span>
        </div>
      )}
    </div>
  );
};
