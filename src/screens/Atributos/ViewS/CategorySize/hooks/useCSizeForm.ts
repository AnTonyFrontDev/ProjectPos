import { useState } from 'react';
import { CategorySizeDto, ICategorySizePost } from '@/shared/interfaces/size/CategorySize/ICategorySizePost';
import { SaveCategorySize, UpdateCategorySize } from '@/shared/Api/CategorySize/CategorySizeApi';
import { GenericRequest } from '@/shared/RequestsApi/GenericRequest';
import { ICategorySizeUpdate } from '@/shared/interfaces/size/CategorySize/ICategorySizeUpdate';
import { CategorySizeUpdateDto } from '@/shared/interfaces/size/CategorySize/ICategorySizeUpdate';

export const useCategorySizeForm = () => {
  const [formData, setFormData] = useState<ICategorySizePost>(new CategorySizeDto());

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('CategorySize Data:', formData);
    GenericRequest(formData, SaveCategorySize, "CategorySize data submitted successfully");
  };
  
  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const updateData: ICategorySizeUpdate = new CategorySizeUpdateDto(formData);
    console.log('Expenses Data:', updateData);
    GenericRequest(updateData, UpdateCategorySize, "Expenses data updated successfully");
  };

  return { formData, setFormData, handleInputChange, handleSubmit, handleUpdate };
};
