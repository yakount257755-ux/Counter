import React, { useState } from 'react';
import { solveMathProblem } from '../services/gemini';
import { CalculatorMode } from '../types';
import { Bot, X, Send, Loader2, Sparkles } from 'lucide-react';

interface AIModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyResult: (result: string) => void;
}

const AIModal: React.FC<AIModalProps> = ({ isOpen, onClose, onApplyResult }) => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setResponse(null);
    const result = await solveMathProblem(input);
    setResponse(result);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div className="flex items-center space-x-2">
            <Sparkles size={20} className="text-yellow-300" />
            <h2 className="font-burmese font-bold text-lg">AI ဖြင့် တွက်ချက်မည်</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <p className="font-burmese text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            သင်သိလိုသော သင်္ချာပုစ္ဆာ (သို့) မေးခွန်းကို မြန်မာလို (သို့) အင်္ဂလိပ်လို ရေးသားမေးမြန်းနိုင်ပါသည်။
            <br/>
            <span className="text-xs opacity-70">(ဥပမာ - "ပန်းသီး ၅ လုံးကို ၂၀၀၀ ကျပ်ဆိုရင် ၁ လုံးဘယ်လောက်လဲ?")</span>
          </p>

          <form onSubmit={handleSubmit} className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="မေးခွန်း ရေးပါ..."
              className="w-full p-4 pr-12 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-500 outline-none resize-none h-32 font-burmese transition-all"
            />
            <button 
              type="submit" 
              disabled={loading || !input.trim()}
              className="absolute bottom-3 right-3 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg"
            >
              {loading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
            </button>
          </form>

          {response && (
            <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-4 border border-indigo-100 dark:border-indigo-900/50">
              <div className="flex items-start space-x-3">
                <div className="bg-indigo-100 dark:bg-indigo-800 p-2 rounded-lg">
                  <Bot size={20} className="text-indigo-600 dark:text-indigo-300" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-indigo-900 dark:text-indigo-200 mb-2 font-burmese">အဖြေ (Answer)</h3>
                  <div className="prose prose-sm dark:prose-invert font-burmese whitespace-pre-wrap leading-7">
                    {response}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIModal;