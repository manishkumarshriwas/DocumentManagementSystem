import React from 'react';

const SuccessToast = ({ show, message }) => {
  if (!show) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-transform duration-300">
      <div className="flex items-center">
        <i className="fas fa-check-circle mr-2"></i>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default SuccessToast;