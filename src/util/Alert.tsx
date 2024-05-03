import React from 'react';

interface AlertProps {
  type: 'success' | 'warning' | 'error'; // Tipo de alerta
  message: string; // Mensaje a mostrar
}

const Alert: React.FC<AlertProps> = ({ type, message }) => {
  let alertClasses = '';

  // Configurar clases CSS según el tipo de alerta
  switch (type) {
    case 'success':
      alertClasses = 'bg-green-100 border border-green-400 text-green-700';
      break;
    case 'warning':
      alertClasses = 'bg-yellow-100 border border-yellow-400 text-yellow-700';
      break;
    case 'error':
      alertClasses = 'bg-red-100 border border-red-400 text-red-700';
      break;
    default:
      break;
  }

  return (
    <div className={`mt-4 px-4 py-3 rounded ${alertClasses}`} role="alert">
      <strong className="font-bold">{type.charAt(0).toUpperCase() + type.slice(1)}:</strong> {message}
    </div>
  );
};

export default Alert;
