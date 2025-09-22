import { HAZEN_PROJECT_DATA } from '../data/hazenData';
import { OZProjection, ComparisonData } from '../../types/calculator';
import { calculateBonusDepreciation, calculateYear1CashFlowBenefit } from './bonusDepreciation';

export function calculateOZProjection(
  investmentAmount: number,
  scenario: 'conservative' | 'moderate' | 'optimistic',
  holdPeriod: number,
  currentTaxRate: number,
  ordinaryIncomeRate: number
): OZProjection {
  const scenarioData = HAZEN_PROJECT_DATA.scenarios[scenario];
  const annualReturn = scenarioData.irr;
  
  // Compound growth calculation
  const projectedValue = investmentAmount * Math.pow(1 + annualReturn, holdPeriod);
  const taxFreeGains = projectedValue - investmentAmount;
  
  // OZ tax savings - use the correct tax rate (23.8% for high earners)
  const effectiveTaxRate = Math.max(currentTaxRate, 0.238); // Minimum 23.8% for high earners
  const deferredTax = investmentAmount * effectiveTaxRate; // Original gain tax deferred
  const appreciationTaxSaved = taxFreeGains * effectiveTaxRate; // Tax on appreciation saved
  const ozTaxSavings = deferredTax + appreciationTaxSaved;
  
  // NEW: Bonus depreciation calculations
  const depreciationCalc = calculateBonusDepreciation(
    investmentAmount,
    HAZEN_PROJECT_DATA.totalCost,
    ordinaryIncomeRate
  );
  
  const year1CashFlowCalc = calculateYear1CashFlowBenefit(
    investmentAmount,
    scenario,
    depreciationCalc.bonusDepreciationDeduction
  );
  
  // Total stacked benefits
  const totalStackedBenefits = ozTaxSavings + depreciationCalc.depreciationTaxSavings;
  
  return {
    investmentAmount,
    scenario,
    holdPeriod,
    projectedValue,
    taxFreeGains,
    totalTaxSavings: ozTaxSavings,
    deferredTax,
    appreciationTaxSaved,
    bonusDepreciationDeduction: depreciationCalc.bonusDepreciationDeduction,
    depreciationTaxSavings: depreciationCalc.depreciationTaxSavings,
    totalStackedBenefits,
    year1CashFlowTaxFree: year1CashFlowCalc.effectivelyTaxFree
  };
}

export function calculateComparison(
  ozProjection: OZProjection,
  currentTaxRate: number,
  originalGainAmount: number
): ComparisonData {
  const { investmentAmount, projectedValue, totalTaxSavings, depreciationTaxSavings } = ozProjection;
  
  // Use the correct effective tax rate (23.8% for high earners)
  const effectiveTaxRate = Math.max(currentTaxRate, 0.238);
  
  // Without OZ scenario
  const taxesPaidNow = originalGainAmount * effectiveTaxRate;
  const availableToInvest = originalGainAmount - taxesPaidNow;
  const withoutOZValue = availableToInvest * Math.pow(1.08, ozProjection.holdPeriod); // Assume 8% return elsewhere
  const withoutOZTaxesOnAppreciation = (withoutOZValue - availableToInvest) * effectiveTaxRate;
  const withoutOZNetWealth = withoutOZValue - withoutOZTaxesOnAppreciation;
  
  // With OZ scenario - include depreciation tax savings
  const withOZValue = projectedValue;
  const withOZNetWealth = withOZValue + depreciationTaxSavings; // Include depreciation tax savings
  
  return {
    withoutOZ: {
      initialInvestment: availableToInvest,
      taxesPaidNow,
      tenYearValue: withoutOZValue,
      taxesOnAppreciation: withoutOZTaxesOnAppreciation,
      netWealth: withoutOZNetWealth
    },
    withOZ: {
      initialInvestment: investmentAmount,
      taxesPaidNow: 0,
      tenYearValue: withOZValue,
      taxesOnAppreciation: 0,
      netWealth: withOZNetWealth
    },
    netWealthDifference: withOZNetWealth - withoutOZNetWealth
  };
}

export function getScenarioDescription(scenario: 'conservative' | 'moderate' | 'optimistic'): string {
  return HAZEN_PROJECT_DATA.scenarios[scenario].description;
}

export function getScenarioLabel(scenario: 'conservative' | 'moderate' | 'optimistic'): string {
  return HAZEN_PROJECT_DATA.scenarios[scenario].label;
}
