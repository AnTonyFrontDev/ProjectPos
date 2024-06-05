// useSizeForm.ts
import { useState } from 'react';
import { SaveSize, UpdateSize } from '@/shared/Api/Size/SizeApi';
import { GenericRequest } from '@/shared/RequestsApi/GenericRequest';
import { SizePostDto, ISizePost } from '@/shared/interfaces/size/ISizePost';
import { ISizeUpdate, SizeUpdateDto } from '@/shared/interfaces/size/ISizeUpdate';

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
    window.location.reload();
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    console.log(formData)
  }

  //no funciona temporal --
  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const updateData: ISizeUpdate = new SizeUpdateDto(formData as ISizeUpdate);
    console.log('Expenses Data:', updateData);
    GenericRequest(updateData, UpdateSize, "Expenses data updated successfully");
  };

  return { formData, setFormData, handleInputChange, handleSubmit, handleUpdate, handleSelect };
};

