export default function Modal({ onClose, title, children }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#161B22] border border-[#21262D] rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[#E6EDF3] text-lg font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-[#8B949E] hover:text-[#E6EDF3] text-xl"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
