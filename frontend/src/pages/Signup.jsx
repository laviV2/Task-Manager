import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signup } from '../api';
import Spinner from '../components/Spinner';
import Toast, { useToast } from '../components/Toast';

export default function Signup({ setUser }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('member');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toasts, showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await signup(name, email, password, role);
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
    <div className="min-h-screen bg-[#0D1117] flex items-center justify-center p-4">
      <Toast toasts={toasts} />
      
      <div className="w-full max-w-[440px] space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00C896] to-[#008F6A] shadow-lg shadow-[#00C896]/20 mb-4 animate-pulse">
            <span className="text-2xl font-black text-[#0D1117] tracking-tighter">TF</span>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Create Account</h1>
          <p className="text-[#8B949E] text-sm">Sign up to start managing your work.</p>
        </div>

        <div className="bg-[#161B22] border border-[#30363D] rounded-2xl p-8 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00C896] to-transparent opacity-50"></div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#8B949E] uppercase tracking-widest ml-1">Name</label>
              <div className="relative group/input">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#0D1117] border border-[#30363D] rounded-xl px-4 py-3 text-white placeholder-[#484F58] focus:border-[#00C896] focus:ring-1 focus:ring-[#00C896] outline-none transition-all duration-200"
                  placeholder="Full Name"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[#8B949E] uppercase tracking-widest ml-1">Email</label>
              <div className="relative group/input">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0D1117] border border-[#30363D] rounded-xl px-4 py-3 text-white placeholder-[#484F58] focus:border-[#00C896] focus:ring-1 focus:ring-[#00C896] outline-none transition-all duration-200"
                  placeholder="name@company.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[#8B949E] uppercase tracking-widest ml-1">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-[#0D1117] border border-[#30363D] rounded-xl px-4 py-3 text-white focus:border-[#00C896] outline-none appearance-none transition-all duration-200"
              >
                <option value="member">Member</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[#8B949E] uppercase tracking-widest ml-1">Password</label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#0D1117] border border-[#30363D] rounded-xl px-4 py-3 text-white placeholder-[#484F58] focus:border-[#00C896] focus:ring-1 focus:ring-[#00C896] outline-none transition-all duration-200"
                  placeholder="••••••••"
                  minLength="6"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#00C896] to-[#00A37B] text-[#0D1117] font-bold py-3.5 rounded-xl hover:shadow-lg hover:shadow-[#00C896]/20 active:scale-[0.98] transition-all duration-200 flex items-center justify-center space-x-2 mt-4"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-[#0D1117] border-t-transparent rounded-full animate-spin"></div>
                  <span className="tracking-wide">CREATING ACCOUNT...</span>
                </div>
              ) : (
                <span className="tracking-wide uppercase">Create Account</span>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-[#30363D] text-center">
            <p className="text-[#8B949E] text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-[#00C896] font-semibold hover:text-[#00E0A7] transition-colors ml-1">
                Sign In
              </Link>
            </p>
          </div>
        </div>

        {/* Footer info */}
        <div className="flex justify-between items-center text-[10px] text-[#484F58] uppercase tracking-[0.2em] px-2 font-medium">
          <span>Secure</span>
          <span className="w-1 h-1 bg-[#484F58] rounded-full"></span>
          <span>Fast</span>
          <span className="w-1 h-1 bg-[#484F58] rounded-full"></span>
          <span>Reliable</span>
        </div>
      </div>
    </div>
  );
}
