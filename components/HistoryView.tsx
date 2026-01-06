
import React from 'react';
import { Sale } from '../types';
import { formatCurrency, monthKeyToLabel } from '../utils';

interface HistoryViewProps {
  availableMonths: string[];
  currentViewMonth: string;
  onSelectMonth: (month: string) => void;
  sales: Sale[];
}

const HistoryView: React.FC<HistoryViewProps> = ({ 
  availableMonths, 
  currentViewMonth, 
  onSelectMonth,
  sales 
}) => {
  const getMonthStats = (monthKey: string) => {
    const filtered = sales.filter(s => s.monthKey === monthKey);
    const total = filtered.reduce((acc, curr) => acc + curr.value, 0);
    return {
      total,
      count: filtered.length
    };
  };

  return (
    <section className="space-y-6 animate-in fade-in duration-300">
      <h2 className="text-xl font-bold text-slate-800 mb-2">Histórico de Faturamento</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {availableMonths.map((monthKey) => {
          const stats = getMonthStats(monthKey);
          const isActive = monthKey === currentViewMonth;
          
          return (
            <button
              key={monthKey}
              onClick={() => onSelectMonth(monthKey)}
              className={`p-6 rounded-2xl text-left transition-all border ${
                isActive 
                ? 'bg-emerald-50 border-emerald-200 shadow-md ring-2 ring-emerald-500 ring-offset-2' 
                : 'bg-white border-slate-100 shadow-sm hover:shadow-md hover:border-slate-300'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center text-lg ${
                  isActive ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  <i className="fa-solid fa-calendar"></i>
                </div>
                {isActive && (
                  <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-1 rounded font-bold uppercase tracking-widest">Ativo</span>
                )}
              </div>
              
              <h4 className="font-bold text-slate-800 mb-1">{monthKeyToLabel(monthKey)}</h4>
              <p className="text-2xl font-black text-emerald-600 mb-2">{formatCurrency(stats.total)}</p>
              
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <i className="fa-solid fa-tag"></i>
                <span>{stats.count} {stats.count === 1 ? 'venda' : 'vendas'}</span>
              </div>
            </button>
          );
        })}
      </div>

      {availableMonths.length === 0 && (
        <div className="bg-white p-12 rounded-2xl shadow-sm border border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400">
          <i className="fa-solid fa-clock-rotate-left text-4xl mb-3 opacity-20"></i>
          <p>Nenhum histórico disponível ainda.</p>
        </div>
      )}
    </section>
  );
};

export default HistoryView;
