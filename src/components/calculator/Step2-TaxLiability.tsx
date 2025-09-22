import React from 'react';
import { TaxCalculation } from '../../types/calculator';
import { Button } from '../ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { formatCurrency, formatPercentage } from '../../lib/utils/formatters';

interface Props {
  taxCalculation: TaxCalculation;
  onNext: () => void;
  onBack: () => void;
}

export function Step2TaxLiability({ taxCalculation, onNext, onBack }: Props) {
  const {
    federalRate,
    stateRate,
    niitApplies,
    totalTaxOwed,
    deadlineDate,
    federalTax,
    niitTax,
    stateTax
  } = taxCalculation;

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-red-600">
            Your Current Tax Burden Without OZ Investment
          </CardTitle>
          <CardContent className="text-center text-gray-600">
            Here's what you&apos;ll owe in taxes on your capital gains
          </CardContent>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Tax Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Tax Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-600">Federal Capital Gains Tax</span>
              <span className="font-semibold">{formatPercentage(federalRate)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-600">Federal Tax Amount</span>
              <span className="font-semibold">{formatCurrency(federalTax)}</span>
            </div>
            
            {niitApplies && (
              <>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Net Investment Income Tax (NIIT)</span>
                  <span className="font-semibold">3.8%</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">NIIT Amount</span>
                  <span className="font-semibold">{formatCurrency(niitTax)}</span>
                </div>
              </>
            )}
            
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-600">State Capital Gains Tax</span>
              <span className="font-semibold">{formatPercentage(stateRate)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-600">State Tax Amount</span>
              <span className="font-semibold">{formatCurrency(stateTax)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Total Tax Owed */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Tax Liability</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-4xl font-bold text-red-600 mb-4">
              {formatCurrency(totalTaxOwed)}
            </div>
            <p className="text-gray-600 mb-6">
              This is what you&apos;ll pay in taxes on your capital gains
            </p>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-yellow-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-yellow-800">
                    180-Day Deadline
                  </p>
                  <p className="text-sm text-yellow-700">
                    You have until <strong>{deadlineDate}</strong> to invest in a Qualified Opportunity Fund
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onBack}>
          ← Back
        </Button>
        <Button onClick={onNext} size="lg">
          See OZ Benefits →
        </Button>
      </div>
    </div>
  );
}
