import React from 'react';
import { Alert, Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

interface CustomActionAlertProps {
  message: string;
  description: string;
  url: string;
}

const CustomActionAlert: React.FC<CustomActionAlertProps> = ({ message, description, url }) => {
  const navigate = useNavigate();

  const handleAccept = () => {
    navigate(url);
  };

  const handleDecline = () => {
    // No action needed, the alert will close automatically
  };

  return (
    <Alert
      message={message}
      description={description}
      type="info"
      className='my-4'
      action={
        <Space direction="vertical">
          <Button size="small" type="primary" onClick={handleAccept}>
            Acceptar
          </Button>
          <Button size="small" danger ghost onClick={handleDecline}>
            Cerrar
          </Button>
        </Space>
      }
      closable
    />
  );
};

export default CustomActionAlert;
