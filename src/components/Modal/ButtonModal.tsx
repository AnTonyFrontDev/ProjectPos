import React, { useState } from 'react';
import { Modal } from 'antd';
import { AppIcon } from '../ui/AppIcon';
import { APP_ICONS } from '../../shared/constants/icons-constants';


interface ButtonModalProps {
  buttonText: string;
  modalTitle: string;
  modalContent: React.ReactNode;
  iconType: keyof typeof APP_ICONS; // Add the iconType prop
  cssColor: string;
}

const ButtonModal: React.FC<ButtonModalProps> = ({ buttonText, modalTitle, modalContent, iconType, cssColor }) => {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  const buttonStyle = `
    my-2 mx-2 inline-flex items-center p-1 pr-4 rounded-md 
    transition-colors duration-300 bg-green-500 text-white 
    hover:bg-green-600 focus:outline-none focus:border-${cssColor}-700 
    focus:ring focus:ring-blue-200 shadow-md
  `;

  return (
    <>
      <button
        className={buttonStyle} onClick={showModal}
      >
        <AppIcon type={iconType} className="cursor-pointer mr-2" width={18} />
        {buttonText}
      </button>

      <Modal
        title={modalTitle}
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        {modalContent}
      </Modal>
    </>
  );
};

export default ButtonModal;
