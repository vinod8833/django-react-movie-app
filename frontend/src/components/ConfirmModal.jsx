import React from "react";

export default function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#1a1f29] border border-white/10 rounded-2xl p-8 shadow-2xl w-[350px] text-center">
        <p className="text-lg font-semibold mb-6">{message}</p>

        <div className="flex justify-center gap-4">
          <button onClick={onConfirm}
            className="px-5 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold shadow-md">
            Yes
          </button>

          <button onClick={onCancel} className="px-5 py-2 bg-gray-700 hover:bg-gray-800 rounded-lg font-semibold shadow-md">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
