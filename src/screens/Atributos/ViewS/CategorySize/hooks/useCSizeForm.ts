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
  
    GenericRequest(formData, SaveCategorySize, "CategorySize data submitted successfully")
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error submitting CategorySize data:", error);
      });
  };

  
  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const updateData: ICategorySizeUpdate = new CategorySizeUpdateDto(formData);
    console.log('CategorySize Data:', updateData);
    GenericRequest(updateData, UpdateCategorySize, "CategorySize data updated successfully");
    window.location.reload();
  };

  return { formData, setFormData, handleInputChange, handleSubmit, handleUpdate };
};
