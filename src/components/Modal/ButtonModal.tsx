import React, { useState } from 'react';
import { Button, Modal } from 'antd';
// import { ModalProps } from 'antd/lib/modal';

// Modal
// import 'antd/dist/antd.css';

interface ButtonModalProps {
  buttonText: string;
  modalTitle: string;
  modalContent: React.ReactNode;
}

const ButtonModal: React.FC<ButtonModalProps> = ({ buttonText, modalTitle, modalContent }) => {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        {buttonText}
      </Button>

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
