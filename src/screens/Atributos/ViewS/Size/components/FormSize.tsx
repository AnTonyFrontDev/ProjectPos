import React, { useState, useEffect } from 'react';
import { useSizeForm } from '../hooks/useSizeForm';
import { getCategorySizes } from '@/shared/Api/CategorySizeApi';
import { FormProps } from '@/components/Generics/Interface/IForms';
import { ISize, SizePostDto } from '@/shared/interfaces/ISize';
import { ICategorySize } from '@/shared/interfaces/ICategorySize';

const SizeForm: React.FC<FormProps> = ({ formData: initialFormData, isUpdate }) => {
  const { formData, setFormData, handleInputChange, handleSubmit, handleSelect, handleUpdate } = useSizeForm();
  const [categories, setCategories] = useState<ICategorySize[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategorySizes();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error cargando categorías:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (isUpdate && initialFormData) {
      handleSetInitialFormData(initialFormData);
    }
  }, [isUpdate, initialFormData]);

  const handleSetInitialFormData = (initialData: ISize) => {
    const initialFormData = new SizePostDto();
    Object.assign(initialFormData, initialData);
    setFormData(initialFormData);
  };

  const onSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isUpdate) {
      await handleUpdate(event);
    } else {
      await handleSubmit(event);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="max-w-md mx-auto mt-8">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Tamaño</label>
        <input
          type="text"
          name="size"
          value={formData.size}
          onChange={handleInputChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Categoría</label>
        <select
          name="fkCategory"
          value={formData.fkCategory}
          onChange={handleSelect}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        >
          <option value="">Selecciona una categoría</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.category}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
        {isUpdate ? "Actualizar" : "Guardar"}
      </button>
    </form>
  );
};

export default SizeForm;
