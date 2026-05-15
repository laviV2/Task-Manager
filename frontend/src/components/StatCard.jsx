import React from 'react';

const colors = {
  blue: {
    bg: 'bg-[#0A192F]',
    border: 'border-[#30363D]',
    text: 'text-[#58A6FF]',
    icon: 'bg-[#58A6FF]/10'
  },
  green: {
    bg: 'bg-[#0A261A]',
    border: 'border-[#30363D]',
    text: 'text-[#3FB950]',
    icon: 'bg-[#3FB950]/10'
  },
  orange: {
    bg: 'bg-[#261E0A]',
    border: 'border-[#30363D]',
    text: 'text-[#D29922]',
    icon: 'bg-[#D29922]/10'
  },
  purple: {
    bg: 'bg-[#1D102A]',
    border: 'border-[#30363D]',
    text: 'text-[#BC8CFF]',
    icon: 'bg-[#BC8CFF]/10'
  }
};

export default function StatCard({ label, value, icon, color = 'blue' }) {
  const theme = colors[color] || colors.blue;

  return (
    <div className={`${theme.bg} border ${theme.border} rounded-2xl p-6 shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-default group`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${theme.icon} rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8B949E]">Record</div>
      </div>
      <div>
        <p className="text-3xl font-black text-[#F0F6FC] mb-1">{value}</p>
        <p className="text-[#8B949E] text-xs font-bold uppercase tracking-widest">{label}</p>
      </div>
    </div>
  );
}
