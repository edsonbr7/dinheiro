
import React, { useState } from 'react';

interface LoginPageProps {
  onLogin: (email: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState<'email' | 'google' | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMethod('email');
    setLoading(true);
    
    // Simulating authentication
    setTimeout(() => {
      onLogin(email);
      setLoading(false);
      setMethod(null);
    }, 1200);
  };

  const handleGoogleLogin = () => {
    setMethod('google');
    setLoading(true);
    
    // Simulating Google OAuth
    setTimeout(() => {
      onLogin('usuario.google@gmail.com');
      setLoading(false);
      setMethod(null);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl shadow-lg mb-4 text-white text-3xl">
            <i className="fa-solid fa-wallet"></i>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Finanças<span className="text-emerald-600">Pro</span></h1>
          <p className="text-slate-500 mt-2">Cada conta tem seus dados protegidos e individuais</p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200 border border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 mb-6 text-center">Acesse sua conta</h2>
          
          <div className="space-y-4">
            {/* Google Login Button */}
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-3 px-4 rounded-xl transition-all shadow-sm active:scale-[0.98] disabled:opacity-50"
            >
              {loading && method === 'google' ? (
                <i className="fa-solid fa-circle-notch fa-spin text-emerald-500"></i>
              ) : (
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
              )}
              <span>Entrar com Google</span>
            </button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-400 font-bold tracking-widest">ou e-mail</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">E-mail</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <i className="fa-solid fa-envelope"></i>
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder:text-slate-300"
                    placeholder="exemplo@vendas.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">Senha</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <i className="fa-solid fa-lock"></i>
                  </span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder:text-slate-300"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-bold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 group active:scale-[0.98]"
              >
                {loading && method === 'email' ? (
                  <i className="fa-solid fa-circle-notch fa-spin"></i>
                ) : (
                  <>
                    <span>Entrar no Painel</span>
                    <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500">
              Novo por aqui? <a href="#" className="text-emerald-600 font-bold hover:underline">Criar conta grátis</a>
            </p>
          </div>
        </div>
        
        <div className="mt-8 flex items-center justify-center gap-6 text-slate-400">
          <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold">
            <i className="fa-solid fa-shield-halved text-emerald-500"></i>
            Dados Seguros
          </div>
          <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold">
            <i className="fa-solid fa-cloud text-blue-500"></i>
            100% Online
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
