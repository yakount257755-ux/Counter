import React, { useState, useEffect, useRef } from 'react';
import Keypad from './components/Keypad';
import HistoryPanel from './components/HistoryPanel';
import AIModal from './components/AIModal';
import { HistoryItem, CalculatorMode } from './types';
import { toBurmese } from './utils/numerals';
import { History, Moon, Sun, Languages, Bot, Calculator as CalcIcon } from 'lucide-react';

const App: React.FC = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [useBurmeseNumerals, setUseBurmeseNumerals] = useState(false);
  const displayRef = useRef<HTMLDivElement>(null);

  // Load theme preference
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Handle auto-scroll of display
  useEffect(() => {
    if (displayRef.current) {
      displayRef.current.scrollLeft = displayRef.current.scrollWidth;
    }
  }, [expression, result]);

  const handleKeyPress = (value: string, type: string) => {
    if (type === 'action') {
      if (value === 'clear') {
        setExpression('');
        setResult('');
      } else if (value === 'delete') {
        setExpression((prev) => prev.slice(0, -1));
      } else if (value === 'equals') {
        calculateResult();
      }
    } else {
      // Prevent multiple operators
      const lastChar = expression.slice(-1);
      const isLastOperator = ['+', '-', '*', '/', '%', '.'].includes(lastChar);
      const isNewOperator = ['+', '-', '*', '/', '%', '.'].includes(value);

      if (isLastOperator && isNewOperator) {
        setExpression((prev) => prev.slice(0, -1) + value);
      } else {
        setExpression((prev) => prev + value);
      }
    }
  };

  const calculateResult = () => {
    if (!expression) return;
    try {
      // Safe evaluation
      // Replace symbols for JS eval
      const sanitized = expression.replace(/×/g, '*').replace(/÷/g, '/');
      // Note: In production, use a parser like math.js. For this task, Function constructor is acceptable with strict input control from keypad.
      // eslint-disable-next-line no-new-func
      const calcFunc = new Function('return ' + sanitized); 
      const res = String(calcFunc());
      
      setResult(res);
      addToHistory(expression, res);
    } catch (error) {
      setResult('Error');
    }
  };

  const addToHistory = (exp: string, res: string) => {
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      expression: exp,
      result: res,
      timestamp: Date.now(),
    };
    setHistory((prev) => [newItem, ...prev].slice(0, 50)); // Keep last 50
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`min-h-screen w-full flex items-center justify-center p-4 bg-slate-100 dark:bg-slate-950 transition-colors duration-300 font-sans`}>
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden relative border border-slate-200 dark:border-slate-800 flex flex-col h-[85vh] md:h-auto md:min-h-[600px]">
        
        {/* Top Bar */}
        <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-900/50 z-10">
           <div className="flex items-center space-x-1">
             <CalcIcon className="text-indigo-600 dark:text-indigo-400" size={24} />
             <h1 className="font-burmese font-bold text-slate-700 dark:text-slate-200">ပေါင်းစက်</h1>
           </div>
           
           <div className="flex items-center space-x-2">
             <button 
               onClick={() => setIsAIModalOpen(true)}
               className="p-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-colors"
               title="AI Help"
             >
               <Bot size={20} />
             </button>
             
             <button 
               onClick={() => setUseBurmeseNumerals(!useBurmeseNumerals)}
               className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
               title="Toggle Language"
             >
               <Languages size={20} />
             </button>

             <button 
               onClick={toggleTheme}
               className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
             >
               {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
             </button>
             
             <button 
               onClick={() => setIsHistoryOpen(true)}
               className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
             >
               <History size={20} />
             </button>
           </div>
        </div>

        {/* Display Screen */}
        <div className="flex-1 flex flex-col justify-end p-6 space-y-2 bg-slate-50 dark:bg-slate-900/50">
          <div 
            ref={displayRef}
            className={`text-right text-slate-500 dark:text-slate-400 text-xl overflow-x-auto whitespace-nowrap scrollbar-hide ${useBurmeseNumerals ? 'font-burmese' : 'font-mono'}`}
          >
            {useBurmeseNumerals ? toBurmese(expression) : expression || '0'}
          </div>
          <div className={`text-right font-bold text-5xl text-slate-800 dark:text-white break-all truncate ${useBurmeseNumerals ? 'font-burmese' : 'font-sans'}`}>
            {result ? (useBurmeseNumerals ? toBurmese(result) : result) : (expression ? '' : (useBurmeseNumerals ? '၀' : '0'))}
          </div>
        </div>

        {/* Keypad Area */}
        <div className="bg-white dark:bg-slate-900 pt-2 pb-6 rounded-t-3xl shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.5)] z-0">
          <Keypad onPress={handleKeyPress} useBurmeseNumerals={useBurmeseNumerals} />
        </div>

        {/* Overlays */}
        <HistoryPanel 
          isOpen={isHistoryOpen} 
          onClose={() => setIsHistoryOpen(false)}
          history={history}
          onClear={() => setHistory([])}
          onSelect={(item) => {
            setExpression(item.expression);
            setResult(item.result);
            setIsHistoryOpen(false);
          }}
          useBurmeseNumerals={useBurmeseNumerals}
        />

        <AIModal 
          isOpen={isAIModalOpen}
          onClose={() => setIsAIModalOpen(false)}
          onApplyResult={(res) => {
            // For word problems, we usually can't put the whole text explanation back into the calc.
            // But if it's a number, we could. For now, AI modal is independent.
            setIsAIModalOpen(false);
          }}
        />

      </div>
    </div>
  );
};

export default App;