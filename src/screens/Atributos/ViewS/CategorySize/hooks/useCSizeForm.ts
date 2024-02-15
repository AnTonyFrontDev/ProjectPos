import { useState } from 'react';
import { CategorySizePostDto, ICategorySizePost } from '@/shared/interfaces/size/CategorySize/ICategorySizePost';
import { SaveCategorySize } from '@/shared/Api/CategorySize/CategorySizeApi';
import { GenericRequest } from '@/shared/RequestsApi/GenericRequest';

export const useCategorySizeForm = () => {
  const [formData, setFormData] = useState<ICategorySizePost>(new CategorySizePostDto());

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Acciones adicionales antes de enviar los datos a la base de datos
    console.log('CategorySize Data:', formData);
    GenericRequest(formData, SaveCategorySize, "CategorySize data submitted successfully");
  };

  return { formData, handleInputChange, handleSubmit };
};
