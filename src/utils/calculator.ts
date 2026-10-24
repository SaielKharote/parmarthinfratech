import { CalculationInput, CalculationResult } from '../types';

/**
 * Pure calculation logic for PIPL Solar, Green Open Access, and Virtual Net Metering
 */
export function calculateEnergyROI(input: CalculationInput): CalculationResult {
  const { sector, schemeType, monthlyBillINR, connectedLoadKW } = input;

  // Safeguards
  const safeBill = Math.max(0, monthlyBillINR || 0);
  const safeLoad = Math.max(1, connectedLoadKW || 1);

  // Baseline tariff estimates per kWh in Maharashtra (MSEDCL / Adani)
  let tariffPerKWh = 9.5;
  if (sector === 'commercial') tariffPerKWh = 11.5;
  else if (sector === 'industrial') tariffPerKWh = 9.8;
  else if (sector === 'chs') tariffPerKWh = 8.2;
  else if (sector === 'utility') tariffPerKWh = 7.0;

  // Approximate monthly consumption in units (kWh)
  const estimatedMonthlyUnits = safeBill > 0 ? safeBill / tariffPerKWh : safeLoad * 140;

  // Recommended Capacity based on scheme
  let recommendedCapacityKW = 0;
  let savingsRatio = 0.4; // Default ~40% savings

  if (schemeType === 'open-access') {
    // Green open access allowed from ~100 kW load
    recommendedCapacityKW = Math.max(100, Math.round(safeLoad * 0.85));
    // Green power landed cost ~4.8/unit vs ~9.8 grid -> ~48% savings
    savingsRatio = 0.46;
  } else if (schemeType === 'vnm') {
    // Virtual Net Metering for CHS Societies
    recommendedCapacityKW = Math.round(Math.min(safeLoad * 0.7, 500));
    savingsRatio = 0.42;
  } else if (schemeType === 'ground-mounted') {
    // MW or High kW ground mount
    recommendedCapacityKW = Math.max(50, Math.round(safeLoad * 0.9));
    savingsRatio = 0.52;
  } else {
    // Standard Rooftop EPC
    recommendedCapacityKW = Math.max(10, Math.round(safeLoad * 0.65));
    savingsRatio = 0.45;
  }

  // Solar generation in Maharashtra ~1,480 kWh / kWp / year
  const specificYieldPerKWp = 1480;
  const annualGenerationKWh = Math.round(recommendedCapacityKW * specificYieldPerKWp);

  // Estimated Savings
  let estimatedAnnualSavingsINR = 0;
  if (schemeType === 'open-access') {
    // Delivered power difference
    const landedDelta = tariffPerKWh - 4.8;
    const contractedUnits = Math.min(annualGenerationKWh, estimatedMonthlyUnits * 12);
    estimatedAnnualSavingsINR = Math.round(contractedUnits * landedDelta);
  } else {
    // Standard net metering / on-site generation offset
    const offsetUnits = Math.min(annualGenerationKWh, estimatedMonthlyUnits * 12);
    estimatedAnnualSavingsINR = Math.round(offsetUnits * (tariffPerKWh * savingsRatio));
  }

  // Ensure reasonable lower bound if bill was specified
  if (safeBill > 0 && estimatedAnnualSavingsINR > safeBill * 12 * 0.8) {
    estimatedAnnualSavingsINR = Math.round(safeBill * 12 * 0.7);
  }

  const monthlySavingsINR = Math.round(estimatedAnnualSavingsINR / 12);

  // CO2 reduction (CEA India factor ~0.82 kg CO2 per kWh generated)
  const co2ReductionTonsPerYear = Number(((annualGenerationKWh * 0.82) / 1000).toFixed(1));

  // Capital Expenditure estimate ~₹42,000 per kWp turnkey EPC
  const estimatedCapexINR = recommendedCapacityKW * 42000;
  const paybackYears = estimatedAnnualSavingsINR > 0
    ? Number((estimatedCapexINR / estimatedAnnualSavingsINR).toFixed(1))
    : 3.5;

  const roiPercentage = estimatedCapexINR > 0
    ? Number(((estimatedAnnualSavingsINR / estimatedCapexINR) * 100).toFixed(1))
    : 28.5;

  return {
    recommendedCapacityKW,
    annualGenerationKWh,
    estimatedAnnualSavingsINR,
    monthlySavingsINR,
    co2ReductionTonsPerYear,
    paybackYears: Math.max(2.2, Math.min( payBackMax(paybackYears), 6.5 )),
    roiPercentage: Math.max(15, Math.min(roiPercentage, 45)),
  };
}

function payBackMax(val: number): number {
  return isNaN(val) ? 3.6 : val;
}
