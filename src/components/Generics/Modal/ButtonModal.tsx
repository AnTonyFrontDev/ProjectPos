import React, { useState } from 'react';
import { Modal, Tooltip } from 'antd';
import { AppIcon } from '../../ui/AppIcon';
import { APP_ICONS } from '@/shared/constants/icons-constants';


interface ButtonModalProps {
  buttonText: string;
  modalTitle: string;
  modalContent: React.ReactNode;
  size: number;
  iconType: keyof typeof APP_ICONS; // Add the iconType prop
  cssColor: string;
  tooltipTitle?: string;
}

const ButtonModal: React.FC<ButtonModalProps> = ({ buttonText, modalTitle, modalContent, iconType, cssColor, size, tooltipTitle }) => {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  const buttonStyle = `
    my-2 mx-2 inline-flex items-center p-1 rounded-md 
    transition-colors duration-300 bg-${cssColor}-500 text-white 
    hover:bg-${cssColor}-600 focus:outline-none 
    focus:border-${cssColor}-700 focus:ring focus:ring-${cssColor}-200 shadow-md
  `;

  return (
    <>
    
      <Tooltip title={tooltipTitle}>
        <button className={buttonStyle} onClick={showModal}>
          {iconType && <AppIcon type={iconType} className="cursor-pointer" width={size} />}
          {buttonText && buttonText}
        </button>
      </Tooltip>
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
