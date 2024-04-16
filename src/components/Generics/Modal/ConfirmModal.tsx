import React from 'react';
import { Link } from 'react-router-dom';

interface ConfirmationModalProps {
  visible: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  okLink?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ visible, message, onConfirm, onCancel, okLink }) => {
  const handleConfirm = () => {
    onConfirm();
    // if (okLink) {
    //     window.location.href = okLink;
    // } else {
    //     window.location.reload(); 
    // }
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className={`fixed z-10 inset-0 overflow-y-auto ${visible ? '' : 'hidden'}`}>
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg w-full">
          <div className="bg-gray-50 px-4 py-3 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Confirmación</h3>
          </div>
          <div className="px-4 py-4 sm:p-6">
            <p className="text-sm text-gray-500">{message}</p>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 flex justify-end">
            <button
              onClick={handleCancel}
              type="button"
              className="mr-2 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            >
              Cancelar
            </button>
            {okLink ? (
              <Link
                to={okLink}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
              >
                OK
              </Link>
            ) : (
              <button
                onClick={handleConfirm}
                type="button"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
              >
                OK
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
