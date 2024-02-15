// useSizeForm.ts
import { useState } from 'react';
import { SaveSize } from '@/shared/Api/Size/SizeApi';
import { GenericRequest } from '@/shared/RequestsApi/GenericRequest';
import { SizePostDto, ISizePost } from '@/shared/interfaces/size/ISizePost';

export const useSizeForm = () => {
  const [formData, setFormData] = useState<ISizePost>(new SizePostDto());

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Additional actions before sending the size data to the database
    console.log('Size Data:', formData);
    GenericRequest(formData, SaveSize, "Size data submitted successfully");
  };

  return { formData, handleInputChange, handleSubmit };
};
