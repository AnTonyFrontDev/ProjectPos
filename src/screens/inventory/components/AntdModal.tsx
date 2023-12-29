// import React from 'react';
import { Modal } from 'antd';

const AntdModal = ({ visible, onCancel, onOk }: any) => {
  return (
    <Modal title="Ant Design Modal" visible={visible} onCancel={onCancel} onOk={onOk}>
      {/* Contenido del modal */}
      <p>This is the content of the modal.</p>
    </Modal>
  );
};

export default AntdModal;
