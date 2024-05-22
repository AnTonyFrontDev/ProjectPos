// ColorForm.tsx
import React, { useState } from 'react';
import { useColorForm } from '../hooks/useColorForm';
import { ColorPicker } from 'antd';
import { Color } from 'antd/es/color-picker';


const ColorForm: React.FC = () => {
  const { formData, handleInputChange, handleSubmit } = useColorForm();

  const [selectedColor, setSelectedColor] = useState<any>('#1677ff'); // Color state for ColorPicker
  const [colorCode, setColorCode] = React.useState<string>('#1677ff');
  const handleColorChange = (color: {value: Color; hex: string}) => {
    setSelectedColor(color.hex.toString());

  };

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
        <ColorPicker
          value={selectedColor} // Pass selectedColor state
          onChange={(c) => {
            setColorCode(c.toHexString());
          }}
        />
        {/* <ColorPicker defaultValue="#1677ff" /> */}
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
