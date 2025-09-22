'use client';

import React, { useState } from 'react';
import { InvestorProfile, TaxCalculation } from '../../types/calculator';
import { Button } from '../ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Slider } from '../ui/Slider';
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
  const [scenario] = useState<'conservative' | 'moderate' | 'optimistic'>('moderate');
  const [holdPeriod, setHoldPeriod] = useState(10);

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
        {/* Left Column - Investment Configuration */}
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
                      max={19323884}
                      step={25000}
                      value={investmentAmount || ""}
                      onChange={(e) => setInvestmentAmount(Number(e.target.value) || 0)}
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
                      value={investmentAmount || ""}
                      onChange={(e) => setInvestmentAmount(Number(e.target.value) || 0)}
                      min={250000}
                      max={19323884}
                      step={1000}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm bg-gray-50"
                      placeholder="1000000"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Minimum: $250,000 | Maximum: $19,323,884
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium form-label">
                  Hold Period
                </label>
                <div className="space-y-2">
                  {HOLD_PERIODS.map((period) => (
                    <label key={period.value} className="flex items-start space-x-3 p-3 cursor-pointer transition-colors" style={{
                      backgroundColor: 'transparent'
                    }}>
                      <input
                        type="radio"
                        value={period.value}
                        checked={holdPeriod === period.value}
                        onChange={(e) => setHoldPeriod(Number(e.target.value))}
                        className="mt-1 h-4 w-4"
                        style={{
                          accentColor: '#2c3e50'
                        }}
                      />
                      <div className="flex-1">
                        <div className="text-sm font-medium" style={{ color: '#000000' }}>
                          {period.label}
                        </div>
                        <div className="text-sm mt-1" style={{ color: '#6c757d' }}>
                          {period.description}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Project Details and Results */}
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

          {/* Projected Results */}
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
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between mt-8 gap-4">
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
// FORCE REBUILD - Mon Sep 22 17:03:04 WITA 2025
