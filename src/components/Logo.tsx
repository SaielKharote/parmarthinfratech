import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ 
  className = 'h-9 sm:h-10 w-auto', 
  showText = true 
}) => {
  return (
    <div className="flex items-center gap-2.5 sm:gap-3">
      {/* Official Registered Company Trademark Logo */}
      <img
        src="/assets/logo_transparent.png"
        alt="Parmaarth Infratech Pvt. Ltd. (PIPL) Logo"
        className={`${className} shrink-0 object-contain drop-shadow-sm`}
      />

      {showText && (
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-1.5 sm:gap-2 leading-none">
            <span className="font-heading font-extrabold text-base sm:text-xl tracking-tight text-slate-100">
              PIPL
            </span>
            <span className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30 font-mono">
              INFRA & EPC
            </span>
          </div>
          <span className="text-[9.5px] sm:text-[11px] font-semibold text-slate-300 block tracking-tight leading-tight mt-0.5 whitespace-nowrap">
            Parmaarth Infratech Pvt. Ltd.
          </span>
        </div>
      )}
    </div>
  );
};
