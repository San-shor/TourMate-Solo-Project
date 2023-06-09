import React from "react";

const Modal = ({ children, onClose }) => {
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75"></div>
        <div className="bg-white rounded-lg p-4 z-10">{children}</div>
        <button
          className="absolute top-0 right-0 m-4 bg-red-700 text-white p-2 pl-4 pr-4 rounded-full"
          onClick={onClose}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default Modal;
