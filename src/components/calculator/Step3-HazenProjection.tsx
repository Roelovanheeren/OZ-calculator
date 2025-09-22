'use client';

import React, { useState } from 'react';
import { InvestorProfile, TaxCalculation } from '../../types/calculator';
import { Button } from '../ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Slider } from '../ui/Slider';
import { RadioGroup } from '../ui/RadioGroup';
import { formatCurrency } from '../../lib/utils/formatters';
import { HAZEN_PROJECT_DATA, HOLD_PERIODS } from '../../lib/data/hazenData';

interface Props {
  profile: Partial<InvestorProfile>;
  taxCalculation: TaxCalculation | null;
  onComplete: (data: { investmentAmount: number; scenario: string; holdPeriod: number }) => void;
  onBack: () => void;
}

export function Step3HazenProjection({ onComplete, onBack }: Props) {
  const [investmentAmount, setInvestmentAmount] = useState(500000);
  const [scenario] = useState<'conservative' | 'moderate' | 'optimistic'>('moderate'); // Fixed to moderate scenario
  const [holdPeriod, setHoldPeriod] = useState(10);

  // Scenario is now fixed to 'moderate' - no user selection needed

  const handleSubmit = () => {
    onComplete({
      investmentAmount,
      scenario,
      holdPeriod
    });
  };

  // Calculate projected returns for display
  const scenarioData = HAZEN_PROJECT_DATA.scenarios[scenario];
  const projectedValue = investmentAmount * Math.pow(1 + scenarioData.irr, holdPeriod);
  const taxFreeGains = projectedValue - investmentAmount;

  return (
    <div className="max-w-6xl mx-auto">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl text-center" style={{ 
            color: 'var(--primary-navy)',
            fontFamily: 'var(--font-primary)'
          }}>
            Your Potential Tax Savings with Hazen Road Opportunity Zone Investment
          </CardTitle>
          <CardContent className="text-center" style={{ 
            color: 'var(--text-secondary)',
            fontFamily: 'var(--font-secondary)'
          }}>
            Real Hazen Road project data and your personalized projections
          </CardContent>
        </CardHeader>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Project Details */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Hazen Road Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Total Development Cost:</span>
                  <div className="font-semibold">{formatCurrency(HAZEN_PROJECT_DATA.totalCost)}</div>
                </div>
                <div>
                  <span className="text-gray-600">Unit Count:</span>
                  <div className="font-semibold">{HAZEN_PROJECT_DATA.unitCount} units</div>
                </div>
                <div>
                  <span className="text-gray-600">Cost per Unit:</span>
                  <div className="font-semibold">{formatCurrency(HAZEN_PROJECT_DATA.costPerUnit)}</div>
                </div>
                <div>
                  <span className="text-gray-600">Location:</span>
                  <div className="font-semibold">{HAZEN_PROJECT_DATA.marketData.location}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Projected Results - Moved to left column */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Projected Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {formatCurrency(projectedValue)}
                </div>
                <p className="text-gray-600">Projected Value in {holdPeriod} Years</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Initial Investment:</span>
                  <div className="font-semibold">{formatCurrency(investmentAmount)}</div>
                </div>
                <div>
                  <span className="text-gray-600">Tax-Free Gains:</span>
                  <div className="font-semibold text-green-600">{formatCurrency(taxFreeGains)}</div>
                </div>
                <div>
                  <span className="text-gray-600">Annual Return:</span>
                  <div className="font-semibold">{(scenarioData.irr * 100).toFixed(1)}%</div>
                </div>
                <div>
                  <span className="text-gray-600">Development Yield:</span>
                  <div className="font-semibold">{(scenarioData.yield * 100).toFixed(2)}%</div>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Investment Configuration */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Investment Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Investment Amount
                  </label>
                  
                  {/* Slider Option */}
                  <div className="mb-4">
                    <Slider
                      min={250000}
                      max={21000000}
                      step={25000}
                      value={investmentAmount}
                      onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                      formatValue={(value) => formatCurrency(value)}
                    />
                  </div>

                  {/* Input Option */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Or enter amount directly (USD):
                    </label>
                    <input
                      type="number"
                      value={investmentAmount}
                      onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                      min={250000}
                      max={21000000}
                      step={1000}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                      placeholder="1000000"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Minimum: $250,000 | Maximum: $21,000,000
                    </p>
                  </div>
                </div>
              </div>

              <RadioGroup
                label="Hold Period"
                name="holdPeriod"
                options={HOLD_PERIODS}
                value={holdPeriod}
                onChange={(value) => setHoldPeriod(Number(value))}
              />
            </CardContent>
          </Card>

        </div>
      </div>

      {/* Bonus Depreciation Section */}
      <div className="mt-8">
        <div className="bg-white rounded-lg p-6 border border-gray-200 mb-6" style={{
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
          borderRadius: '12px'
        }}>
          <h3 className="text-xl font-bold mb-4" style={{ 
            color: '#2c3e50',
            fontFamily: 'Playfair Display, Georgia, serif'
          }}>
            Additional Tax Benefit: 100% Bonus Depreciation
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200" style={{
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
              borderRadius: '8px'
            }}>
              <h4 className="font-semibold mb-2" style={{ 
                color: '#000000',
                fontFamily: 'Inter, Helvetica Neue, sans-serif'
              }}>Your Depreciation Deduction</h4>
              <div className="text-2xl font-bold" style={{ 
                color: '#2c3e50',
                fontFamily: 'Playfair Display, Georgia, serif'
              }}>
                ${Math.round((investmentAmount / HAZEN_PROJECT_DATA.totalCost) * HAZEN_PROJECT_DATA.bonusDepreciation.qualifyingAssets).toLocaleString()}
              </div>
              <p className="text-sm mt-1" style={{ 
                color: '#6c757d',
                fontFamily: 'Inter, Helvetica Neue, sans-serif'
              }}>
                100% deductible in Year 1 against other income
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-gray-200" style={{
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
              borderRadius: '8px'
            }}>
              <h4 className="font-semibold mb-2" style={{ 
                color: '#000000',
                fontFamily: 'Inter, Helvetica Neue, sans-serif'
              }}>Immediate Tax Savings</h4>
              <div className="text-2xl font-bold" style={{ 
                color: '#2c3e50',
                fontFamily: 'Playfair Display, Georgia, serif'
              }}>
                ${Math.round((investmentAmount / HAZEN_PROJECT_DATA.totalCost) * HAZEN_PROJECT_DATA.bonusDepreciation.qualifyingAssets * 0.395).toLocaleString()}
              </div>
              <p className="text-sm mt-1" style={{ 
                color: '#6c757d',
                fontFamily: 'Inter, Helvetica Neue, sans-serif'
              }}>
                Reduces your current year tax obligations
              </p>
            </div>
          </div>
          
          <div className="mt-4 p-3 rounded-lg bg-blue-50 border border-blue-200" style={{
            color: '#2c3e50'
          }}>
            <p className="text-sm" style={{ fontFamily: 'Inter, Helvetica Neue, sans-serif' }}>
              <strong>BONUS:</strong> Your Year 1 cash distributions will be 
              effectively tax-free due to depreciation benefits!
            </p>
          </div>
        </div>

        {/* Triple-Stacked Benefits Summary */}
        <div className="bg-white rounded-lg p-6 border border-gray-200" style={{
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
          borderRadius: '12px'
        }}>
          <h3 className="text-xl font-bold mb-4" style={{ 
            fontFamily: 'Playfair Display, Georgia, serif',
            color: '#2c3e50'
          }}>
            Your Triple-Stacked Tax Benefits
          </h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50" style={{ 
              backgroundColor: '#f8f9fa',
              borderRadius: '8px'
            }}>
              <span className="font-medium" style={{ 
                color: '#2c3e50',
                fontFamily: 'Inter, Helvetica Neue, sans-serif'
              }}>Immediate Depreciation Savings</span>
              <span className="text-lg font-bold" style={{ 
                color: '#2c3e50',
                fontFamily: 'Playfair Display, Georgia, serif'
              }}>
                ${Math.round((investmentAmount / HAZEN_PROJECT_DATA.totalCost) * HAZEN_PROJECT_DATA.bonusDepreciation.qualifyingAssets * 0.395).toLocaleString()}
              </span>
            </div>
            
            <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50" style={{ 
              backgroundColor: '#f8f9fa',
              borderRadius: '8px'
            }}>
              <span className="font-medium" style={{ 
                color: '#2c3e50',
                fontFamily: 'Inter, Helvetica Neue, sans-serif'
              }}>OZ Capital Gains Deferral</span>
              <span className="text-lg font-bold" style={{ 
                color: '#2c3e50',
                fontFamily: 'Playfair Display, Georgia, serif'
              }}>
                ${Math.round(investmentAmount * 0.20).toLocaleString()}
              </span>
            </div>
            
            <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50" style={{ 
              backgroundColor: '#f8f9fa',
              borderRadius: '8px'
            }}>
              <span className="font-medium" style={{ 
                color: '#2c3e50',
                fontFamily: 'Inter, Helvetica Neue, sans-serif'
              }}>10-Year Tax-Free Appreciation</span>
              <span className="text-lg font-bold" style={{ 
                color: '#2c3e50',
                fontFamily: 'Playfair Display, Georgia, serif'
              }}>
                ${Math.round(taxFreeGains * 0.225).toLocaleString()}
              </span>
            </div>
            
            <div className="border-t-2 pt-3" style={{ borderColor: '#e9ecef' }}>
              <div className="flex justify-between items-center p-4 rounded-lg bg-white" style={{
                color: '#2c3e50',
                border: '2px solid #2c3e50',
                borderRadius: '8px'
              }}>
                <span className="text-xl font-bold" style={{ 
                  fontFamily: 'Inter, Helvetica Neue, sans-serif'
                }}>Total Tax Advantage</span>
                <span className="text-2xl font-bold" style={{ 
                  fontFamily: 'Playfair Display, Georgia, serif'
                }}>
                  ${Math.round((investmentAmount / HAZEN_PROJECT_DATA.totalCost) * HAZEN_PROJECT_DATA.bonusDepreciation.qualifyingAssets * 0.395 + investmentAmount * 0.20 + taxFreeGains * 0.225).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onBack} className="btn-secondary">
          ← Back
        </Button>
        <Button onClick={handleSubmit} className="btn-primary" style={{ 
          fontSize: '1.125rem',
          padding: 'var(--space-4) var(--space-6)'
        }}>
          See Comparison →
        </Button>
      </div>
    </div>
  );
}
