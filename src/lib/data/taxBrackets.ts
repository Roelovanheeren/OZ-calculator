export const FEDERAL_CAPITAL_GAINS_2025 = {
  single: [
    { min: 0, max: 48350, rate: 0 },
    { min: 48350, max: 501600, rate: 0.15 },
    { min: 501600, max: Infinity, rate: 0.20 }
  ],
  marriedJoint: [
    { min: 0, max: 96700, rate: 0 },
    { min: 96700, max: 628300, rate: 0.15 },
    { min: 628300, max: Infinity, rate: 0.20 }
  ],
  marriedSeparate: [
    { min: 0, max: 48350, rate: 0 },
    { min: 48350, max: 314150, rate: 0.15 },
    { min: 314150, max: Infinity, rate: 0.20 }
  ]
};

export const NIIT_THRESHOLD = {
  single: 200000,
  marriedJoint: 250000,
  marriedSeparate: 125000,
  rate: 0.038
};

export const FEDERAL_ORDINARY_INCOME_2025 = {
  single: [
    { min: 0, max: 11000, rate: 0.10 },
    { min: 11000, max: 44725, rate: 0.12 },
    { min: 44725, max: 95375, rate: 0.22 },
    { min: 95375, max: 182050, rate: 0.24 },
    { min: 182050, max: 231250, rate: 0.32 },
    { min: 231250, max: 578100, rate: 0.35 },
    { min: 578100, max: Infinity, rate: 0.37 }
  ],
  marriedJoint: [
    { min: 0, max: 22000, rate: 0.10 },
    { min: 22000, max: 89450, rate: 0.12 },
    { min: 89450, max: 190750, rate: 0.22 },
    { min: 190750, max: 364200, rate: 0.24 },
    { min: 364200, max: 462500, rate: 0.32 },
    { min: 462500, max: 693750, rate: 0.35 },
    { min: 693750, max: Infinity, rate: 0.37 }
  ],
  marriedSeparate: [
    { min: 0, max: 11000, rate: 0.10 },
    { min: 11000, max: 44725, rate: 0.12 },
    { min: 44725, max: 95375, rate: 0.22 },
    { min: 95375, max: 182050, rate: 0.24 },
    { min: 182050, max: 231250, rate: 0.32 },
    { min: 231250, max: 346875, rate: 0.35 },
    { min: 346875, max: Infinity, rate: 0.37 }
  ]
};

export const INCOME_RANGES = [
  { value: 100000, label: 'Under $100k' },
  { value: 150000, label: '$100k - $150k' },
  { value: 300000, label: '$150k - $300k' },
  { value: 500000, label: '$300k - $500k' },
  { value: 750000, label: '$500k - $750k' },
  { value: 1000000, label: '$750k - $1M' },
  { value: 2000000, label: 'Over $1M' }
];
// Updated income ranges Mon Sep 22 16:59:07 WITA 2025
