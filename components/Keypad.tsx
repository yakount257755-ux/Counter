import React from 'react';
import { ButtonConfig } from '../types';
import { toBurmese } from '../utils/numerals';

interface KeypadProps {
  onPress: (value: string, type: string) => void;
  useBurmeseNumerals: boolean;
}

const Keypad: React.FC<KeypadProps> = ({ onPress, useBurmeseNumerals }) => {
  
  const buttons: ButtonConfig[] = [
    { label: 'AC', value: 'clear', type: 'action', className: 'text-red-500 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50' },
    { label: '⌫', value: 'delete', type: 'action', className: 'text-orange-500 bg-orange-100 hover:bg-orange-200 dark:bg-orange-900/30 dark:hover:bg-orange-900/50' },
    { label: '%', value: '%', type: 'operator', className: 'text-cyan-600 bg-cyan-100 hover:bg-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-400' },
    { label: '÷', value: '/', type: 'operator', className: 'text-indigo-600 bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400' },
    
    { label: '7', secondaryLabel: '၇', value: '7', type: 'number' },
    { label: '8', secondaryLabel: '၈', value: '8', type: 'number' },
    { label: '9', secondaryLabel: '၉', value: '9', type: 'number' },
    { label: '×', value: '*', type: 'operator', className: 'text-indigo-600 bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400' },
    
    { label: '4', secondaryLabel: '၄', value: '4', type: 'number' },
    { label: '5', secondaryLabel: '၅', value: '5', type: 'number' },
    { label: '6', secondaryLabel: '၆', value: '6', type: 'number' },
    { label: '-', value: '-', type: 'operator', className: 'text-indigo-600 bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400' },
    
    { label: '1', secondaryLabel: '၁', value: '1', type: 'number' },
    { label: '2', secondaryLabel: '၂', value: '2', type: 'number' },
    { label: '3', secondaryLabel: '၃', value: '3', type: 'number' },
    { label: '+', value: '+', type: 'operator', className: 'text-indigo-600 bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400' },
    
    { label: '00', secondaryLabel: '၀၀', value: '00', type: 'number' },
    { label: '0', secondaryLabel: '၀', value: '0', type: 'number' },
    { label: '.', secondaryLabel: '.', value: '.', type: 'number' },
    { label: '=', value: 'equals', type: 'action', className: 'bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 shadow-md shadow-indigo-200 dark:shadow-none' },
  ];

  return (
    <div className="grid grid-cols-4 gap-3 p-4">
      {buttons.map((btn) => (
        <button
          key={btn.value}
          onClick={() => onPress(btn.value, btn.type)}
          className={`
            relative h-16 w-full rounded-2xl text-xl font-semibold transition-all duration-200 active:scale-95 flex items-center justify-center
            ${btn.className || 'bg-white text-slate-700 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 shadow-sm border border-slate-200 dark:border-slate-700'}
          `}
        >
          <span className={useBurmeseNumerals && btn.secondaryLabel ? "font-burmese text-2xl" : "font-sans"}>
             {useBurmeseNumerals && btn.secondaryLabel ? btn.secondaryLabel : btn.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default Keypad;