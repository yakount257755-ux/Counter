import React from 'react';
import { HistoryItem } from '../types';
import { toBurmese } from '../utils/numerals';
import { Trash2, Copy, History as HistoryIcon, Calculator } from 'lucide-react';

interface HistoryPanelProps {
  history: HistoryItem[];
  onClear: () => void;
  onSelect: (item: HistoryItem) => void;
  isOpen: boolean;
  onClose: () => void;
  useBurmeseNumerals: boolean;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ 
  history, 
  onClear, 
  onSelect, 
  isOpen, 
  onClose,
  useBurmeseNumerals
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-white dark:bg-slate-900 z-20 flex flex-col animate-fade-in transition-all duration-300">
      <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center space-x-2 text-slate-800 dark:text-white">
          <HistoryIcon size={20} />
          <h2 className="font-burmese text-lg font-bold">မှတ်တမ်း (History)</h2>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
           <Calculator size={20} className="text-slate-600 dark:text-slate-400"/>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-400">
            <HistoryIcon size={48} className="mb-4 opacity-20" />
            <p className="font-burmese">မှတ်တမ်း မရှိသေးပါ</p>
          </div>
        ) : (
          history.map((item) => (
            <div 
              key={item.id} 
              onClick={() => onSelect(item)}
              className="group p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 cursor-pointer transition-colors"
            >
              <div className="text-right mb-1">
                <span className={`text-sm text-slate-500 font-medium ${useBurmeseNumerals ? 'font-burmese' : ''}`}>
                  {useBurmeseNumerals ? toBurmese(item.expression) : item.expression}
                </span>
              </div>
              <div className="text-right">
                <span className={`text-xl font-bold text-indigo-600 dark:text-indigo-400 ${useBurmeseNumerals ? 'font-burmese' : ''}`}>
                  = {useBurmeseNumerals ? toBurmese(item.result) : item.result}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {history.length > 0 && (
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <button 
            onClick={onClear}
            className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30 transition-colors font-burmese font-semibold"
          >
            <Trash2 size={18} />
            <span>မှတ်တမ်းအားလုံးဖျက်မည်</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default HistoryPanel;