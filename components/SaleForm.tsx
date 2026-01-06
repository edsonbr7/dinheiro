
import React, { useState } from 'react';

interface SaleFormProps {
  onAddSale: (name: string, value: number, customerName?: string) => void;
}

const SaleForm: React.FC<SaleFormProps> = ({ onAddSale }) => {
  const [name, setName] = useState('');
  const [customer, setCustomer] = useState('');
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !value) return;
    
    const numericValue = parseFloat(value.replace(',', '.'));
    if (isNaN(numericValue) || numericValue <= 0) return;

    onAddSale(name, numericValue, customer);
    setName('');
    setCustomer('');
    setValue('');
  };

  return (
    <section className="bg-white p-6 rounded-2xl shadow-md border border-slate-100">
      <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <i className="fa-solid fa-plus-circle text-emerald-500"></i>
        Nova Venda
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-[2]">
            <label htmlFor="product" className="block text-xs font-semibold text-slate-500 mb-1 ml-1 uppercase">Produto</label>
            <input
              id="product"
              type="text"
              placeholder="Ex: Camiseta Branca"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              required
            />
          </div>
          <div className="flex-[1]">
            <label htmlFor="customer" className="block text-xs font-semibold text-slate-500 mb-1 ml-1 uppercase">Cliente (Opcional)</label>
            <input
              id="customer"
              type="text"
              placeholder="Ex: João Silva"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
          </div>
          <div className="w-full md:w-40">
            <label htmlFor="value" className="block text-xs font-semibold text-slate-500 mb-1 ml-1 uppercase">Valor (R$)</label>
            <input
              id="value"
              type="text"
              inputMode="decimal"
              placeholder="0,00"
              value={value}
              onChange={(e) => {
                const val = e.target.value;
                if (val === '' || /^[0-9.,]*$/.test(val)) {
                  setValue(val);
                }
              }}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all font-bold text-slate-700"
              required
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 group"
          >
            <i className="fa-solid fa-check group-hover:scale-110 transition-transform"></i>
            <span>Confirmar Venda</span>
          </button>
        </div>
      </form>
    </section>
  );
};

export default SaleForm;
