import React from 'react';
import { cn } from '../../lib/utils/cn';

interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  min: number;
  max: number;
  step?: number;
  formatValue?: (value: number) => string;
}

export function Slider({
  label,
  error,
  min,
  max,
  step = 1,
  formatValue = (value) => value.toString(),
  className,
  ...props
}: SliderProps) {
  const sliderId = props.id || props.name;
  const [value, setValue] = React.useState(props.value || min);
  
  React.useEffect(() => {
    if (props.value !== undefined) {
      setValue(props.value);
    }
  }, [props.value]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
    props.onChange?.(e);
  };
  
  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={sliderId} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="space-y-2">
        <input
          id={sliderId}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          className={cn(
            'w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider',
            error && 'border-red-300',
            className
          )}
          {...props}
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>{formatValue(min)}</span>
          <span className="font-medium text-blue-600">{formatValue(Number(value))}</span>
          <span>{formatValue(max)}</span>
        </div>
      </div>
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
