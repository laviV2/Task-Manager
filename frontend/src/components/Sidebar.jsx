import { Link, useLocation } from 'react-router-dom';

export default function Sidebar({ user, setUser }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  // contextual project link when viewing a specific project
  const pathParts = location.pathname.split('/').filter(Boolean);
  let contextualItem = null;
  if (pathParts[0] === 'projects' && pathParts[1]) {
    const projectId = pathParts[1];
    contextualItem = { label: 'Project Tasks', path: `/tasks?projectId=${projectId}`, icon: '🗂️' };
  }

  const navItems = user?.role === 'admin' 
    ? [
        { label: 'Dashboard', path: '/dashboard', icon: '📊' },
        { label: 'Projects', path: '/projects', icon: '📁' },
        { label: 'Attendance', path: '/attendance', icon: '⏰' },
      ]
    : [
        { label: 'Dashboard', path: '/dashboard', icon: '📊' },
        { label: 'My Projects', path: '/projects', icon: '📁' },
        { label: 'Attendance', path: '/attendance', icon: '⏰' },
      ];

  return (
    <div className="h-screen w-72 bg-[#0D1117] border-r border-[#30363D] flex flex-col flex-shrink-0 z-50 transition-all duration-300 shadow-xl">
      {/* Logo */}
      <div className="p-8 border-b border-[#30363D] flex items-center justify-center">
        <div className="flex items-center space-x-3 group cursor-pointer">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00C896] to-[#00A878] flex items-center justify-center text-[#0D1117] font-black text-xl shadow-[0_0_20px_rgba(0,200,150,0.3)] group-hover:scale-105 transition-transform">
            TF
          </div>
          <span className="text-[#F0F6FC] font-black text-2xl tracking-tight">TaskFlow</span>
        </div>
      </div>

      {/* User Profile */}
      <div className="px-6 py-8 border-b border-[#30363D] bg-[#161B22]/50">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#30363D] to-[#21262D] border border-[#484F58] flex items-center justify-center text-[#F0F6FC] font-bold text-lg shadow-sm">
            {user?.avatarInitials || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[#F0F6FC] text-sm font-bold truncate tracking-wide uppercase">{user?.name}</p>
            <div className="flex items-center mt-1">
              <span className="inline-block w-2 h-2 rounded-full bg-[#00C896] mr-2 animate-pulse"></span>
              <p className="text-[#8B949E] text-[10px] font-black tracking-widest uppercase">{user?.role || 'MEMBER'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-8 space-y-1.5 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-200 group ${
              isActive(item.path)
                ? 'bg-[#21262D] text-[#F0F6FC] shadow-sm border border-[#30363D]'
                : 'text-[#8B949E] hover:text-[#F0F6FC] hover:bg-[#161B22]'
            }`}
          >
            <span className={`text-xl transition-transform group-hover:scale-110 ${isActive(item.path) ? 'opacity-100' : 'opacity-70'}`}>{item.icon}</span>
            <span className="font-semibold text-sm tracking-wide">{item.label}</span>
            {isActive(item.path) && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#00C896] shadow-[0_0_10px_rgba(0,200,150,0.5)]"></div>}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-6 border-t border-[#30363D] bg-[#0D1117]">
        <button
          onClick={handleLogout}
          className="w-full px-4 py-3.5 bg-transparent border border-[#F85149]/30 text-[#F85149] rounded-xl font-bold hover:bg-[#F85149] hover:text-white transition-all duration-200 flex items-center justify-center space-x-2 group"
        >
          <span className="group-hover:translate-x-1 transition-transform">↪</span>
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}
