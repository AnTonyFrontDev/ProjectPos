import { useState } from 'react';
import { CategorySizeDto, ICategorySize, CategorySizeUpdateDto } from '@/shared/interfaces/ICategorySize';
import { SaveCategorySize, UpdateCategorySize } from '@/shared/Api/CategorySizeApi';
import { GenericRequest } from '@/shared/RequestsApi/GenericRequest';

export const useCategorySizeForm = () => {
  const [formData, setFormData] = useState<ICategorySize>(new CategorySizeDto());

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
    const updateData: ICategorySize = new CategorySizeUpdateDto(formData);
    console.log('CategorySize Data:', updateData);
    GenericRequest(updateData, UpdateCategorySize, "CategorySize data updated successfully");
    window.location.reload();
  };

  return { formData, setFormData, handleInputChange, handleSubmit, handleUpdate };
};
