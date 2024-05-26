import React, { useState, useEffect } from 'react';
import { getColors } from '@/shared/Api/Color/ColorApi';
import { SaveProductColor } from '@/shared/Api/Products/ProductColor/ProductColor';
import Select from 'react-select';

interface IProductColorProps {
  productId: number;
}

const ProductColorAdd: React.FC<IProductColorProps> = ({ productId }) => {
  const [colors, setColors] = useState<{ value: number; label: string }[]>([]);
  const [selectedColor, setSelectedColor] = useState<{ value: number; label: string } | null>(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const colorsResponse = await getColors();
        const colorOptions = colorsResponse.map((color: any ) => ({
          value: color.id,
          label: color.colorname,
        }));
        setColors(colorOptions);
      } catch (error) {
        console.error('Error al obtener los colores:', error);
      }
    };

    fetchColors();
  }, []);

  const handleColorChange = (selectedOption: { value: number; label: string } | null) => {
    setSelectedColor(selectedOption);
  };

  const handleAddColor = async () => {
    if (!selectedColor) {
      console.error('Por favor selecciona un color');
      return;
    }

    const formData = {
      fkProduct: Number(productId),
      fkColor: selectedColor.value,
    };
    console.log('Color agregado exitosamente.', formData);

    try {
      await SaveProductColor(formData);
      setShowSuccessAlert(true);
      setSelectedColor(null);
      setTimeout(() => {
        setShowSuccessAlert(false);
      }, 3000);
    } catch (error) {
      console.error('Error al agregar el color:', error);
    }
  };

  return (
    <div>
      <h3>Agregar Color:</h3>
      <div className="flex mt-4 items-center">
        <div className="flex items-center">
          <label className="block text-sm font-medium text-gray-700">Selecciona un color:</label>
          <Select
            value={selectedColor}
            onChange={handleColorChange}
            options={colors}
            placeholder="Seleccionar Color"
            className="p-4 m-2"
          />
        </div>
        <button
          onClick={handleAddColor}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Agregar Color
        </button>
      </div>
      {showSuccessAlert && (
        <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Éxito:</strong> El color se agregó correctamente.
        </div>
      )}
    </div>
  );
};

export default ProductColorAdd;
