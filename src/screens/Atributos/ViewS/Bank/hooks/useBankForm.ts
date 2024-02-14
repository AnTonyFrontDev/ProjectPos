import { useState } from 'react';
import { BankPostDto, IBankPost } from '@/shared/interfaces/Bank/IBankPost';
import { SaveBank } from '@/shared/Api/Bank/BankApi';
import { GenericRequest } from '@/shared/RequestsApi/GenericRequest';

export const useBankForm = () => {
  const [formData, setFormData] = useState<IBankPost>(new BankPostDto());

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Additional actions before sending the bank data to the database
    console.log('Bank Data:', formData);
    GenericRequest(formData, SaveBank, "Bank data submitted successfully");
  };

  return { formData, handleInputChange, handleSubmit };
};
