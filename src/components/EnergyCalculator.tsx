import React, { useState, useMemo } from 'react';
import { calculateEnergyROI, calculateBessROI } from '../utils/calculator';
import { CalculationInput, BessCalculationInput, ThemeMode } from '../types';
import { 
  TrendingDown, 
  Clock, 
  ArrowRight,
  Phone,
  Home,
  Building,
  Factory,
  BatteryCharging,
  Sun,
  Info,
  ChevronDown,
  ChevronUp,
  Fuel,
  Sparkles,
  Zap,
  Sliders
} from 'lucide-react';

interface EnergyCalculatorProps {
  theme?: ThemeMode;
  onOpenQuoteWithDetails: (notes: string) => void;
  onOpenBessStudy?: (bessData: {
    powerKW: number;
    capacityKWh: number;
    backupHours: number;
    application: string;
    facilityPeakKW: number;
  }) => void;
}

export const EnergyCalculator: React.FC<EnergyCalculatorProps> = ({
  onOpenQuoteWithDetails,
  onOpenBessStudy,
}) => {
  // Calculator Mode: Solar vs BESS
  const [calculatorMode, setCalculatorMode] = useState<'solar' | 'bess'>('solar');

  // SOLAR STATES
  const [customerType, setCustomerType] = useState<'home' | 'society' | 'factory'>('factory');
  const [monthlyBill, setMonthlyBill] = useState<number>(150000);
  const [showAssumptionsModal, setShowAssumptionsModal] = useState<boolean>(true);

  // BESS STATES
  const [bessPeakLoadKW, setBessPeakLoadKW] = useState<number>(300);
  const [bessDurationHours, setBessDurationHours] = useState<number>(2);
  const [bessApplication, setBessApplication] = useState<
    'tod-peak-shaving' | 'solar-arbitrage' | 'dg-displacement' | 'critical-backup'
  >('tod-peak-shaving');

  // Map to Solar calculation inputs
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

  const solarResults = useMemo(() => calculateEnergyROI(calculationInput), [calculationInput]);

  // Estimated Government Subsidy amount (PM Surya Ghar)
  const estimatedSubsidy = useMemo(() => {
    if (customerType === 'home') {
      if (solarResults.recommendedCapacityKW <= 1) return 30000;
      if (solarResults.recommendedCapacityKW === 2) return 60000;
      return 78000; // Max PM Surya Ghar residential subsidy
    }
    return 0; // Commercial/Society has custom tax/VNM benefit
  }, [customerType, solarResults.recommendedCapacityKW]);

  // BESS calculation inputs
  const bessInput: BessCalculationInput = useMemo(() => ({
    peakLoadKW: bessPeakLoadKW,
    backupHours: bessDurationHours,
    application: bessApplication,
  }), [bessPeakLoadKW, bessDurationHours, bessApplication]);

  const bessResults = useMemo(() => calculateBessROI(bessInput), [bessInput]);

  const handleRequestSiteVisit = () => {
    const summary = `Site Visit Request: Type: ${customerType.toUpperCase()}, Monthly Bill: ₹${monthlyBill.toLocaleString()}, Recommended: ${solarResults.recommendedCapacityKW} kW, Estimated Monthly Savings: ₹${solarResults.monthlySavingsINR.toLocaleString()}. (Indicative estimate based on MSEDCL tariff ₹${solarResults.tariffPerKWh}/kWh).`;
    onOpenQuoteWithDetails(summary);
  };

  const handleBessInquiry = () => {
    if (onOpenBessStudy) {
      onOpenBessStudy({
        powerKW: bessResults.ratedPowerKW,
        capacityKWh: bessResults.storageCapacityKWh,
        backupHours: bessDurationHours,
        application: bessApplication,
        facilityPeakKW: bessPeakLoadKW,
      });
    } else {
      const bessNotes = `BESS Feasibility Study: Peak Load: ${bessPeakLoadKW} kW, Sized Power: ${bessResults.ratedPowerKW} kW, Storage: ${bessResults.storageCapacityKWh} kWh, Duration: ${bessDurationHours} hrs, Focus: ${bessApplication}, Est Capex: ₹${bessResults.estimatedCapexINR.toLocaleString()}, Est Monthly Savings: ₹${bessResults.estimatedMonthlySavingsINR.toLocaleString()}.`;
      onOpenQuoteWithDetails(bessNotes);
    }
  };

  return (
    <section id="calculator" className="py-14 md:py-24 border-t border-slate-800/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Mode Switcher */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
            <Sliders className="w-3.5 h-3.5" />
            <span>Interactive Techno-Economic Sizing Tool</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-100">
            Energy & Storage Sizing Calculator
          </h2>
          <p className="mt-2.5 sm:mt-3 text-slate-300 text-xs sm:text-base leading-relaxed">
            Estimate solar generation, PM Surya Ghar subsidy, or size high-performance Battery Energy Storage Systems (BESS) with transparent engineering assumptions.
          </p>

          {/* Mode Switcher Tabs */}
          <div className="mt-6 inline-flex p-1.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg">
            <button
              onClick={() => setCalculatorMode('solar')}
              className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                calculatorMode === 'solar'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sun className="w-4 h-4" />
              <span>Solar PV Savings Calculator</span>
            </button>
            <button
              onClick={() => setCalculatorMode('bess')}
              className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                calculatorMode === 'bess'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BatteryCharging className="w-4 h-4" />
              <span>BESS Battery Storage Sizing</span>
            </button>
          </div>
        </div>

        {/* -------------------- 1. SOLAR CALCULATOR VIEW -------------------- */}
        {calculatorMode === 'solar' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
              {/* Left Column: Inputs */}
              <div className="lg:col-span-5 p-4 sm:p-8 rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-md flex flex-col justify-between">
                <div className="space-y-5 sm:space-y-6">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2 sm:mb-2.5">
                      1. Facility / Consumer Category
                    </label>
                    <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                      <button
                        onClick={() => {
                          setCustomerType('factory');
                          setMonthlyBill(150000);
                        }}
                        className={`p-2.5 sm:p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1 sm:gap-1.5 ${
                          customerType === 'factory'
                            ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                            : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        <Factory className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-[11px] sm:text-xs font-medium">Factory / C&I</span>
                      </button>

                      <button
                        onClick={() => {
                          setCustomerType('society');
                          setMonthlyBill(45000);
                        }}
                        className={`p-2.5 sm:p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1 sm:gap-1.5 ${
                          customerType === 'society'
                            ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                            : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        <Building className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-[11px] sm:text-xs font-medium">Housing Society</span>
                      </button>

                      <button
                        onClick={() => {
                          setCustomerType('home');
                          setMonthlyBill(3500);
                        }}
                        className={`p-2.5 sm:p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1 sm:gap-1.5 ${
                          customerType === 'home'
                            ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                            : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        <Home className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-[11px] sm:text-xs font-medium">Home / Flat</span>
                      </button>
                    </div>
                  </div>

                  {/* Monthly Bill Input */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label htmlFor="bill-range" className="text-xs font-semibold text-slate-300">
                        2. Monthly Electricity Bill (MSEDCL / Utility)
                      </label>
                      <span className="font-mono text-amber-400 font-extrabold text-base">
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
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
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

                  {/* Quick Select Buttons */}
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
                              ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
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
                  💡 <strong>Engineering Note:</strong> In Western Maharashtra (Pune / MIDC belts), a 1 kWp solar plant yields ~1,480 kWh/year (~4.05 peak sun hours/day).
                </div>
              </div>

              {/* Right Column: Output Card */}
              <div className="lg:col-span-7 p-4 sm:p-8 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-md flex flex-col justify-between">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 sm:pb-6 border-b border-slate-800 gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] sm:text-xs font-semibold text-amber-400 uppercase tracking-wider">
                          Solar Sizing & Financial Model
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-[10px] font-mono text-amber-300">
                          Indicative Estimate
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-100 mt-1">
                        Recommended System
                      </h3>
                    </div>
                    <div className="p-2.5 sm:p-3 rounded-2xl bg-amber-950/40 border border-amber-500/30 sm:text-right flex sm:flex-col items-center sm:items-end justify-between sm:justify-start">
                      <div className="text-xl sm:text-2xl font-extrabold font-mono text-amber-400">
                        {solarResults.recommendedCapacityKW} kW
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-slate-300">
                        Recommended Solar Plant
                      </div>
                    </div>
                  </div>

                  {/* Metric Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 my-5 sm:my-6">
                    <div className="p-3.5 sm:p-4 rounded-2xl border border-amber-500/30 bg-amber-950/20">
                      <div className="flex items-center gap-2 text-slate-300 text-xs font-semibold mb-1">
                        <TrendingDown className="w-4 h-4 text-amber-400" />
                        <span>Estimated Monthly Savings</span>
                      </div>
                      <div className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-400">
                        <span className="font-sans mr-0.5">₹</span>{solarResults.monthlySavingsINR.toLocaleString()}
                      </div>
                      <div className="text-[11px] sm:text-xs text-slate-400 mt-1">
                        ~<span className="font-sans">₹</span>{solarResults.estimatedAnnualSavingsINR.toLocaleString()} saved every year
                      </div>
                    </div>

                    <div className="p-3.5 sm:p-4 rounded-2xl border border-slate-800 bg-slate-950/60">
                      <div className="flex items-center gap-2 text-slate-300 text-xs font-semibold mb-1">
                        <Clock className="w-4 h-4 text-emerald-400" />
                        <span>Payback Period</span>
                      </div>
                      <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400">
                        {solarResults.paybackYears} Years
                      </div>
                      <div className="text-[11px] sm:text-xs text-slate-400 mt-1">
                        Tier-1 panels warrantied for 25 years with linear degradation guarantee.
                      </div>
                    </div>
                  </div>

                  {/* Residential PM Surya Ghar Subsidy Banner */}
                  {customerType === 'home' && (
                    <div className="p-3.5 sm:p-4 rounded-2xl border border-blue-500/30 bg-blue-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 mb-4">
                      <div>
                        <span className="text-[11px] sm:text-xs font-bold text-blue-300 uppercase block">
                          PM Surya Ghar: Muft Bijli Yojana
                        </span>
                        <div className="text-[11px] sm:text-xs text-slate-300 mt-0.5">
                          Direct DBT Government Subsidy credited to consumer bank account.
                        </div>
                      </div>
                      <div className="sm:text-right shrink-0 flex sm:flex-col items-baseline sm:items-end justify-between sm:justify-start">
                        <div className="text-base sm:text-lg font-bold font-mono text-emerald-400">
                          Up to <span className="font-sans">₹</span>{estimatedSubsidy.toLocaleString()}
                        </div>
                        <span className="text-[10px] text-slate-400">Subsidy by Govt of India</span>
                      </div>
                    </div>
                  )}

                  {/* Factory / Society Green Energy Context */}
                  {customerType !== 'home' && (
                    <div className="p-3.5 sm:p-4 rounded-2xl border border-slate-800 bg-slate-950/70 text-xs text-slate-300 space-y-1">
                      <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Green Open Access & VNM Regulatory Framework</span>
                      </div>
                      <p className="text-[11px] leading-relaxed text-slate-400">
                        Under Ministry of Power Green Energy Open Access (GEOA) Rules 2022, industrial consumers with connected load &ge;100 kW can procure captive solar power without using factory roof space. Housing societies benefit from MSEDCL Virtual Net Metering (VNM) regulations.
                      </p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <a
                    href={`https://wa.me/919359543323?text=Hello%20PIPL,%20my%20monthly%20electricity%20bill%20is%20Rs%20${monthlyBill},%20please%20send%20me%20a%20solar%20estimate`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Send on WhatsApp</span>
                  </a>

                  <button
                    onClick={handleRequestSiteVisit}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
                  >
                    <span>Book Free Site Visit & Detailed Proposal</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Transparent Engineering Assumptions & Methodology Accordion */}
            <div className="p-4 sm:p-6 rounded-3xl border border-slate-800 bg-slate-900/40">
              <button
                onClick={() => setShowAssumptionsModal(!showAssumptionsModal)}
                className="w-full flex items-center justify-between text-left text-xs sm:text-sm font-semibold text-slate-200"
              >
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Transparent Assumptions & Regulatory Basis Behind This Solar Estimate</span>
                </div>
                {showAssumptionsModal ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>

              {showAssumptionsModal && (
                <div className="mt-4 pt-4 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/60">
                    <span className="font-mono text-cyan-400 font-bold block mb-1">
                      1. Utility Grid Tariff (MSEDCL)
                    </span>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Assumed average retail energy charge is <strong>₹{solarResults.tariffPerKWh}/kWh</strong> (C&I ~₹9.80/kWh, CHS ~₹8.20/kWh, Commercial ~₹11.50/kWh) based on prevailing Maharashtra Electricity Regulatory Commission (MERC) tariff orders.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/60">
                    <span className="font-mono text-amber-400 font-bold block mb-1">
                      2. Specific Yield & Generation
                    </span>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Solar specific yield is modelled at <strong>1,480 kWh / kWp / year</strong> (~4.05 peak sun hours/day in Western Maharashtra/Pune). Uses Tier-1 Mono PERC or TOPCon bifacial modules at 0.5% annual degradation.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/60">
                    <span className="font-mono text-emerald-400 font-bold block mb-1">
                      3. Green Open Access & Demand Charges
                    </span>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Eligible for connected loads &ge;100 kW. Landed green power cost is ~<strong>₹5.10/kWh</strong> delivered vs ~₹9.80/kWh grid tariff (~48% lower energy charge). Fixed demand charges (~₹450/kVA) remain with the utility unless shaved via BESS.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* -------------------- 2. BESS BATTERY STORAGE CALCULATOR VIEW -------------------- */}
        {calculatorMode === 'bess' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
              {/* Left Column: Sizing Sliders */}
              <div className="lg:col-span-5 p-4 sm:p-8 rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-md flex flex-col justify-between">
                <div className="space-y-6">
                  {/* Peak Load Slider */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label htmlFor="bess-load-range" className="text-xs font-semibold text-slate-300">
                        1. Facility Peak Load / Connected Demand
                      </label>
                      <span className="font-mono text-cyan-400 font-extrabold text-base">
                        {bessPeakLoadKW} kW
                      </span>
                    </div>

                    <input
                      id="bess-load-range"
                      type="range"
                      min={50}
                      max={2000}
                      step={25}
                      value={bessPeakLoadKW}
                      onChange={(e) => setBessPeakLoadKW(parseInt(e.target.value) || 50)}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                    />

                    <div className="flex justify-between text-[10px] sm:text-[11px] text-slate-500 font-mono mt-1.5">
                      <span>50 kW</span>
                      <span>500 kW</span>
                      <span>1,000 kW</span>
                      <span>2,000 kW (2 MW)</span>
                    </div>
                  </div>

                  {/* Target Backup Duration */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      2. Target Backup / Discharge Duration
                    </label>
                    <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                      {[
                        { hours: 1, label: '1 Hour', sub: '1C Rapid' },
                        { hours: 2, label: '2 Hours', sub: '0.5C Standard' },
                        { hours: 4, label: '4 Hours', sub: '0.25C Shift' },
                        { hours: 6, label: '6 Hours', sub: '0.16C Deep' },
                      ].map((item) => (
                        <button
                          key={item.hours}
                          onClick={() => setBessDurationHours(item.hours)}
                          className={`p-2 sm:p-2.5 rounded-xl border text-center transition-all flex flex-col items-center ${
                            bessDurationHours === item.hours
                              ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 font-bold'
                              : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          <span className="text-xs font-bold">{item.label}</span>
                          <span className="text-[10px] opacity-75">{item.sub}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sizing Objective Application Pattern */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      3. Operational Use Case / Objective
                    </label>
                    <div className="space-y-2">
                      {[
                        {
                          id: 'tod-peak-shaving' as const,
                          title: 'Time-of-Day (TOD) Peak & Demand Shaving',
                          desc: 'Discharge during 18:00–22:00 peak surcharge hours (+₹2.10/unit) and cut maximum demand charges.',
                        },
                        {
                          id: 'solar-arbitrage' as const,
                          title: 'Solar Self-Consumption & Arbitrage',
                          desc: 'Store surplus daytime solar (~₹2.60/kWh) and discharge during peak grid hours (displacing ₹10.20/kWh grid).',
                        },
                        {
                          id: 'dg-displacement' as const,
                          title: 'Diesel Generator (DG) Displacement',
                          desc: 'Replace costly diesel power (₹29/kWh) with clean LFP battery power (₹8.20/kWh levelized cost).',
                        },
                        {
                          id: 'critical-backup' as const,
                          title: 'Critical Industrial Microgrid & UPS',
                          desc: 'Sub-cycle (<20ms) instantaneous transfer preventing assembly-line scrap during utility trips.',
                        },
                      ].map((item) => (
                        <div
                          key={item.id}
                          onClick={() => setBessApplication(item.id)}
                          className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                            bessApplication === item.id
                              ? 'bg-cyan-950/40 border-cyan-500 text-slate-100'
                              : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-200">{item.title}</span>
                            <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                              bessApplication === item.id ? 'border-cyan-400 bg-cyan-400' : 'border-slate-600'
                            }`}>
                              {bessApplication === item.id && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                            </div>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-400 leading-relaxed">
                  🔋 <strong>Storage Distinction:</strong> Power (kW/MW) defines peak discharge speed; Energy (kWh/MWh) defines how many hours that discharge can be maintained.
                </div>
              </div>

              {/* Right Column: BESS Output Metrics */}
              <div className="lg:col-span-7 p-4 sm:p-8 rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-slate-900/95 via-cyan-950/20 to-slate-950/95 backdrop-blur-md flex flex-col justify-between shadow-2xl shadow-cyan-500/5">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 sm:pb-6 border-b border-slate-800 gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] sm:text-xs font-semibold text-cyan-400 uppercase tracking-wider font-mono">
                          BESS Sizing Architecture
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[10px] font-mono text-cyan-300">
                          Indicative Sizing
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-100 mt-1">
                        Sized Battery System
                      </h3>
                    </div>

                    <div className="p-2.5 sm:p-3 rounded-2xl bg-cyan-950/50 border border-cyan-500/40 sm:text-right flex sm:flex-col items-center sm:items-end justify-between sm:justify-start">
                      <div className="text-xl sm:text-2xl font-extrabold font-mono text-cyan-400">
                        {bessResults.ratedPowerKW} kW / {bessResults.storageCapacityKWh} kWh
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-slate-300">
                        {bessResults.ratedPowerMW} MW / {bessResults.storageCapacityMWh} MWh ({bessResults.cRate})
                      </div>
                    </div>
                  </div>

                  {/* Rigorous Power vs Energy Metric Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 my-5 sm:my-6">
                    <div className="p-3.5 sm:p-4 rounded-2xl border border-cyan-500/30 bg-cyan-950/30">
                      <div className="flex items-center gap-2 text-slate-300 text-xs font-semibold mb-1">
                        <Zap className="w-4 h-4 text-cyan-400" />
                        <span>Inverter / PCS Power Rating</span>
                      </div>
                      <div className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-400">
                        {bessResults.ratedPowerKW} kW
                      </div>
                      <div className="text-[11px] sm:text-xs text-slate-400 mt-1">
                        Bi-directional PCS rated for {bessResults.ratedPowerMW} MW peak shaved
                      </div>
                    </div>

                    <div className="p-3.5 sm:p-4 rounded-2xl border border-emerald-500/30 bg-emerald-950/20">
                      <div className="flex items-center gap-2 text-slate-300 text-xs font-semibold mb-1">
                        <BatteryCharging className="w-4 h-4 text-emerald-400" />
                        <span>Usable Storage Capacity</span>
                      </div>
                      <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400">
                        {bessResults.storageCapacityKWh} kWh
                      </div>
                      <div className="text-[11px] sm:text-xs text-slate-400 mt-1">
                        {bessResults.storageCapacityMWh} MWh containerized LFP storage ({bessDurationHours}h backup)
                      </div>
                    </div>
                  </div>

                  {/* Financial & Operational Returns */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
                    <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
                      <span className="text-[10px] uppercase font-mono text-slate-400 block">Est. Monthly Savings</span>
                      <div className="text-lg font-bold font-mono text-emerald-400 mt-0.5">
                        <span className="font-sans">₹</span>{bessResults.estimatedMonthlySavingsINR.toLocaleString()}
                      </div>
                      <span className="text-[10px] text-slate-500 block">
                        ~₹{(bessResults.estimatedAnnualSavingsINR / 100000).toFixed(1)} Lakh/yr
                      </span>
                    </div>

                    <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
                      <span className="text-[10px] uppercase font-mono text-slate-400 block">Est. Turnkey Capex</span>
                      <div className="text-lg font-bold font-mono text-slate-200 mt-0.5">
                        <span className="font-sans">₹</span>{(bessResults.estimatedCapexINR / 10000000).toFixed(2)} Cr
                      </div>
                      <span className="text-[10px] text-slate-500 block">
                        Full turnkey EPC
                      </span>
                    </div>

                    <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
                      <span className="text-[10px] uppercase font-mono text-slate-400 block">Payback & ROI</span>
                      <div className="text-lg font-bold font-mono text-amber-400 mt-0.5">
                        {bessResults.paybackYears} Years
                      </div>
                      <span className="text-[10px] text-slate-500 block">
                        {bessResults.roiPercentage}% IRR estimate
                      </span>
                    </div>
                  </div>

                  {/* Diesel Offset Highlight (if DG displacement or critical) */}
                  {bessResults.dieselDisplacedLitersPerYear && (
                    <div className="p-3.5 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 flex items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-2.5">
                        <Fuel className="w-5 h-5 text-emerald-400 shrink-0" />
                        <div>
                          <div className="text-xs font-bold text-slate-200">
                            Diesel Fuel Displacement
                          </div>
                          <div className="text-[11px] text-slate-400">
                            Eliminates costly diesel fuel purchases and generator runtime noise.
                          </div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-base font-extrabold font-mono text-emerald-400">
                          {bessResults.dieselDisplacedLitersPerYear.toLocaleString()} L/yr
                        </div>
                        <span className="text-[10px] text-slate-400">Diesel Saved</span>
                      </div>
                    </div>
                  )}

                  {/* Key Engineering Assumptions */}
                  <div className="p-3.5 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-1.5 text-xs text-slate-300">
                    <span className="font-mono text-cyan-400 font-bold block text-[11px] uppercase tracking-wider">
                      Technical Sizing Assumptions:
                    </span>
                    {bessResults.keyAssumptions.map((assump, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-400">
                        <span className="text-cyan-400 shrink-0">&bull;</span>
                        <span>{assump}</span>
                      </div>
                    ))}
                    <div className="flex items-start gap-2 text-[11px] text-slate-400">
                      <span className="text-cyan-400 shrink-0">&bull;</span>
                      <span>Tier-1 LiFePO4 chemistry with 10-Year or 6,000-cycle cell capacity warranty.</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <a
                    href={`https://wa.me/919359543323?text=Hello%20PIPL,%20we%20are%20interested%20in%20a%20BESS%20system%20for%20our%20facility%20with%20peak%20load%20${bessPeakLoadKW}kW%20and%20backup%20${bessDurationHours}h`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>WhatsApp Inquiry</span>
                  </a>

                  <button
                    onClick={handleBessInquiry}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
                  >
                    <span>Request a BESS Feasibility Study</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
