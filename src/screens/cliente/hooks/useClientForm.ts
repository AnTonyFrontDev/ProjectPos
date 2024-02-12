// useClientForm.ts

import { SendClient } from '@/components/FormularioV4/Config/SendForm';
import { useState } from 'react';
import { ClientPostDto, IClientPost } from '../../../shared/interfaces/Client/IClientPost';

const useClientForm = () => {
  const [formData, setFormData] = useState<IClientPost>(new ClientPostDto());

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await SendClient(formData);
      console.log('Client data submitted successfully');
    } catch (error) {
      console.error('Error submitting client data:', error);
    }
  };

  return {
    formData,
    handleInputChange,
    handleSubmit,
  };
};

export default useClientForm;
