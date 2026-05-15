import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDashboard } from '../api';
import StatCard from '../components/StatCard';
import Toast, { useToast } from '../components/Toast';
import Skeleton from '../components/Skeleton';

export default function Dashboard({ user }) {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toasts } = useToast();

  const fetchData = async () => {
    try {
      const dashData = await getDashboard();
      setDashboard(dashData);
    } catch (error) {
      console.error('Failed to fetch dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        <Skeleton count={5} />
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto animate-fadeIn overflow-hidden">
      <Toast toasts={toasts} />
      
      <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-black text-[#F0F6FC] tracking-tight mb-2">
            Dashboard
          </h1>
          <p className="text-[#8B949E] text-lg font-medium">
            Welcome back, <span className="text-[#00C896] font-bold">{user.name}</span> 👋
          </p>
        </div>
        <div className="bg-[#161B22] border border-[#30363D] rounded-xl px-4 py-2 flex items-center space-x-3 text-sm font-mono text-[#8B949E]">
          <span className="w-2 h-2 rounded-full bg-[#00C896]"></span>
          <span>SYSTEM ACTIVE</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard
          label="Active Projects"
          value={dashboard?.projectsCount || 0}
          icon="📁"
          color="blue"
        />
        <StatCard
          label="Pending Tasks"
          value={dashboard?.activeTasks || 0}
          icon="⚡"
          color="orange"
        />
        <StatCard
          label="Completed"
          value={dashboard?.completedTasks || 0}
          icon="✅"
          color="green"
        />
        <StatCard
          label="Average Hours"
          value={dashboard?.avgHours || '0.0'}
          icon="⏳"
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 pb-10">
        <div className="xl:col-span-2 bg-[#161B22] border border-[#30363D] rounded-2xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-[#30363D] flex justify-between items-center bg-[#1C2128]">
            <h2 className="font-black text-lg text-[#F0F6FC] flex items-center space-x-2 uppercase tracking-wider">
              <span className="text-xl">⏰</span>
              <span>Recent Attendance</span>
            </h2>
            <Link to="/attendance" className="text-[#58A6FF] text-xs font-bold hover:underline uppercase tracking-widest">View History</Link>
          </div>
          <div className="p-4">
            <div className="space-y-2">
              {dashboard?.recentAttendance?.length > 0 ? (
                dashboard.recentAttendance.map((record) => (
                  <div key={record._id} className="flex items-center justify-between p-4 rounded-xl hover:bg-[#21262D] transition-colors border border-transparent hover:border-[#30363D]">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-lg bg-[#30363D] flex items-center justify-center font-bold text-xs text-[#8B949E]">
                        {new Date(record.date).toLocaleDateString(undefined, { day: '2-digit', month: 'short' })}
                      </div>
                      <div>
                        <p className="text-[#F0F6FC] font-bold text-sm">{record.userId?.name || user?.name || 'Unknown'}</p>
                        <p className="text-[#8B949E] text-xs">{record.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[#F0F6FC] font-mono font-bold text-sm">{record.punchIn} — {record.punchOut || 'PENDING'}</p>
                      <p className="text-[#00C896] text-[10px] font-black uppercase tracking-tighter">Attendance</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center">
                  <p className="text-[#8B949E] italic">No attendance records found this week.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-[#161B22] border border-[#30363D] rounded-2xl overflow-hidden shadow-sm h-fit">
          <div className="p-6 border-b border-[#30363D] bg-[#1C2128]">
            <h2 className="font-black text-lg text-[#F0F6FC] uppercase tracking-wider flex items-center space-x-2">
              <span className="text-xl">🆔</span>
              <span>Account Profile</span>
            </h2>
          </div>
          <div className="p-8 space-y-8">
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00C896] to-[#00A878] flex items-center justify-center text-[#0D1117] font-black text-2xl shadow-lg">
                {user.avatarInitials || 'U'}
              </div>
              <div className="min-w-0">
                <h3 className="text-[#F0F6FC] font-black text-xl truncate">{user.name}</h3>
                <span className="inline-block px-2 py-0.5 bg-[#00C896]/10 text-[#00C896] text-[10px] font-black rounded uppercase tracking-widest mt-1 border border-[#00C896]/20">
                  {user.role || 'Member'}
                </span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="group">
                <span className="block text-[#8B949E] text-[10px] font-black uppercase tracking-widest mb-1.5 ml-1">Email Identifier</span>
                <div className="bg-[#0D1117] border border-[#30363D] rounded-xl px-4 py-3 text-[#F0F6FC] font-medium group-hover:border-[#484F58] transition-colors">
                  {user.email}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}