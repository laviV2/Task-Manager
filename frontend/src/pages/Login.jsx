import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api';
import Spinner from '../components/Spinner';
import Toast, { useToast } from '../components/Toast';

export default function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toasts, showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await login(email, password);
      localStorage.setItem('token', data.token);
      setUser(data.user);
      navigate('/dashboard');
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D1117] flex items-center justify-center p-6 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]">
      <Toast toasts={toasts} />
      <div className="bg-[#161B22] border border-[#30363D] rounded-3xl p-10 w-full max-w-md shadow-2xl animate-fadeIn">
        <div className="mb-10 text-center flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00C896] to-[#00A878] flex items-center justify-center text-[#0D1117] font-black text-2xl shadow-[0_0_20px_rgba(0,200,150,0.3)] mb-4 group hover:scale-105 transition-transform cursor-pointer">
            TF
          </div>
          <h1 className="text-[#F0F6FC] text-3xl font-black tracking-tight uppercase">Welcome Back</h1>
          <p className="text-[#8B949E] mt-2 font-bold text-[10px] tracking-[0.2em] uppercase">Sign in to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-[#8B949E] text-[10px] font-black uppercase tracking-widest ml-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0D1117] border border-[#30363D] rounded-xl px-5 py-4 text-[#F0F6FC] placeholder-[#30363D] focus:outline-none focus:border-[#00C896] transition-all font-medium"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-[#8B949E] text-[10px] font-black uppercase tracking-widest ml-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0D1117] border border-[#30363D] rounded-xl px-5 py-4 text-[#F0F6FC] placeholder-[#30363D] focus:outline-none focus:border-[#00C896] transition-all font-medium"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#00C896] text-[#0D1117] font-black py-5 rounded-xl hover:bg-[#00A878] active:scale-95 transition-all duration-200 mt-4 shadow-lg shadow-[#00C896]/10 disabled:opacity-50 flex items-center justify-center space-x-3"
          >
            {loading && <Spinner small color="#0D1117" />}
            <span>{loading ? 'SIGNING IN...' : 'SIGN IN'}</span>
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-[#8B949E] text-sm font-medium">
            New here?{' '}
            <Link to="/signup" className="text-[#00C896] font-black hover:underline uppercase text-xs tracking-widest ml-1">
              Create Account
            </Link>
          </p>
        </div>

        <div className="mt-8 p-6 bg-[#00C896]/5 border border-[#00C896]/10 rounded-2xl">
          <p className="font-black text-[10px] text-[#00C896] uppercase tracking-[0.2em] mb-3">Demo Login</p>
          <div className="space-y-1.5 font-mono text-xs">
            <p className="text-[#8B949E]">Email: <span className="text-[#F0F6FC]">admin@taskflow.com</span></p>
            <p className="text-[#8B949E]">Password: <span className="text-[#F0F6FC]">admin123</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
