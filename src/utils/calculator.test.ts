import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateEnergyROI } from './calculator';

test('calculates Green Open Access for 150 kW connected load', () => {
  const result = calculateEnergyROI({
    sector: 'industrial',
    schemeType: 'open-access',
    monthlyBillINR: 450000,
    connectedLoadKW: 150,
  });

  assert.ok(result.recommendedCapacityKW >= 100, 'Green Open access minimum capacity should be >= 100 kW');
  assert.ok(result.annualGenerationKWh > 0, 'Annual generation must be greater than zero');
  assert.ok(result.estimatedAnnualSavingsINR > 0, 'Annual savings must be positive');
  assert.ok(result.co2ReductionTonsPerYear > 0, 'CO2 reduction must be positive');
  assert.ok(result.paybackYears >= 2.0 && result.paybackYears <= 7.0, 'Payback period should be reasonable');
});

test('handles Virtual Net Metering for CHS housing society', () => {
  const result = calculateEnergyROI({
    sector: 'chs',
    schemeType: 'vnm',
    monthlyBillINR: 120000,
    connectedLoadKW: 80,
  });

  assert.ok(result.recommendedCapacityKW > 0);
  assert.ok(result.monthlySavingsINR > 0);
  assert.ok(result.roiPercentage > 10);
});

test('handles zero input gracefully with sensible fallback', () => {
  const result = calculateEnergyROI({
    sector: 'commercial',
    schemeType: 'rooftop-epc',
    monthlyBillINR: 0,
    connectedLoadKW: 0,
  });

  assert.ok(result.recommendedCapacityKW >= 10);
  assert.ok(result.annualGenerationKWh > 0);
});
