// SizeForm.tsx
import React, { useState, useEffect } from 'react';
import { useSizeForm } from '../hooks/useSizeForm';
import { getCategorySizes } from '@/shared/Api/CategorySize/CategorySizeApi';
import { ICategorySizeColumns } from '@/shared/interfaces/size/CategorySize/ICategorySizeGet';
import { FormProps } from '@/components/Generics/Interface/IForms';
import { ISizePost, SizePostDto } from '@/shared/interfaces/size/ISizePost';


const SizeForm: React.FC<FormProps> = ({formData: initialFormData, isUpdate}) => {
  const { formData, setFormData, handleInputChange, handleSubmit, handleUpdate, handleSelect } = useSizeForm();
  const [categories, setCategories] = useState<ICategorySizeColumns[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategorySizes();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (isUpdate && initialFormData) {
      handleSetInitialFormData(initialFormData);
    }
  }, [isUpdate, initialFormData]);

  const handleSetInitialFormData = (initialData: ISizePost) => {
    const initialFormData = new SizePostDto;
    Object.assign(initialFormData, initialData)
    setFormData(initialFormData)
  };

  const onSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isUpdate) {
      await handleUpdate(event);
    } else {
      await handleSubmit(event);
    }
    window.location.reload();
  };

  return (
    <form onSubmit={onSubmitHandler} className="max-w-md mx-auto mt-8">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Size</label>
        <input
          type="text"
          name="size"
          value={formData.size}
          onChange={handleInputChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Category</label>
        <select
          name="fkCategory"
          value={formData.fkCategory}
          onChange={handleSelect}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        >
          <option value="">Select category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.category}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
        Submit
      </button>
    </form>
  );
};

export default SizeForm;

