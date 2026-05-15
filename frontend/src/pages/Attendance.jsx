import { useEffect, useState } from 'react';
import { getAttendance, punchIn, punchOut } from '../api';
import Toast, { useToast } from '../components/Toast';

export default function AttendancePage({ user }) {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toasts, addToast } = useToast();

  const fetchAttendance = async () => {
    try {
      const data = await getAttendance();
      setRecords(data);
    } catch (error) {
      addToast('error', 'Failed to fetch attendance');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const handlePunchIn = async () => {
    try {
      await punchIn();
      addToast('success', 'Punched in successfully');
      fetchAttendance();
    } catch (error) {
      addToast('error', error.message);
    }
  };

  const handlePunchOut = async () => {
    try {
      await punchOut();
      addToast('success', 'Punched out successfully');
      fetchAttendance();
    } catch (error) {
      addToast('error', error.message);
    }
  };

  if (loading) return <div className="p-8 text-[#E6EDF3]">Loading...</div>;

  const today = new Date().toISOString().split('T')[0];
  const todayRecord = records.find(r => r.date === today);

  return (
    <div className="max-w-[1400px] mx-auto animate-fadeIn pb-10">
      <Toast toasts={toasts} />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-black text-[#F0F6FC] tracking-tight mb-2 uppercase">Time Registry</h1>
          <p className="text-[#8B949E] font-medium">Log your operational hours and track attendance status.</p>
        </div>
        
        <div className="flex space-x-4">
          {!todayRecord ? (
            <button
              onClick={handlePunchIn}
              className="px-8 py-3.5 bg-[#00C896] text-[#0D1117] rounded-xl font-black hover:bg-[#00A878] transition-all duration-200 shadow-lg"
            >
              PUNCH IN
            </button>
          ) : !todayRecord.punchOut ? (
            <button
              onClick={handlePunchOut}
              className="px-8 py-3.5 bg-transparent border border-[#F85149] text-[#F85149] rounded-xl font-black hover:bg-[#F85149] hover:text-white transition-all duration-200 shadow-lg"
            >
              PUNCH OUT
            </button>
          ) : (
            <div className="bg-[#161B22] border border-[#30363D] px-6 py-3 rounded-xl flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#3FB950] animate-pulse"></span>
              <span className="text-[#3FB950] font-black text-xs uppercase tracking-widest">Shift Finalized</span>
            </div>
          )}
        </div>
      </div>

      <div className="bg-[#161B22] border border-[#30363D] rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#1C2128] border-b border-[#30363D]">
                <th className="px-6 py-4 text-[10px] font-black text-[#8B949E] uppercase tracking-widest">Name</th>
                <th className="px-6 py-4 text-[10px] font-black text-[#8B949E] uppercase tracking-widest">Entry Date</th>
                <th className="px-6 py-4 text-[10px] font-black text-[#8B949E] uppercase tracking-widest text-center">Punch In</th>
                <th className="px-6 py-4 text-[10px] font-black text-[#8B949E] uppercase tracking-widest text-center">Punch Out</th>
                <th className="px-6 py-4 text-[10px] font-black text-[#8B949E] uppercase tracking-widest text-center">Duration</th>
                <th className="px-6 py-4 text-[10px] font-black text-[#8B949E] uppercase tracking-widest text-right">Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#30363D]">
              {records.length > 0 ? records.map(record => (
                <tr key={record._id} className="hover:bg-[#21262D] transition-colors group">
                  <td className="px-6 py-5">
                    <span className="text-[#F0F6FC] font-bold">
                      {record.userId?.name || user?.name || 'Unknown'}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-[#30363D] flex items-center justify-center text-[10px] font-bold text-[#8B949E]">
                        {new Date(record.date).toLocaleDateString(undefined, { day: '2-digit', month: 'short' })}
                      </div>
                      <span className="text-[#F0F6FC] font-bold">{record.date}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="text-[#00C896] font-mono font-bold bg-[#00C896]/5 px-2 py-1 rounded border border-[#00C896]/10">
                      {record.punchIn}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="text-[#F85149] font-mono font-bold bg-[#F85149]/5 px-2 py-1 rounded border border-[#F85149]/10">
                      {record.punchOut || '—'}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="text-[#F0F6FC] font-mono text-xs">
                      {record.hoursWorked ? `${record.hoursWorked.toFixed(2)} HRS` : '—'}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end space-x-2">
                       <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest border ${
                        record.punchOut ? 'bg-[#3FB950]/10 text-[#3FB950] border-[#3FB950]/20' : 'bg-[#D29922]/10 text-[#D29922] border-[#D29922]/20'
                      }`}>
                        {record.punchOut ? 'Validated' : 'On-Duty'}
                      </span>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-[#8B949E] font-medium italic">No attendance records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}