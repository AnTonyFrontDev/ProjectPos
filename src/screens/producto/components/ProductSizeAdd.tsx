import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { getProductSize, RemoveProductSize, SaveProductSize } from '@/shared/Api/ProductSize';
import { getSizes } from '@/shared/Api/SizeApi';
import showAlert from '@/util/antd/alert';
import { handleErrorNotification, handleSuccessNotification, fetchOptions } from '@/util/util';

interface IProductSizeProps {
  productId: number | undefined;
  onProductSizeChange: () => void;
}

const ProductSizeAdd: React.FC<IProductSizeProps> = ({ productId, onProductSizeChange }) => {
  const [sizes, setSizes] = useState<{ value: number; label: string }[]>([]);
  const [selectedSize, setSelectedSize] = useState<{ value: number; label: string } | null>(null);
  const [productSizes, setProductSizes] = useState<any[]>([]);

  // Fetch sizes and product sizes on component mount or when productId changes
  useEffect(() => {
    const fetchSizes = async () => {
      await fetchOptions(getSizes, setSizes, (size: any) => ({
        value: size.id,
        label: `${size.size} - ${size.category}`,
      }));
    };

    const fetchProductSizes = async () => {
      try {
        const productSizesResponse = await getProductSize();
        const numericProductId = Number(productId);

        if (isNaN(numericProductId)) {
          console.error('productId is not a valid number:', productId);
          return;
        }

        const filteredSizes = productSizesResponse.filter((ps: any) => ps.idProduct === numericProductId);
        setProductSizes(filteredSizes);
      } catch (error) {
        handleErrorNotification(error, 'Error al obtener las tallas del producto.');
      }
    };

    fetchSizes();
    fetchProductSizes();
  }, [productId]);

  // Handle size selection from dropdown
  const handleSizeChange = (selectedOption: { value: number; label: string } | null) => {
    setSelectedSize(selectedOption);
  };

  // Add size to the product
  const handleAddSize = async () => {
    if (!selectedSize) {
      showAlert({ title: 'Advertencia', content: 'Por favor selecciona una talla' });
      return;
    }

    // Check if the selected size already exists for the product
    const sizeExists = productSizes.some(ps => ps.idSize === selectedSize.value);
    if (sizeExists) {
      showAlert({ title: 'Advertencia', content: 'La talla ya está agregada al producto' });
      return;
    }

    const formData = {
      idProduct: Number(productId),
      idSize: selectedSize.value,
    };

    try {
      await SaveProductSize(formData)
        .then(() => {
          handleSuccessNotification('Talla agregada correctamente.');
          setSelectedSize(null);
          onProductSizeChange();
        });

      // Update the list of product sizes
      const updatedProductSizes = await getProductSize();
      setProductSizes(updatedProductSizes.filter((ps: any) => ps.idProduct === Number(productId)));
    } catch (error) {
      handleErrorNotification(error, 'Error al agregar la talla.');
    }
  };

  // Delete selected size from product
  const handleDelete = async () => {
    if (!selectedSize) {
      showAlert({ title: 'Advertencia', content: 'Por favor selecciona una talla para eliminar' });
      return;
    }

    const numericProductId = Number(productId);
    const sizeToDelete = productSizes.find(ps => ps.idSize === selectedSize.value && ps.idProduct === numericProductId);

    if (!sizeToDelete) {
      showAlert({ title: 'Error', content: 'No se encontró la talla a eliminar' });
      return;
    }

    try {
      await RemoveProductSize({ id: sizeToDelete.id })
        .then(() => {
          handleSuccessNotification('Talla eliminada correctamente.');
          setSelectedSize(null);
          onProductSizeChange();
        });

      // Update the list of product sizes
      const updatedProductSizes = await getProductSize();
      setProductSizes(updatedProductSizes.filter((ps: any) => ps.idProduct === numericProductId));
    } catch (error) {
      handleErrorNotification(error, 'Error al eliminar la talla.');
    }
  };

  return (
    <div>
      <h3>Agregar Talla:</h3>
      <div className="flex mt-4 items-center">
        <div className="flex items-center">
          <label className="block text-sm font-medium text-gray-700">Selecciona una talla:</label>
          <Select
            value={selectedSize}
            onChange={handleSizeChange}
            options={sizes}
            placeholder="Seleccionar Talla"
            className="p-4 m-2"
          />
        </div>
        <button
          onClick={handleAddSize}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
        >
          Agregar Talla
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

export default ProductSizeAdd;
