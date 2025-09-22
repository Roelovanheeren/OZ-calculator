export const HAZEN_PROJECT_DATA = {
  totalCost: 57587425,
  unitCount: 178,
  costPerUnit: 323525,
  bonusDepreciation: {
    qualifyingAssets: 12560626.16, // 21.81% of total project cost
    depreciationRate: 1.0, // 100% bonus depreciation
    eligibleCategories: [
      'Appliances and fixtures',
      'Landscaping and site improvements', 
      'Interior finishes',
      'Technology infrastructure'
    ]
  },
  scenarios: {
    conservative: {
      irr: Math.pow(1 + 1.603, 1/10) - 1, // 10.03% actual annual return from 160.30% LP Cash on Cash Return
      yield: 0.0803, // 8.03% average development yield over 10 years
      noi: 5159032, // Year 10 NOI from CSV
      label: "Base Market Rent",
      description: "Conservative projections based on current market rents",
      year1CashFlow: 0.03, // 3% cash-on-cash in year 1
      year1NOI: 103525 // Investor's pro-rata share of NOI
    },
    moderate: {
      irr: Math.pow(1 + 1.603, 1/10) - 1, // 10.03% actual annual return from 160.30% LP Cash on Cash Return
      yield: 0.0803, // 8.03% average development yield over 10 years
      noi: 5159032, // Year 10 NOI from CSV
      label: "10% Rent Premium",
      description: "Moderate projections with 10% rent premium over market",
      year1CashFlow: 0.035,
      year1NOI: 103525
    },
    optimistic: {
      irr: Math.pow(1 + 1.603, 1/10) - 1, // 10.03% actual annual return from 160.30% LP Cash on Cash Return
      yield: 0.0803, // 8.03% average development yield over 10 years
      noi: 5159032, // Year 10 NOI from CSV
      label: "15% Rent Premium",
      description: "Optimistic projections with 15% rent premium over market",
      year1CashFlow: 0.04,
      year1NOI: 103525
    }
  },
  advantages: [
    {
      title: "Phoenix #1 BTR Market",
      description: "Phoenix is the #1 build-to-rent market in the US with strong fundamentals"
    },
    {
      title: "Buckeye Growth",
      description: "Buckeye area growing 25% in 4 years with strong job creation"
    },
    {
      title: "Institutional Quality",
      description: "178-unit community designed for institutional buyers at exit"
    },
    {
      title: "Conservative Underwriting",
      description: "Exit cap rate assumptions higher than current market rates"
    },
    {
      title: "Phase 2 Pipeline",
      description: "219 additional units for potential follow-on investment"
    },
    {
      title: "100% Bonus Depreciation Eligible",
      description: "Qualified improvement property eligible for immediate 100% bonus depreciation"
    }
  ],
  marketData: {
    location: "Buckeye, Arizona",
    marketType: "Build-to-Rent",
    targetDemographic: "Institutional Buyers",
    exitStrategy: "10+ year hold with institutional sale"
  }
};

export const HOLD_PERIODS = [
  { value: 10, label: '10 Years', description: 'Minimum hold for full OZ benefits' },
  { value: 12, label: '12 Years', description: 'Extended hold for additional appreciation' },
  { value: 15, label: '15 Years', description: 'Long-term hold for maximum returns' }
];

export const INVESTMENT_AMOUNTS = [
  { value: 250000, label: '$250K', min: true },
  { value: 500000, label: '$500K' },
  { value: 750000, label: '$750K' },
  { value: 1000000, label: '$1M' },
  { value: 1500000, label: '$1.5M' },
  { value: 2000000, label: '$2M+' }
];
