import React, { useState, useEffect } from 'react';
import { getColors } from '@/shared/Api/Color/ColorApi';
import { RemoveProductColor, SaveProductColor, getProductColor } from '@/shared/Api/Products/ProductColor/ProductColor';
import Select from 'react-select';
import showAlert from '@/util/antd/alert';
import { handleErrorNotification, handleSuccessNotification, fetchOptions } from '@/util/util';

interface IProductColorProps {
  productId: number | undefined;
  onProductColorChange: () => void;
}

const ProductColorAdd: React.FC<IProductColorProps> = ({ productId, onProductColorChange }) => {
  const [colors, setColors] = useState<{ value: number; label: string }[]>([]);
  const [selectedColor, setSelectedColor] = useState<{ value: number; label: string } | null>(null);
  const [productColors, setProductColors] = useState<any[]>([]);

  // Fetch colors and product colors on component mount or when productId changes
  useEffect(() => {
    const fetchColors = async () => {
      await fetchOptions(getColors, setColors, (color: any) => ({
        value: color.id,
        label: color.colorname,
      }));
    };

    const fetchProductColors = async () => {
      try {
        const productColorsResponse = await getProductColor();
        const numericProductId = Number(productId);

        if (isNaN(numericProductId)) {
          console.error('productId is not a valid number:', productId);
          return;
        }

        const filteredColors = productColorsResponse.filter((pc: any) => pc.fkProduct === numericProductId);
        setProductColors(filteredColors);
      } catch (error) {
        handleErrorNotification(error, 'Error al obtener los colores del producto.');
      }
    };

    fetchColors();
    fetchProductColors();
  }, [productId]);

  // Handle color selection from dropdown
  const handleColorChange = (selectedOption: { value: number; label: string } | null) => {
    setSelectedColor(selectedOption);
  };

  // Add color to the product
  const handleAddColor = async () => {
    if (!selectedColor) {
      showAlert({ title: 'Advertencia', content: 'Por favor selecciona un color' });
      return;
    }

    // Check if the selected color is already associated with the product
    const isColorAlreadyAdded = productColors.some((pc) => pc.fkColor === selectedColor.value);

    if (isColorAlreadyAdded) {
      showAlert({ title: 'Advertencia', content: 'Este color ya está asociado a este producto.' });
      setSelectedColor(null);
      return;
    }

    const formData = {
      fkProduct: Number(productId),
      fkColor: selectedColor.value,
    };

    try {
      await SaveProductColor(formData)
      .then(() => {
        handleSuccessNotification('Color agregado correctamente.');
        setSelectedColor(null);
        onProductColorChange();
      });

      // Update the list of product colors
      const updatedProductColors = await getProductColor();
      setProductColors(updatedProductColors.filter((pc: any) => pc.fkProduct === Number(productId)));
    } catch (error) {
      handleErrorNotification(error, 'Error al agregar el color.');
    }
  };

  // Delete selected color from product
  const handleDelete = async () => {
    if (!selectedColor) {
      showAlert({ title: 'Advertencia', content: 'Por favor selecciona un color para eliminar' });
      return;
    }

    const numericProductId = Number(productId);
    const colorToDelete = productColors.find(pc => pc.fkColor === selectedColor.value && pc.fkProduct === numericProductId);

    if (!colorToDelete) {
      showAlert({ title: 'Error', content: 'No se encontró el color a eliminar' });
      return;
    }

    try {
      await RemoveProductColor({ id: colorToDelete.id })
      .then(() => {
        handleSuccessNotification('Color eliminado correctamente.');
        setSelectedColor(null);
        onProductColorChange();
      });

      // Update the list of product colors
      const updatedProductColors = await getProductColor();
      setProductColors(updatedProductColors.filter((pc: any) => pc.fkProduct === numericProductId));
    } catch (error) {
      handleErrorNotification(error, 'Error al eliminar el color.');
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
    </div>
  );
};

export default ProductColorAdd;
