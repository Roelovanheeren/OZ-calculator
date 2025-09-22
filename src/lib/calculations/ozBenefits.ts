import { HAZEN_PROJECT_DATA } from '../data/hazenData';
import { OZProjection, ComparisonData } from '../../types/calculator';
import { calculateBonusDepreciation, calculateYear1CashFlowBenefit } from './bonusDepreciation';

// Unified tax rate system - single source of truth
interface TaxRates {
  federalLTCG: number;
  niit: number;
  stateLTCG: number;
  marginalOrdinary: number;
}

function getTaxRates(currentTaxRate: number, ordinaryIncomeRate: number): TaxRates {
  return {
    federalLTCG: 0.20, // Federal long-term capital gains
    niit: 0.038, // Net Investment Income Tax
    stateLTCG: 0.025, // Arizona state tax (2.5%)
    marginalOrdinary: ordinaryIncomeRate // For depreciation benefits
  };
}

export function calculateOZProjection(
  investmentAmount: number,
  scenario: 'conservative' | 'moderate' | 'optimistic',
  holdPeriod: number,
  currentTaxRate: number,
  ordinaryIncomeRate: number
): OZProjection {
  const scenarioData = HAZEN_PROJECT_DATA.scenarios[scenario];
  const rates = getTaxRates(currentTaxRate, ordinaryIncomeRate);
  
  // Cap investment at max LP equity
  const maxInvestment = 19323884; // $19,323,884
  const cappedInvestment = Math.min(investmentAmount, maxInvestment);
  
  // Calculate investor's pro-rata share of the LP equity
  const lpEquityRequired = 19323884; // $19,323,884
  const investorShare = cappedInvestment / lpEquityRequired;
  
  // Use the actual total LP value from the model (profit + return of capital)
  const totalLPValue = 53505866; // $53,505,866 total LP value at exit
  const investorLPValue = totalLPValue * investorShare;
  
  // Projected value = investor's share of total LP value
  const projectedValue = investorLPValue;
  const taxFreeGains = projectedValue - cappedInvestment;
  
  // Calculate the actual annual return from the model
  // LP Cash on Cash Return is 160.30% over 10 years
  // This means: (1 + annual_return)^10 = 1 + 1.603 = 2.603
  // So: annual_return = (2.603)^(1/10) - 1 = 0.1003 = 10.03%
  const actualAnnualReturn = Math.pow(1 + 1.603, 1/10) - 1;
  
  // OZ Capital Gains Deferral (federal only - state policy unclear, assume deferred)
  const ozDeferral = cappedInvestment * rates.federalLTCG; // $500k × 20% = $100k
  
  // 10-Year Tax-Free Appreciation (federal + state at exit)
  const appreciationTaxSaved = taxFreeGains * (rates.federalLTCG + rates.stateLTCG);
  
  // OZ Tax Savings (deferral + appreciation savings)
  const ozTaxSavings = ozDeferral + appreciationTaxSaved;
  
  // Bonus depreciation calculations - use total project cost for depreciation allocation
  const depreciationCalc = calculateBonusDepreciation(
    cappedInvestment,
    HAZEN_PROJECT_DATA.totalCost,
    rates.marginalOrdinary
  );
  
  const year1CashFlowCalc = calculateYear1CashFlowBenefit(
    cappedInvestment,
    scenario,
    depreciationCalc.bonusDepreciationDeduction
  );
  
  // Total stacked benefits
  const totalStackedBenefits = depreciationCalc.depreciationTaxSavings + ozDeferral + appreciationTaxSaved;
  
  return {
    investmentAmount: cappedInvestment, // Return capped investment
    scenario,
    holdPeriod,
    projectedValue,
    taxFreeGains,
    totalTaxSavings: ozTaxSavings,
    deferredTax: ozDeferral, // Federal deferral only
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
  const { investmentAmount, projectedValue, depreciationTaxSavings, deferredTax, appreciationTaxSaved } = ozProjection;
  const rates = getTaxRates(currentTaxRate, 0.395); // Use 39.5% for high earners
  
  // Calculate tax on the investment tranche
  const trancheTaxRate = rates.federalLTCG + rates.niit + rates.stateLTCG; // 20% + 3.8% + 2.5% = 26.3%
  const taxesPaidNowOnTranche = investmentAmount * trancheTaxRate;
  
  // Without OZ scenario - use 8% return as mentioned in spreadsheet
  const availableToInvest = investmentAmount - taxesPaidNowOnTranche;
  const withoutOZValue = availableToInvest * Math.pow(1.08, ozProjection.holdPeriod); // 8% return elsewhere
  const withoutOZTaxesOnAppreciation = (withoutOZValue - availableToInvest) * trancheTaxRate;
  const withoutOZNetWealth = withoutOZValue - withoutOZTaxesOnAppreciation;
  
  // With OZ scenario - only pay NIIT and state now (federal deferred)
  const ozTaxesPaidNow = investmentAmount * (rates.niit + rates.stateLTCG); // Only NIIT + state
  const withOZValue = projectedValue;
  const withOZNetWealth = withOZValue + depreciationTaxSavings; // Include depreciation tax savings
  
  return {
    withoutOZ: {
      initialInvestment: availableToInvest,
      taxesPaidNow: taxesPaidNowOnTranche,
      tenYearValue: withoutOZValue,
      taxesOnAppreciation: withoutOZTaxesOnAppreciation,
      netWealth: withoutOZNetWealth
    },
    withOZ: {
      initialInvestment: investmentAmount,
      taxesPaidNow: ozTaxesPaidNow, // Only NIIT + state, not zero
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
