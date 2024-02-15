// ColorForm.tsx
import React from 'react';
import { useColorForm } from '../hooks/useColorForm';

const ColorForm: React.FC = () => {
  const { formData, handleInputChange, handleSubmit } = useColorForm();

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
      {/* Campos del formulario de color */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Color Name</label>
        <input
          type="text"
          name="colorname"
          value={formData.colorname}
          onChange={handleInputChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Color Code</label>
        <input
          type="text"
          name="code"
          value={formData.code}
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

export default ColorForm;
