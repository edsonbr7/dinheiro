
import React from 'react';

interface HeaderProps {
  onToggleHistory: () => void;
  isHistoryOpen: boolean;
  userEmail: string | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleHistory, isHistoryOpen, userEmail, onLogout }) => {
  return (
    <header className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white shadow-lg sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-white/20 p-2 rounded-lg">
            <i className="fa-solid fa-wallet text-xl"></i>
          </div>
          <h1 className="text-xl font-bold tracking-tight">Finanças<span className="font-light">Pro</span></h1>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={onToggleHistory}
            className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-full transition-all text-sm font-medium ${
              isHistoryOpen ? 'bg-white text-emerald-700' : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            <i className={`fa-solid ${isHistoryOpen ? 'fa-arrow-left' : 'fa-clock-rotate-left'}`}></i>
            {isHistoryOpen ? 'Voltar' : 'Histórico'}
          </button>

          {userEmail && (
            <div className="flex items-center gap-3 border-l border-white/20 pl-3">
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10">
                <div className="w-6 h-6 bg-white text-emerald-600 rounded-full flex items-center justify-center text-[10px] font-black shrink-0">
                  {userEmail.charAt(0).toUpperCase()}
                </div>
                <span className="hidden md:block text-xs font-semibold truncate max-w-[150px] opacity-90">
                  {userEmail}
                </span>
              </div>
              <button 
                onClick={onLogout}
                className="p-2 hover:bg-white/10 rounded-full transition-colors flex items-center justify-center"
                title="Sair da conta"
              >
                <i className="fa-solid fa-right-from-bracket opacity-80 hover:opacity-100"></i>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
