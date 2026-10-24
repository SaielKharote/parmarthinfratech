import React, { useState, useMemo } from 'react';
import { calculateEnergyROI } from '../utils/calculator';
import { CalculationInput, ThemeMode } from '../types';
import { 
  TrendingDown, 
  Clock, 
  ArrowRight,
  Phone,
  Home,
  Building,
  Factory
} from 'lucide-react';

interface EnergyCalculatorProps {
  theme: ThemeMode;
  onOpenQuoteWithDetails: (notes: string) => void;
}

export const EnergyCalculator: React.FC<EnergyCalculatorProps> = ({
  onOpenQuoteWithDetails,
}) => {
  // Simple customer category
  const [customerType, setCustomerType] = useState<'home' | 'society' | 'factory'>('home');
  const [monthlyBill, setMonthlyBill] = useState<number>(4500);

  // Map to calculation inputs
  const calculationInput: CalculationInput = useMemo(() => {
    if (customerType === 'home') {
      const load = Math.max(1, Math.round(monthlyBill / 1200));
      return {
        sector: 'chs',
        schemeType: 'rooftop-epc',
        monthlyBillINR: monthlyBill,
        connectedLoadKW: load,
      };
    } else if (customerType === 'society') {
      const load = Math.max(10, Math.round(monthlyBill / 900));
      return {
        sector: 'chs',
        schemeType: 'vnm',
        monthlyBillINR: monthlyBill,
        connectedLoadKW: load,
      };
    } else {
      const load = Math.max(50, Math.round(monthlyBill / 850));
      return {
        sector: 'industrial',
        schemeType: 'open-access',
        monthlyBillINR: monthlyBill,
        connectedLoadKW: load,
      };
    }
  }, [customerType, monthlyBill]);

  const results = useMemo(() => calculateEnergyROI(calculationInput), [calculationInput]);

  // Estimated Government Subsidy amount
  const estimatedSubsidy = useMemo(() => {
    if (customerType === 'home') {
      if (results.recommendedCapacityKW <= 1) return 30000;
      if (results.recommendedCapacityKW === 2) return 60000;
      return 78000; // Max PM Surya Ghar residential subsidy
    }
    return 0; // Commercial/Society has custom tax/VNM benefit
  }, [customerType, results.recommendedCapacityKW]);

  const handleRequestSiteVisit = () => {
    const summary = `Site Visit Request: Type: ${customerType.toUpperCase()}, Monthly Bill: ₹${monthlyBill.toLocaleString()}, Recommended: ${results.recommendedCapacityKW} kW, Estimated Monthly Savings: ₹${results.monthlySavingsINR.toLocaleString()}.`;
    onOpenQuoteWithDetails(summary);
  };

  return (
    <section id="calculator" className="py-14 md:py-24 border-t border-slate-800/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Simple Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-semibold font-mono tracking-wider uppercase text-emerald-400">
            Instant Solar Sizing Estimate
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-100 mt-2">
            Calculate Your Solar Bill Savings
          </h2>
          <p className="mt-2.5 sm:mt-3 text-slate-300 text-xs sm:text-base leading-relaxed">
            Find out how much you can save every month and how much government subsidy you can receive under PM Surya Ghar Yojana.
          </p>
        </div>

        {/* 2-Column Calculator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Left Column: Simple Inputs */}
          <div className="lg:col-span-5 p-4 sm:p-8 rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-md flex flex-col justify-between">
            <div className="space-y-5 sm:space-y-6">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2 sm:mb-2.5">
                  1. Where do you want to install Solar?
                </label>
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                  <button
                    onClick={() => {
                      setCustomerType('home');
                      setMonthlyBill(3500);
                    }}
                    className={`p-2.5 sm:p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1 sm:gap-1.5 ${
                      customerType === 'home'
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Home className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-[11px] sm:text-xs font-medium">Home / Flat</span>
                  </button>

                  <button
                    onClick={() => {
                      setCustomerType('society');
                      setMonthlyBill(45000);
                    }}
                    className={`p-2.5 sm:p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1 sm:gap-1.5 ${
                      customerType === 'society'
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Building className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-[11px] sm:text-xs font-medium">Society</span>
                  </button>

                  <button
                    onClick={() => {
                      setCustomerType('factory');
                      setMonthlyBill(150000);
                    }}
                    className={`p-2.5 sm:p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1 sm:gap-1.5 ${
                      customerType === 'factory'
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Factory className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-[11px] sm:text-xs font-medium">Factory / C&I</span>
                  </button>
                </div>
              </div>

              {/* Monthly Bill Input */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="bill-range" className="text-xs font-semibold text-slate-300">
                    2. Monthly Electricity Bill
                  </label>
                  <span className="font-mono text-emerald-400 font-extrabold text-base">
                    <span className="font-sans mr-0.5">₹</span>{monthlyBill.toLocaleString()}
                  </span>
                </div>

                <input
                  id="bill-range"
                  type="range"
                  min={customerType === 'home' ? 1000 : customerType === 'society' ? 10000 : 30000}
                  max={customerType === 'home' ? 15000 : customerType === 'society' ? 150000 : 1000000}
                  step={customerType === 'home' ? 500 : 5000}
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(parseInt(e.target.value) || 1000)}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />

                <div className="flex justify-between text-[10px] sm:text-[11px] text-slate-500 font-mono mt-1.5">
                  <span>
                    <span className="font-sans">₹</span>
                    {customerType === 'home' ? '1,000' : customerType === 'society' ? '10,000' : '30,000'}
                  </span>
                  <span>
                    <span className="font-sans">₹</span>
                    {customerType === 'home' ? '15,000' : customerType === 'society' ? '1,50,000' : '10,00,000+'}
                  </span>
                </div>
              </div>

              {/* Quick Bill Helper Buttons for Indian Consumers */}
              <div>
                <div className="text-[10px] sm:text-[11px] text-slate-400 mb-1.5 font-medium">Quick Select Bill:</div>
                <div className="flex flex-wrap gap-1.5">
                  {(customerType === 'home' 
                    ? [2000, 3500, 5000, 8000]
                    : customerType === 'society'
                    ? [25000, 50000, 75000, 100000]
                    : [50000, 150000, 300000, 500000]
                  ).map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setMonthlyBill(amt)}
                      className={`px-2 sm:px-2.5 py-1 rounded-lg text-xs font-mono border transition-colors ${
                        monthlyBill === amt
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span className="font-sans">₹</span>{amt.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 sm:mt-8 pt-4 border-t border-slate-800 text-[11px] sm:text-xs text-slate-400 leading-relaxed">
              💡 <strong>Tip:</strong> In Maharashtra, an average 1 kW solar plant produces ~120-130 units of electricity every month, saving up to ₹1,100 - ₹1,400 monthly.
            </div>
          </div>

          {/* Right Column: Clear, Simple Savings Card */}
          <div className="lg:col-span-7 p-4 sm:p-8 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-md flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 sm:pb-6 border-b border-slate-800 gap-3">
                <div>
                  <span className="text-[11px] sm:text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                    Your Estimated Savings & Benefits
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-100 mt-1">
                    Solar System Sizing
                  </h3>
                </div>
                <div className="p-2.5 sm:p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 sm:text-right flex sm:flex-col items-center sm:items-end justify-between sm:justify-start">
                  <div className="text-xl sm:text-2xl font-extrabold font-mono text-emerald-400">
                    {results.recommendedCapacityKW} kW
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-slate-300">
                    Recommended Solar Plant
                  </div>
                </div>
              </div>

              {/* Prominent Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 my-5 sm:my-6">
                <div className="p-3.5 sm:p-4 rounded-2xl border border-emerald-500/30 bg-emerald-950/20">
                  <div className="flex items-center gap-2 text-slate-300 text-xs font-semibold mb-1">
                    <TrendingDown className="w-4 h-4 text-emerald-400" />
                    <span>Estimated Monthly Savings</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400">
                    <span className="font-sans mr-0.5">₹</span>{results.monthlySavingsINR.toLocaleString()}
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-400 mt-1">
                    ~<span className="font-sans">₹</span>{results.estimatedAnnualSavingsINR.toLocaleString()} saved every year
                  </div>
                </div>

                <div className="p-3.5 sm:p-4 rounded-2xl border border-slate-800 bg-slate-950/60">
                  <div className="flex items-center gap-2 text-slate-300 text-xs font-semibold mb-1">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>Payback Period</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-400">
                    {results.paybackYears} Years
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-400 mt-1">
                    After payback, solar power is completely free for 20+ years!
                  </div>
                </div>
              </div>

              {/* Government Subsidy Callout for Homes */}
              {customerType === 'home' && (
                <div className="p-3.5 sm:p-4 rounded-2xl border border-blue-500/30 bg-blue-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 mb-4">
                  <div>
                    <span className="text-[11px] sm:text-xs font-bold text-blue-300 uppercase block">
                      PM Surya Ghar: Muft Bijli Yojana
                    </span>
                    <div className="text-[11px] sm:text-xs text-slate-300 mt-0.5">
                      Direct DBT Government Subsidy credited to your bank account.
                    </div>
                  </div>
                  <div className="sm:text-right shrink-0 flex sm:flex-col items-baseline sm:items-end justify-between sm:justify-start">
                    <div className="text-base sm:text-lg font-bold font-mono text-emerald-400">
                      Up to <span className="font-sans">₹</span>{estimatedSubsidy.toLocaleString()}
                    </div>
                    <span className="text-[10px] text-slate-400">Subsidy by Govt</span>
                  </div>
                </div>
              )}

              {/* Society / Factory Note */}
              {customerType !== 'home' && (
                <div className="p-3.5 sm:p-4 rounded-2xl border border-cyan-500/20 bg-cyan-950/20 text-xs text-cyan-200">
                  <strong>Society & Commercial Benefits: </strong>
                  Virtual Net Metering allows individual flat owners to receive solar bill credits. For factories, Green Open Access provides ~40% cheaper power without factory roof space.
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <a
                href={`https://wa.me/917666121210?text=Hello%20PIPL,%20my%20monthly%20electricity%20bill%20is%20Rs%20${monthlyBill},%20please%20send%20me%20a%20solar%20estimate`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Send on WhatsApp</span>
              </a>

              <button
                onClick={handleRequestSiteVisit}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
              >
                <span>Book Free Site Visit & Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
