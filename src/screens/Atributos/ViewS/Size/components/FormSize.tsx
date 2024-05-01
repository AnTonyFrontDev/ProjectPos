// SizeForm.tsx
import React, { useState, useEffect } from 'react';
import { useSizeForm } from '../hooks/useSizeForm';
import { getCategorySizes } from '@/shared/Api/CategorySize/CategorySizeApi';
import { ICategorySizeColumns } from '@/shared/interfaces/size/CategorySize/ICategorySizeGet';



const SizeForm: React.FC = () => {
  const { formData, handleInputChange, handleSubmit } = useSizeForm();
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

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
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
          onChange={handleInputChange}
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

