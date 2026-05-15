export default function Badge({ status }) {
  const statusStyles = {
    completed: { bg: '#1a3a2a', text: '#3FB950' },
    active: { bg: '#0d2a4a', text: '#79C0FF' },
    cancelled: { bg: '#21262D', text: '#8B949E' },
    present: { bg: '#1a3a2a', text: '#3FB950' },
    absent: { bg: '#3a1a1a', text: '#FF7B72' },
    leave: { bg: '#0d2a4a', text: '#79C0FF' },
    pending: { bg: '#3a2a00', text: '#E3B341' },
    approved: { bg: '#1a3a2a', text: '#3FB950' },
    rejected: { bg: '#3a1a1a', text: '#FF7B72' },
    live: { bg: '#1a3a2a', text: '#3FB950' },
    allocated: { bg: '#0d2a4a', text: '#00C896' },
  };

  const style = statusStyles[status] || { bg: '#21262D', text: '#8B949E' };

  return (
    <span
      className="px-2 py-1 rounded text-xs font-medium"
      style={{ backgroundColor: style.bg, color: style.text }}
    >
      {status.toUpperCase()}
    </span>
  );
}
