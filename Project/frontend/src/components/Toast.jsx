import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose }) {
  if (!message) return null;

  const isSuccess = type === 'success';
  const isError = type === 'error';

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl border text-sm font-medium ${
        isSuccess 
          ? 'bg-slate-900 text-white border-slate-700' 
          : isError 
            ? 'bg-rose-600 text-white border-rose-500' 
            : 'bg-indigo-600 text-white border-indigo-500'
      }`}>
        {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
        {isError && <AlertCircle className="w-5 h-5 text-white shrink-0" />}
        {!isSuccess && !isError && <Info className="w-5 h-5 text-white shrink-0" />}

        <span className="max-w-xs">{message}</span>

        <button
          onClick={onClose}
          className="ml-2 p-1 text-white/70 hover:text-white rounded-md transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

