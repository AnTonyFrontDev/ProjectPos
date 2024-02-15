// SizeForm.tsx
import React from 'react';
import { useSizeForm } from '../hooks/useSizeForm';

const SizeForm: React.FC = () => {
  const { formData, handleInputChange, handleSubmit } = useSizeForm();

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
      {/* Campos del formulario de tamaño */}
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
        <label className="block text-sm font-medium text-gray-600">Category ID</label>
        <input
          type="number"
          name="fkCategory"
          value={formData.fkCategory}
          onChange={handleInputChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      {/* Botón de envío */}
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
        Submit
      </button>
    </form>
  );
};

export default SizeForm;
