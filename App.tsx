
import React, { useState, useEffect, useMemo } from 'react';
import { Sale } from './types';
import { 
  formatCurrency, 
  getCurrentMonthKey, 
  getTodayStr, 
  monthKeyToLabel 
} from './utils';
import Header from './components/Header';
import SummaryCards from './components/SummaryCards';
import SaleForm from './components/SaleForm';
import SaleList from './components/SaleList';
import HistoryView from './components/HistoryView';
import LoginPage from './components/LoginPage';

const STORAGE_PREFIX = 'financas_pro_sales_';
const USER_KEY = 'financas_pro_user';

const App: React.FC = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [viewMonth, setViewMonth] = useState<string>(getCurrentMonthKey());
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [user, setUser] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  // 1. Check for logged in user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem(USER_KEY);
    if (savedUser) {
      setUser(savedUser);
    }
    setIsReady(true);
  }, []);

  // 2. Load sales specific to the current user whenever the user changes
  useEffect(() => {
    if (user) {
      const userSalesKey = `${STORAGE_PREFIX}${user}`;
      const savedSales = localStorage.getItem(userSalesKey);
      if (savedSales) {
        try {
          setSales(JSON.parse(savedSales));
        } catch (e) {
          console.error("Failed to load sales for user", user, e);
          setSales([]);
        }
      } else {
        setSales([]); // New user, start fresh
      }
      setViewMonth(getCurrentMonthKey());
    } else {
      setSales([]); // No user, clear sales
    }
  }, [user]);

  // 3. Save sales data to user-specific key on change
  useEffect(() => {
    if (isReady && user) {
      const userSalesKey = `${STORAGE_PREFIX}${user}`;
      localStorage.setItem(userSalesKey, JSON.stringify(sales));
    }
  }, [sales, isReady, user]);

  const handleLogin = (email: string) => {
    setUser(email);
    localStorage.setItem(USER_KEY, email);
  };

  const handleLogout = () => {
    if (confirm('Deseja realmente sair? Seus dados permanecem salvos vinculados ao seu e-mail.')) {
      setUser(null);
      localStorage.removeItem(USER_KEY);
      setSales([]);
      setShowHistory(false);
    }
  };

  const addSale = (name: string, value: number, customerName?: string) => {
    const now = new Date();
    const newSale: Sale = {
      id: crypto.randomUUID(),
      productName: name,
      customerName: customerName?.trim() || undefined,
      value: value,
      timestamp: now.getTime(),
      dateStr: getTodayStr(),
      monthKey: getCurrentMonthKey(),
    };
    setSales(prev => [newSale, ...prev]);
    setViewMonth(getCurrentMonthKey());
  };

  const deleteSale = (id: string) => {
    setSales(prev => prev.filter(s => s.id !== id));
  };

  const filteredSales = useMemo(() => {
    return sales.filter(s => s.monthKey === viewMonth);
  }, [sales, viewMonth]);

  const dailyTotal = useMemo(() => {
    const today = getTodayStr();
    return sales
      .filter(s => s.dateStr === today)
      .reduce((acc, curr) => acc + curr.value, 0);
  }, [sales]);

  const monthlyTotal = useMemo(() => {
    return filteredSales.reduce((acc, curr) => acc + curr.value, 0);
  }, [filteredSales]);

  const availableMonths = useMemo(() => {
    const months = Array.from(new Set(sales.map(s => s.monthKey)));
    const current = getCurrentMonthKey();
    if (!months.includes(current)) {
      months.push(current);
    }
    return months.sort().reverse();
  }, [sales]);

  if (!isReady) return null;

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <Header 
        onToggleHistory={() => setShowHistory(!showHistory)} 
        isHistoryOpen={showHistory} 
        userEmail={user}
        onLogout={handleLogout}
      />

      <main className="max-w-4xl mx-auto px-4 mt-6 space-y-6">
        {showHistory ? (
          <HistoryView 
            availableMonths={availableMonths}
            currentViewMonth={viewMonth}
            onSelectMonth={(month) => {
              setViewMonth(month);
              setShowHistory(false);
            }}
            sales={sales}
          />
        ) : (
          <>
            <div className="flex justify-between items-center mb-2">
              <div className="flex flex-col">
                <h2 className="text-xl font-bold text-slate-800">
                  {viewMonth === getCurrentMonthKey() ? 'Vendas de Hoje' : `Vendas de ${monthKeyToLabel(viewMonth)}`}
                </h2>
                <p className="text-xs text-slate-400">Conta: {user}</p>
              </div>
              {viewMonth !== getCurrentMonthKey() && (
                <button 
                  onClick={() => setViewMonth(getCurrentMonthKey())}
                  className="text-sm font-medium text-emerald-600 hover:text-emerald-700 underline"
                >
                  Voltar para hoje
                </button>
              )}
            </div>

            <SummaryCards 
              dailyTotal={dailyTotal} 
              monthlyTotal={monthlyTotal} 
              isCurrentMonth={viewMonth === getCurrentMonthKey()}
            />

            {viewMonth === getCurrentMonthKey() && (
              <SaleForm onAddSale={addSale} />
            )}

            <SaleList 
              sales={filteredSales} 
              onDeleteSale={deleteSale} 
              emptyMessage={viewMonth === getCurrentMonthKey() ? "Nenhuma venda registrada hoje." : "Nenhuma venda encontrada para este mês."}
            />
          </>
        )}
      </main>
      
      <div className="fixed bottom-6 right-6 md:hidden">
        <button 
          onClick={() => setShowHistory(!showHistory)}
          className="w-14 h-14 bg-emerald-600 text-white rounded-full shadow-lg flex items-center justify-center text-xl hover:bg-emerald-700 transition-colors"
        >
          <i className={`fa-solid ${showHistory ? 'fa-arrow-left' : 'fa-clock-rotate-left'}`}></i>
        </button>
      </div>
    </div>
  );
};

export default App;
