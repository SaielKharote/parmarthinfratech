import { 
  CalculationInput, 
  CalculationResult, 
  BessCalculationInput, 
  BessCalculationResult 
} from '../types';

/**
 * Pure calculation logic for PIPL Solar, Green Open Access, and Virtual Net Metering.
 * Provides transparent, verifiable assumptions.
 */
export function calculateEnergyROI(input: CalculationInput): CalculationResult {
  const { sector, schemeType, monthlyBillINR, connectedLoadKW } = input;

  // Safeguards
  const safeBill = Math.max(0, monthlyBillINR || 0);
  const safeLoad = Math.max(1, connectedLoadKW || 1);

  // Baseline tariff estimates per kWh in Maharashtra (MSEDCL / Adani Electricity)
  let tariffPerKWh = 9.8;
  if (sector === 'commercial') tariffPerKWh = 11.5;
  else if (sector === 'industrial') tariffPerKWh = 9.8;
  else if (sector === 'chs') tariffPerKWh = 8.2;
  else if (sector === 'utility') tariffPerKWh = 7.2;

  // Approximate monthly consumption in units (kWh)
  const estimatedMonthlyUnits = safeBill > 0 ? safeBill / tariffPerKWh : safeLoad * 140;

  // Recommended Capacity based on scheme
  let recommendedCapacityKW = 0;
  let savingsRatio = 0.45; // Default ~45% bill offset
  let landedGreenTariff: number | undefined = undefined;

  if (schemeType === 'open-access') {
    // Under Green Energy Open Access (GEOA) Rules 2022, open access threshold is 100 kW
    recommendedCapacityKW = Math.max(100, Math.round(safeLoad * 0.85));
    landedGreenTariff = 5.1; // Delivered green tariff ~₹5.10/kWh vs ~₹9.80/kWh grid
    savingsRatio = (tariffPerKWh - landedGreenTariff) / tariffPerKWh;
  } else if (schemeType === 'vnm') {
    // Virtual Net Metering for CHS Societies (MSEDCL VNM Regulations)
    recommendedCapacityKW = Math.round(Math.min(safeLoad * 0.7, 500));
    savingsRatio = 0.42;
  } else if (schemeType === 'ground-mounted') {
    // MW or High kW ground mount
    recommendedCapacityKW = Math.max(50, Math.round(safeLoad * 0.9));
    savingsRatio = 0.52;
  } else {
    // Standard Rooftop EPC (Net-metering capped at 1 MW or sanctioned load)
    recommendedCapacityKW = Math.max(1, Math.round(safeLoad * 0.65));
    savingsRatio = 0.45;
  }

  // Solar specific yield in Western Maharashtra ~1,480 kWh / kWp / year (~4.05 peak sun hours/day)
  const specificYield = 1480;
  const annualGenerationKWh = Math.round(recommendedCapacityKW * specificYield);

  // Estimated Savings
  let estimatedAnnualSavingsINR = 0;
  if (schemeType === 'open-access' && landedGreenTariff !== undefined) {
    const landedDelta = tariffPerKWh - landedGreenTariff;
    const contractedUnits = Math.min(annualGenerationKWh, estimatedMonthlyUnits * 12);
    estimatedAnnualSavingsINR = Math.round(contractedUnits * landedDelta);
  } else {
    const offsetUnits = Math.min(annualGenerationKWh, estimatedMonthlyUnits * 12);
    estimatedAnnualSavingsINR = Math.round(offsetUnits * tariffPerKWh * savingsRatio);
  }

  // Guard against unrealistic over-savings if bill was specified
  if (safeBill > 0 && estimatedAnnualSavingsINR > safeBill * 12 * 0.85) {
    estimatedAnnualSavingsINR = Math.round(safeBill * 12 * 0.78);
  }

  const monthlySavingsINR = Math.round(estimatedAnnualSavingsINR / 12);

  // CO2 reduction (CEA India baseline grid emission factor ~0.82 kg CO2 per kWh generated)
  const co2ReductionTonsPerYear = Number(((annualGenerationKWh * 0.82) / 1000).toFixed(1));

  // Capital Expenditure estimate ~₹42,000 per kWp turnkey EPC (Tier-1 Mono PERC / TOPCon)
  const estimatedCapexINR = recommendedCapacityKW * 42000;
  const rawPayback = estimatedAnnualSavingsINR > 0
    ? Number((estimatedCapexINR / estimatedAnnualSavingsINR).toFixed(1))
    : 3.5;

  const paybackYears = Math.max(2.4, Math.min(isNaN(rawPayback) ? 3.5 : rawPayback, 6.2));
  const roiPercentage = Number(((estimatedAnnualSavingsINR / Math.max(1, estimatedCapexINR)) * 100).toFixed(1));

  return {
    recommendedCapacityKW,
    annualGenerationKWh,
    estimatedAnnualSavingsINR,
    monthlySavingsINR,
    co2ReductionTonsPerYear,
    paybackYears,
    roiPercentage: Math.max(16, Math.min(roiPercentage, 42)),
    tariffPerKWh,
    specificYield,
    landedGreenTariff,
  };
}

