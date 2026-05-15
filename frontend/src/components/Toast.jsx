import React, { useState, useEffect } from 'react';

export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  return { toasts, showToast };
};

export default function Toast({ toasts }) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`px-4 py-2 rounded text-sm ${
            toast.type === 'success'
              ? 'bg-[#1a3a2a] text-[#3FB950]'
              : 'bg-[#3a1a1a] text-[#FF7B72]'
          }`}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}
