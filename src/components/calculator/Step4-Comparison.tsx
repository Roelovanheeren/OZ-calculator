import React from 'react';
import { OZProjection, TaxCalculation } from '../../types/calculator';
import { Button } from '../ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { formatCurrency } from '../../lib/utils/formatters';

interface Props {
  ozProjection: OZProjection;
  taxCalculation: TaxCalculation | null;
  onNext: () => void;
  onBack: () => void;
}

export function Step4Comparison({ ozProjection, taxCalculation, onNext, onBack }: Props) {
  if (!taxCalculation) return null;

  // Calculate comparison data
  const totalTaxRate = taxCalculation.federalRate + taxCalculation.stateRate;
  const originalGainAmount = ozProjection.investmentAmount;
  
  // Without OZ scenario
  const taxesPaidNow = originalGainAmount * totalTaxRate;
  const availableToInvest = originalGainAmount - taxesPaidNow;
  const withoutOZValue = availableToInvest * Math.pow(1.08, ozProjection.holdPeriod); // Assume 8% return elsewhere
  const withoutOZTaxesOnAppreciation = (withoutOZValue - availableToInvest) * totalTaxRate;
  const withoutOZNetWealth = withoutOZValue - withoutOZTaxesOnAppreciation;
  
  // With OZ scenario
  const withOZValue = ozProjection.projectedValue;
  const withOZNetWealth = withOZValue; // No taxes on appreciation with OZ
  

  const comparisonData = [
    {
      label: 'Initial Investment',
      withoutOZ: availableToInvest,
      withOZ: ozProjection.investmentAmount,
    },
    {
      label: 'Taxes Paid Now',
      withoutOZ: taxesPaidNow,
      withOZ: 0,
    },
    {
      label: 'Year 1 Tax Savings',
      withoutOZ: 0,
      withOZ: ozProjection.depreciationTaxSavings,
    },
    {
      label: `${ozProjection.holdPeriod}-Year Value`,
      withoutOZ: withoutOZValue,
      withOZ: withOZValue,
    },
    {
      label: 'Total Tax Savings',
      withoutOZ: 0,
      withOZ: ozProjection.totalStackedBenefits,
    },
    {
      label: 'Net Wealth After Taxes',
      withoutOZ: withoutOZNetWealth,
      withOZ: withOZNetWealth + ozProjection.depreciationTaxSavings,
      highlight: true
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl text-center" style={{ 
            fontFamily: 'var(--font-primary)', 
            color: 'var(--primary-navy)' 
          }}>
            Side-by-Side Comparison: Regular Investment vs. Hazen Road OZ
          </CardTitle>
          <CardContent className="text-center" style={{ 
            color: 'var(--text-secondary)',
            fontFamily: 'var(--font-secondary)'
          }}>
            See exactly how much more wealth you could have with Opportunity Zone investment
          </CardContent>
        </CardHeader>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Comparison Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Investment Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="comparison-table w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left py-3">Scenario</th>
                    <th className="text-right py-3">Without OZ</th>
                    <th className="text-right py-3">With Hazen Road OZ</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr key={index} style={{
                      backgroundColor: row.highlight ? 'var(--background-light)' : 'var(--background-white)',
                      borderBottom: '1px solid var(--background-gray)'
                    }}>
                      <td className="py-3 font-medium" style={{ color: 'var(--text-primary)' }}>{row.label}</td>
                      <td className="py-3 text-right" style={{ color: 'var(--text-primary)' }}>{formatCurrency(row.withoutOZ)}</td>
                      <td className="py-3 text-right" style={{ color: 'var(--text-primary)' }}>{formatCurrency(row.withOZ)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Key Insights */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg" style={{ 
                fontFamily: 'Playfair Display, Georgia, serif',
                color: '#2c3e50'
              }}>Key Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2" style={{ 
                  color: '#2c3e50',
                  fontFamily: 'Playfair Display, Georgia, serif'
                }}>
                  {formatCurrency(ozProjection.totalStackedBenefits)}
                </div>
                <p className="text-gray-600" style={{ 
                  fontFamily: 'Inter, Helvetica Neue, sans-serif'
                }}>Additional Wealth with Triple-Stacked Benefits</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg" style={{ 
                fontFamily: 'Playfair Display, Georgia, serif',
                color: '#2c3e50'
              }}>OZ Benefits Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center py-2 border-b border-gray-200">
                <span className="text-gray-600 flex-1" style={{ 
                  fontFamily: 'Inter, Helvetica Neue, sans-serif'
                }}>Immediate Depreciation Savings</span>
                <span className="font-semibold text-right flex-1" style={{ 
                  color: '#2c3e50',
                  fontFamily: 'Playfair Display, Georgia, serif'
                }}>
                  {formatCurrency(ozProjection.depreciationTaxSavings)} in Year 1
                </span>
              </div>
              <div className="flex items-center py-2 border-b border-gray-200">
                <span className="text-gray-600 flex-1" style={{ 
                  fontFamily: 'Inter, Helvetica Neue, sans-serif'
                }}>OZ Capital Gains Deferral</span>
                <span className="font-semibold text-right flex-1" style={{ 
                  color: '#2c3e50',
                  fontFamily: 'Playfair Display, Georgia, serif'
                }}>
                  Defer {formatCurrency(taxesPaidNow)} in taxes until 2026
                </span>
              </div>
              <div className="flex items-center py-2 border-b border-gray-200">
                <span className="text-gray-600 flex-1" style={{ 
                  fontFamily: 'Inter, Helvetica Neue, sans-serif'
                }}>10-Year Tax-Free Appreciation</span>
                <span className="font-semibold text-right flex-1" style={{ 
                  color: '#2c3e50',
                  fontFamily: 'Playfair Display, Georgia, serif'
                }}>
                  Pay $0 in taxes on {formatCurrency(ozProjection.taxFreeGains)} in gains
                </span>
              </div>
              <div className="flex items-center py-2">
                <span className="text-gray-600 font-semibold flex-1" style={{ 
                  fontFamily: 'Inter, Helvetica Neue, sans-serif'
                }}>Total Stacked Benefits</span>
                <span className="font-bold text-lg text-right flex-1" style={{ 
                  color: '#2c3e50',
                  fontFamily: 'Playfair Display, Georgia, serif'
                }}>
                  {formatCurrency(ozProjection.totalStackedBenefits)}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between gap-4 mt-8">
        <Button variant="outline" onClick={onBack} className="btn-secondary">
          ← Back
        </Button>
        <Button onClick={onNext} className="btn-primary" style={{ 
          fontSize: '0.875rem',
          padding: 'var(--space-4) var(--space-6)'
        }}>
          View Investment Package →
        </Button>
      </div>
    </div>
  );
}
