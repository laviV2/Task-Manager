export default function EmptyState({ icon = '📭', title, subtitle }) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-[#E6EDF3] font-bold text-lg mb-1">{title}</h3>
      <p className="text-[#8B949E] text-sm">{subtitle}</p>
    </div>
  );
}