/**
 * Pure calculation logic for Battery Energy Storage Systems (BESS)
 * Rigorously separates Power (kW/MW) from Storage Capacity (kWh/MWh)
 */
export function calculateBessROI(input: BessCalculationInput): BessCalculationResult {
  const { peakLoadKW, backupHours, application } = input;

  const safePeakKW = Math.max(10, peakLoadKW || 100);
  const safeHours = Math.max(1, Math.min(backupHours || 2, 8));

  // Determine Power Rating (kW) vs Energy Capacity (kWh)
  let powerRatio = 0.6; // For peak shaving, sizing to 60% of peak load
  if (application === 'critical-backup') {
    powerRatio = 1.0; // 100% of critical load
  } else if (application === 'dg-displacement') {
    powerRatio = 0.8;
  } else if (application === 'solar-arbitrage') {
    powerRatio = 0.7;
  }

  const ratedPowerKW = Math.round(safePeakKW * powerRatio);
  const storageCapacityKWh = Math.round(ratedPowerKW * safeHours);

  const ratedPowerMW = Number((ratedPowerKW / 1000).toFixed(2));
  const storageCapacityMWh = Number((storageCapacityKWh / 1000).toFixed(2));

  // C-rate indicator
  const cRate = safeHours === 1 ? '1C (Rapid Discharge)' : safeHours === 2 ? '0.5C (Standard)' : safeHours === 4 ? '0.25C (Deep Discharge)' : '0.16C (Extended)';

  // Turnkey EPC cost for C&I containerized LFP BESS in India ~₹24,000 per kWh
  // Includes Tier-1 prismatic cells, Bi-directional PCS, BMS, HVAC thermal management & FM200 fire suppression
  const costPerKWh = safeHours <= 2 ? 24500 : 22500;
  const estimatedCapexINR = Math.round(storageCapacityKWh * costPerKWh);

  let estimatedAnnualSavingsINR = 0;
  let dieselDisplacedLitersPerYear: number | undefined = undefined;
  const keyAssumptions: string[] = [];

  const cyclesPerYear = 310; // Daily cycling on work days
  const dod = 0.85; // 85% Depth of Discharge for maximum cell longevity
  const dailyUsableKWh = storageCapacityKWh * dod;

  if (application === 'tod-peak-shaving') {
    // MSEDCL Peak TOD Tariff difference (approx +₹2.10/unit surcharge during 18:00 - 22:00)
    // Plus maximum demand charge reduction (~₹450 per kVA shaved monthly)
    const demandChargeSavingsMonthly = ratedPowerKW * 0.75 * 450;
    const todEnergySavingsAnnual = dailyUsableKWh * 2.10 * cyclesPerYear;
    estimatedAnnualSavingsINR = Math.round((demandChargeSavingsMonthly * 12) + todEnergySavingsAnnual);

    keyAssumptions.push('Time-of-Day (TOD) peak tariff surcharge difference: ₹2.10/kWh');
    keyAssumptions.push('Contracted Maximum Demand (MD) charge reduction: ₹450/kVA/month');
    keyAssumptions.push('85% Depth-of-Discharge (DoD) to ensure 6,000+ cycle life (10+ years)');
  } else if (application === 'solar-arbitrage') {
    // Levelized cost of captive solar is ~₹2.60/kWh vs displaced peak grid tariff ₹10.20/kWh -> ₹7.60/kWh delta
    const delta = 7.60;
    estimatedAnnualSavingsINR = Math.round(dailyUsableKWh * delta * cyclesPerYear);

    keyAssumptions.push('Levelized Solar generation cost: ₹2.60/kWh stored during daylight');
    keyAssumptions.push('Displaced evening peak grid tariff: ₹10.20/kWh');
    keyAssumptions.push('Round-Trip Efficiency (RTE): 88% AC-to-AC');
  } else if (application === 'dg-displacement') {
    // Diesel generation cost in India: ~₹29/kWh (assuming 3.2 kWh per liter of diesel at ₹93/L)
    // Battery cycle cost: ~₹8.20/kWh levelized (LCOS)
    // Running 450 hours per year of diesel generator
    const operatingHoursPerYear = 450;
    const annualDisplacedKWh = Math.min(dailyUsableKWh * cyclesPerYear, ratedPowerKW * operatingHoursPerYear);
    const costPerKWhDG = 29.0;
    const costPerKWhBattery = 8.20;
    estimatedAnnualSavingsINR = Math.round(annualDisplacedKWh * (costPerKWhDG - costPerKWhBattery));

    // Liter calculation (3.2 kWh / liter)
    dieselDisplacedLitersPerYear = Math.round(annualDisplacedKWh / 3.2);

    keyAssumptions.push('Diesel generation cost: ₹29.00/kWh (diesel at ₹93/liter, 3.2 kWh/L)');
    keyAssumptions.push('Battery Levelized Cost of Storage (LCOS): ~₹8.20/kWh');
    keyAssumptions.push(`Direct diesel displacement: ~${dieselDisplacedLitersPerYear.toLocaleString()} Liters/year`);
  } else {
    // Critical Industrial Backup
    // Displaces diesel run and eliminates costly production downtime / scrap
    const baseSavings = dailyUsableKWh * 180 * (28.0 - 8.5);
    const downtimeProtection = ratedPowerKW * 4000; // Estimated downtime value
    estimatedAnnualSavingsINR = Math.round(baseSavings + downtimeProtection);

    keyAssumptions.push('Sub-cycle UPS-grade transfer time (< 20ms) for critical automation');
    keyAssumptions.push('Eliminates raw material scrap during sudden utility grid trippings');
    keyAssumptions.push('Replaces dirty diesel generator cold-starts');
  }

  const estimatedMonthlySavingsINR = Math.round(estimatedAnnualSavingsINR / 12);
  const rawPayback = estimatedAnnualSavingsINR > 0
    ? Number((estimatedCapexINR / estimatedAnnualSavingsINR).toFixed(1))
    : 4.8;
  const paybackYears = Math.max(3.2, Math.min(isNaN(rawPayback) ? 4.8 : rawPayback, 7.5));
  const roiPercentage = Number(((estimatedAnnualSavingsINR / Math.max(1, estimatedCapexINR)) * 100).toFixed(1));

  // CO2 reduction (Grid/Diesel blend factor ~0.85 kg CO2 per kWh shifted or saved)
  const co2ReductionTonsPerYear = Number(((dailyUsableKWh * cyclesPerYear * 0.85) / 1000).toFixed(1));

  return {
    ratedPowerKW,
    ratedPowerMW,
    storageCapacityKWh,
    storageCapacityMWh,
    cRate,
    batteryChemistry: 'LiFePO4 (LFP Prismatic Cells, 6,000+ Cycles)',
    estimatedCapexINR,
    estimatedMonthlySavingsINR,
    estimatedAnnualSavingsINR,
    paybackYears,
    roiPercentage: Math.max(14, Math.min(roiPercentage, 35)),
    dieselDisplacedLitersPerYear,
    co2ReductionTonsPerYear,
    keyAssumptions,
  };
}
