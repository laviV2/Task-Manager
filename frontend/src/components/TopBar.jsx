export default function TopBar({ user }) {
  return (
    <div className="h-16 bg-[#161B22] border-b border-[#30363D] flex items-center justify-between px-6 flex-shrink-0">
      <div className="flex-1"></div>

      {/* User Profile */}
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-full bg-[#00C896] flex items-center justify-center text-[#0D1117] font-bold text-xs">
          {user?.avatarInitials || 'U'}
        </div>
        <span className="text-[#E6EDF3] text-sm">{user?.name}</span>
      </div>
    </div>
  );
}
