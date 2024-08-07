import React, { useState, useEffect } from 'react';
import { getColors } from '@/shared/Api/Color/ColorApi';
import { RemoveProductColor, SaveProductColor, getProductColor } from '@/shared/Api/Products/ProductColor/ProductColor';
import Select from 'react-select';

interface IProductColorProps {
  productId: number;
}

const ProductColorAdd: React.FC<IProductColorProps> = ({ productId }) => {
  const [colors, setColors] = useState<{ value: number; label: string }[]>([]);
  const [selectedColor, setSelectedColor] = useState<{ value: number; label: string } | null>(null);
  const [productColors, setProductColors] = useState<any[]>([]);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const colorsResponse = await getColors();
        const colorOptions = colorsResponse.map((color: any) => ({
          value: color.id,
          label: color.colorname,
        }));
        setColors(colorOptions);
      } catch (error) {
        console.error('Error al obtener los colores:', error);
      }
    };

    const fetchProductColors = async () => {
      try {
        const productColorsResponse = await getProductColor();
        // console.log('Full productColorsResponse:', productColorsResponse);
        // console.log('Product ID:', productId);

        const numericProductId = Number(productId);
        // console.log('Numeric Product ID:', numericProductId);

        if (isNaN(numericProductId)) {
          console.error('productId is not a valid number:', productId);
          return;
        }

        const filteredColors = productColorsResponse.filter((pc: any) => {
          // console.log('Checking product color:', pc);
          return pc.fkProduct === numericProductId;
        });

        // console.log('Filtered product colors:', filteredColors);

        setProductColors(filteredColors);
      } catch (error) {
        console.error('Error al obtener los colores del producto:', error);
      }
    };

    fetchColors();
    fetchProductColors();
  }, [productId]);

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

    try {
      await SaveProductColor(formData)
      .then(() => {
        setShowSuccessAlert(true);
        setSelectedColor(null);
        setTimeout(() => {
          window.location.reload();
          setShowSuccessAlert(false);
        }, 1000);
      })
      // Update the list of product colors
      const updatedProductColors = await getProductColor();
      setProductColors(updatedProductColors.filter((pc: any) => pc.fkProduct === Number(productId)));
    } catch (error) {
      console.error('Error al agregar el color:', error);
    }
  };

  const handleDelete = async () => {
    if (!selectedColor) {
      console.error('Por favor selecciona un color para eliminar');
      return;
    }

    const numericProductId = Number(productId);
    const colorToDelete = productColors.find(pc => pc.fkColor === selectedColor.value && pc.fkProduct === numericProductId);

    if (!colorToDelete) {
      console.error('No se encontró el color a eliminar');
      return;
    }

    // console.log('Color a eliminar:', colorToDelete.id);

    try {
      await RemoveProductColor({ id: colorToDelete.id });
      setShowSuccessAlert(true);
      setSelectedColor(null);
      setTimeout(() => {
        setShowSuccessAlert(false);
      }, 3000);
      // Update the list of product colors
      const updatedProductColors = await getProductColor();
      setProductColors(updatedProductColors.filter((pc: any) => pc.fkProduct === numericProductId));
    } catch (error) {
      console.error('Error al eliminar el color:', error);
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
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
        >
          Agregar Color
        </button>
        <button
          className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
          onClick={handleDelete}
        >
          Quitar
        </button>
      </div>
      {showSuccessAlert && (
        <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Éxito:</strong> La operación se realizó correctamente.
        </div>
      )}
    </div>
  );
};

export default ProductColorAdd;
