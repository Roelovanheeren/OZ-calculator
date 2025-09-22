import React from 'react';
import { cn } from '../../lib/utils/cn';

interface RadioOption {
  value: string | number;
  label: string;
  description?: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  label?: string;
  error?: string;
  options: RadioOption[];
  value?: string | number;
  onChange?: (value: string | number) => void;
  name: string;
  className?: string;
}

export function RadioGroup({
  label,
  error,
  options,
  value,
  onChange,
  name,
  className
}: RadioGroupProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="space-y-2">
        {options.map((option) => (
          <label
            key={option.value}
            className={cn(
              'flex items-start space-x-3 p-3 rounded-lg border cursor-pointer transition-colors',
              value === option.value
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300',
              option.disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => !option.disabled && onChange?.(option.value)}
              disabled={option.disabled}
              className="mt-1 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">
                {option.label}
              </div>
              {option.description && (
                <div className="text-sm text-gray-500 mt-1">
                  {option.description}
                </div>
              )}
            </div>
          </label>
        ))}
      </div>
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
