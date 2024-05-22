import { useState } from 'react';
import { GenericRequest } from '@/shared/RequestsApi/GenericRequest';
import { BankDto, IBankPost } from '@/shared/interfaces/Bank/IBankPost';
import { SaveBank, UpdateBank } from '@/shared/Api/Bank/BankApi';
import { BankUpdateDto, IBankUpdate } from '@/shared/interfaces/Bank/IBankUpdate';

export const useBankAccountForm = () => {
  const [formData, setFormData] = useState<IBankPost>(new BankDto());

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Bank Data:', formData);
    GenericRequest(formData, SaveBank, "Bank data submitted successfully");
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const updateData: IBankUpdate = new BankUpdateDto(formData);
    console.log('Bank Data:', updateData);
    GenericRequest(updateData, UpdateBank, "Bank data updated successfully");;
  };


return { formData, setFormData, handleInputChange, handleSubmit, handleUpdate };
};
