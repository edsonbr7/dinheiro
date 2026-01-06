
import React from 'react';
import { formatCurrency } from '../utils';

interface SummaryCardsProps {
  dailyTotal: number;
  monthlyTotal: number;
  isCurrentMonth: boolean;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ dailyTotal, monthlyTotal, isCurrentMonth }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
        <div className="h-12 w-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center text-xl shrink-0">
          <i className="fa-solid fa-calendar-day"></i>
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total do Dia</p>
          <p className="text-2xl font-bold text-slate-800">{formatCurrency(dailyTotal)}</p>
        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
        <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-xl shrink-0">
          <i className="fa-solid fa-chart-line"></i>
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
            {isCurrentMonth ? 'Total do Mês' : 'Total deste Mês'}
          </p>
          <p className="text-2xl font-bold text-slate-800">{formatCurrency(monthlyTotal)}</p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;
