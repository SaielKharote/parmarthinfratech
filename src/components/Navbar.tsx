import React, { useState } from 'react';
import { Sun, Moon, Menu, X, Phone, Instagram } from 'lucide-react';
import { BackgroundStyle, ThemeMode } from '../types';
import { Logo } from './Logo';

interface NavbarProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
  backgroundStyle: BackgroundStyle;
  onChangeBackgroundStyle: (style: BackgroundStyle) => void;
  onOpenQuoteModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  onToggleTheme,
  backgroundStyle,
  onChangeBackgroundStyle,
  onOpenQuoteModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isDark = theme === 'dark';

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors duration-200 border-b backdrop-blur-md ${
        isDark
          ? 'bg-slate-950/90 border-slate-800 text-slate-100'
          : 'bg-white/95 border-slate-200 text-slate-900 shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-6">
        {/* Zone 1: Authentic Brand Logo */}
        <a href="#" className="flex items-center gap-3 whitespace-nowrap shrink-0 focus:outline-none">
          <Logo showText={true} />
        </a>

        {/* Zone 2: Simple & Clear Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <a
            href="#subsidy"
            className="text-slate-300 hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
          >
            Solar Subsidy & Schemes
          </a>
          <a
            href="#calculator"
            className="text-slate-300 hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
          >
            Bill Savings Calculator
          </a>
          <a
            href="#instagram-feed"
            className="text-slate-300 hover:text-rose-400 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 flex items-center gap-1.5"
          >
            <Instagram className="w-3.5 h-3.5 text-rose-400" />
            <span>Instagram Feed</span>
          </a>
          <a
            href="#3d-twin"
            className="text-slate-300 hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
          >
            3D Equipment View
          </a>
          <a
            href="#solutions"
            className="text-slate-300 hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
          >
            Services
          </a>
          <a
            href="#projects"
            className="text-slate-300 hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
          >
            Projects
          </a>
        </nav>

        {/* Zone 3: Direct WhatsApp / Call + Theme Toggle + Quote CTA */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Instagram quick icon */}
          <a
            href="https://www.instagram.com/parmaarthinfratechpvt/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-semibold transition-colors"
            title="Follow @parmaarthinfratechpvt on Instagram"
          >
            <Instagram className="w-3.5 h-3.5" />
            <span>@parmaarthinfratechpvt</span>
          </a>

          {/* Quick WhatsApp button for Indian users */}
          <a
            href="https://wa.me/917666121210?text=Hello%20Parmaarth%20Infratech,%20I%20am%20interested%20in%20solar%20rooftop%20installation"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold transition-colors"
            title="Chat on WhatsApp"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>

          {/* Theme Mode Toggle */}
          <button
            onClick={onToggleTheme}
            className={`p-2 rounded-lg border transition-colors ${
              isDark
                ? 'bg-slate-900 border-slate-700 text-amber-400 hover:text-amber-300'
                : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
            }`}
            aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Primary Action Button */}
          <button
            onClick={onOpenQuoteModal}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors shadow-sm whitespace-nowrap shrink-0"
          >
            Get Free Quote
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950 px-4 py-4 space-y-3 animate-fade-in">
          <a
            href="#subsidy"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-300 hover:text-cyan-400 py-1"
          >
            Solar Subsidy (योजना)
          </a>
          <a
            href="#calculator"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-300 hover:text-cyan-400 py-1"
          >
            Bill Savings Calculator
          </a>
          <a
            href="#instagram-feed"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-rose-400 hover:text-rose-300 py-1 flex items-center gap-2"
          >
            <Instagram className="w-4 h-4" />
            <span>Live Instagram Feed (@parmaarthinfratechpvt)</span>
          </a>
          <a
            href="#3d-twin"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-300 hover:text-cyan-400 py-1"
          >
            3D Equipment View
          </a>
          <a
            href="#solutions"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-300 hover:text-cyan-400 py-1"
          >
            Services & Contracting
          </a>
          <a
            href="#projects"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-300 hover:text-cyan-400 py-1"
          >
            Notable Projects
          </a>

          <div className="pt-2 flex flex-col gap-2">
            <a
              href="https://www.instagram.com/parmaarthinfratechpvt/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white flex items-center justify-center gap-2"
            >
              <Instagram className="w-4 h-4" />
              <span>Follow @parmaarthinfratechpvt</span>
            </a>
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
              className="w-full py-2.5 text-xs font-semibold rounded-lg bg-cyan-500 text-slate-950"
            >
              Get Free Quote
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
