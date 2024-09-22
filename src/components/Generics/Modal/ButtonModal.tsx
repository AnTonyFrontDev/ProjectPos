import React, { useState } from 'react';
import { Modal, Tooltip } from 'antd';
// import { AppIcon } from '../../ui/AppIcon';
import { APP_ICONS } from '@/shared/constants/icons-constants';


interface ButtonModalProps {
  buttonText: string;
  modalTitle: string;
  modalContent: React.ReactNode;
  className?: string;
  size: number;
  iconType?: keyof typeof APP_ICONS; // Add the iconType prop
  cssColor?: string;
  tooltipTitle?: string;
}

const ButtonModal: React.FC<ButtonModalProps> = ({ buttonText, className, modalTitle, modalContent, tooltipTitle }) => {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  const buttonStyle = `
    inline-block bg-green-500 
    hover:bg-green-600 focus:outline-none 
    focus:ring focus:ring-green-200 text-white 
    font-bold py-2 px-4 rounded-md shadow-md transition-colors duration-300`;

  const buttonClasses = className ? className : buttonStyle;

  return (
    <>

      <Tooltip title={tooltipTitle}>
        <button className={buttonClasses} onClick={showModal}>
          {/* {iconType && <AppIcon type={iconType} className="cursor-pointer" width={size} />} */}
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
