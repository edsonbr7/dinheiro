
import React from 'react';
import { Sale } from '../types';
import { formatCurrency, getTodayStr } from '../utils';

interface SaleListProps {
  sales: Sale[];
  onDeleteSale: (id: string) => void;
  emptyMessage: string;
}

const SaleList: React.FC<SaleListProps> = ({ sales, onDeleteSale, emptyMessage }) => {
  const today = getTodayStr();

  if (sales.length === 0) {
    return (
      <div className="bg-white p-12 rounded-2xl shadow-sm border border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400">
        <i className="fa-solid fa-basket-shopping text-4xl mb-3 opacity-20"></i>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Venda</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Valor</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sales.map((sale) => {
              const isToday = sale.dateStr === today;
              return (
                <tr 
                  key={sale.id} 
                  className={`transition-colors relative ${isToday ? 'bg-emerald-50/30 hover:bg-emerald-50/50' : 'hover:bg-slate-50'}`}
                >
                  <td className="px-6 py-4 relative">
                    {isToday && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 rounded-r-full"></div>
                    )}
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-800">{sale.productName}</span>
                        {isToday && (
                          <span className="text-[9px] bg-emerald-500 text-white px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wide flex items-center gap-0.5 shadow-sm">
                            <i className="fa-solid fa-star text-[7px]"></i>
                            Hoje
                          </span>
                        )}
                      </div>
                      {sale.customerName && (
                        <span className="text-xs font-medium text-emerald-600 flex items-center gap-1 mt-0.5">
                          <i className="fa-solid fa-user text-[10px]"></i>
                          {sale.customerName}
                        </span>
                      )}
                      <span className="text-[10px] text-slate-400 mt-1 uppercase tracking-tight">
                        {new Date(sale.timestamp).toLocaleDateString('pt-BR')} • {new Date(sale.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={`font-bold text-lg ${isToday ? 'text-emerald-700' : 'text-slate-900'}`}>
                      {formatCurrency(sale.value)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => {
                        if (confirm(`Excluir venda de "${sale.productName}"?`)) {
                          onDeleteSale(sale.id);
                        }
                      }}
                      className="p-2 text-slate-300 hover:text-red-500 transition-colors hover:bg-red-50 rounded-lg"
                      title="Excluir"
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SaleList;
