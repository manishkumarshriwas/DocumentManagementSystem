import React from 'react';

const Alert = ({ type, message }) => {
  const alertClasses = {
    success: 'bg-green-50 border-green-400 text-green-700',
    error: 'bg-red-50 border-red-400 text-red-700'
  };

  const iconClasses = {
    success: 'check_circle',
    error: 'error'
  };

  return (
    <div
      className={`${alertClasses[type]} px-4 py-3 rounded-md`}
      role="alert"
    >
      <div className="flex items-center">
        <span className="material-symbols-outlined mr-2">{iconClasses[type]}</span>
        <span className="block sm:inline">{message}</span>
      </div>
    </div>
  );
};

export default Alert;