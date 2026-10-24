import React, { useState } from 'react';
import { Menu, X, Phone, Instagram } from 'lucide-react';
import { Logo } from './Logo';

interface NavbarProps {
  onOpenQuoteModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuoteModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b backdrop-blur-md bg-slate-950/90 border-slate-800 text-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-2 sm:gap-6">
        {/* Zone 1: Authentic Brand Logo */}
        <a href="#" className="flex items-center gap-2 sm:gap-3 whitespace-nowrap shrink-0 focus:outline-none">
          <Logo showText={true} />
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-6 text-sm font-medium">
          <a
            href="#divisions"
            className="text-slate-300 hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
          >
            Divisions
          </a>
          <a
            href="#services"
            className="text-slate-300 hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
          >
            Key Services
          </a>
          <a
            href="#projects"
            className="text-slate-300 hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
          >
            Projects
          </a>
          <a
            href="#3d-twin"
            className="text-slate-300 hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
          >
            3D Tech
          </a>
          <a
            href="#calculator"
            className="text-slate-300 hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
          >
            Solar Calculator
          </a>
          <a
            href="#instagram-feed"
            className="text-slate-300 hover:text-rose-400 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 flex items-center gap-1.5"
          >
            <Instagram className="w-3.5 h-3.5 text-rose-400" />
            <span>Field Photos</span>
          </a>
        </nav>

        {/* Zone 3: Direct Actions & Quote CTA */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Quick WhatsApp button */}
          <a
            href="https://wa.me/917666121210?text=Hello%20Parmaarth%20Infratech,%20we%20have%20an%20infrastructure%20and%20engineering%20requirement"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold transition-colors"
            title="Chat on WhatsApp"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>

          {/* Primary Action Button */}
          <button
            onClick={onOpenQuoteModal}
            className="px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs font-semibold rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors shadow-sm whitespace-nowrap shrink-0"
          >
            <span>Request RFP</span>
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 sm:p-2 rounded-lg text-slate-400 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950 px-4 py-4 space-y-3">
          <a
            href="#divisions"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-300 hover:text-cyan-400 py-1"
          >
            Three Core Divisions (Civil, Electrical, Renewable)
          </a>
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-300 hover:text-cyan-400 py-1"
          >
            Key Services (Civil, Roads, Electrical, AMI, Solar, O&M)
          </a>
          <a
            href="#projects"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-300 hover:text-cyan-400 py-1"
          >
            Notable Landmark Projects
          </a>
          <a
            href="#3d-twin"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-300 hover:text-cyan-400 py-1"
          >
            3D Equipment & Substation View
          </a>
          <a
            href="#calculator"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-300 hover:text-cyan-400 py-1"
          >
            Solar Savings & ROI Calculator
          </a>
          <a
            href="#instagram-feed"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-rose-400 hover:text-rose-300 py-1 flex items-center gap-2"
          >
            <Instagram className="w-4 h-4" />
            <span>Live Field Photos (@parmaarthinfratechpvt)</span>
          </a>

          <div className="pt-2 flex flex-col gap-2">
            <a
              href="https://wa.me/917666121210?text=Hello%20Parmaarth%20Infratech"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 text-xs font-semibold rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>WhatsApp: +91 76661 21210</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuoteModal();
              }}
              className="w-full py-2.5 text-xs font-semibold rounded-lg bg-cyan-500 text-slate-950 font-bold"
            >
              Request Project RFP
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
