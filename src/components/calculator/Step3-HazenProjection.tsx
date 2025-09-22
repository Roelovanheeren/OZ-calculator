'use client';

import React, { useState } from 'react';
import { InvestorProfile, TaxCalculation } from '../../types/calculator';
import { Button } from '../ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Slider } from '../ui/Slider';
import { formatCurrency } from '../../lib/utils/formatters';
import { HAZEN_PROJECT_DATA } from '../../lib/data/hazenData';

interface Props {
  profile: Partial<InvestorProfile>;
  taxCalculation: TaxCalculation | null;
  onComplete: (data: { investmentAmount: number; scenario: string; holdPeriod: number }) => void;
  onBack: () => void;
}

export function Step3HazenProjection({ profile, onComplete, onBack }: Props) {
  // Use capital gains amount as default investment, capped at max LP equity
  const defaultInvestment = Math.min(profile.capitalGainAmount || 500000, 19325000);
  const [investmentAmount, setInvestmentAmount] = useState(defaultInvestment);
  const [scenario] = useState<'conservative' | 'moderate' | 'optimistic'>('moderate');

  const handleSubmit = () => {
    onComplete({
      investmentAmount,
      scenario,
      holdPeriod: 10 // Fixed hold period since it doesn't affect the calculation
    });
  };

  // Calculate projected returns using proportional LP method
  const scenarioData = HAZEN_PROJECT_DATA.scenarios[scenario];
  
  // Updated calculations based on actual model data
  const noiYear10 = 5159032; // $5,159,032 NOI Year 10
  const exitCapRate = 0.045; // 4.50% exit cap rate
  const allInDevelopmentCost = 52109710; // $52,109,710 all-in development cost
  const lpEquityRequired = 19323884; // $19,323,884 total LP equity
  const lpPrefReturn = 5828528; // $5,828,528 LP preferred return
  
  // Calculate exit value and profit
  const impliedExitValue = noiYear10 / exitCapRate; // $114,645,146
  const developmentProfit = impliedExitValue - allInDevelopmentCost; // $62,535,436
  const profitForSplit = developmentProfit - lpPrefReturn; // $56,706,908
  const lpShareOfSplit = profitForSplit * 0.5; // $28,353,454 (50/50 split)
  const lpProfit = lpPrefReturn + lpShareOfSplit; // $34,181,982
  const totalToLP = lpProfit + lpEquityRequired; // $53,505,866
  
  // Calculate investor's pro-rata share of the LP equity
  const investorShare = Math.min(investmentAmount, lpEquityRequired) / lpEquityRequired;
  
  // Projected value = investor's share of total LP value
  const projectedValue = totalToLP * investorShare;
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
                  <p className="text-xs text-gray-600 mb-2" style={{ 
                    fontFamily: 'Inter, Helvetica Neue, sans-serif'
                  }}>
                    Default set to your capital gains amount (100% deferral). Adjust as needed.
                  </p>
                  
                  {/* Slider Option */}
                  <div className="mb-4">
                    <Slider
                      min={250000}
                      max={19325000}
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
                      max={19325000}
                      step={1000}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-md focus:border-blue-500 focus:ring-blue-500 text-sm bg-white"
                      placeholder="1000000"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Minimum: $250,000 | Maximum: $19,325,000
                    </p>
                  </div>
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
                <p className="text-gray-600">Projected Value at Exit</p>
                <p className="text-xs text-blue-600 mt-2 font-medium">
                  *10-year hold period required for full OZ benefits
                </p>
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
                  <span className="text-gray-600">Projected Return:</span>
                  <div className="font-semibold">10.0%</div>
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
