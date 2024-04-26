import { SaveOrder } from '@/shared/Api/Order/OrderApi';
import React, { useState } from 'react';
import Select from 'react-select';

const Order: React.FC<{ orderData: any[] }> = ({ orderData }) => {
  const [products, setProducts] = useState<{ product: any; quantity: number }[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(0);
  const [description, setDescription] = useState<string>('');

  const handleProductChange = (selectedOption: any) => {
    setSelectedProduct(selectedOption);
    setSelectedQuantity(0);
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);

    if (!isNaN(value) && selectedProduct) {
      const selectedProductData = orderData.find(item => item.inventoryColorId === selectedProduct.value);

      if (selectedProductData && value <= selectedProductData.quantity) {
        setSelectedQuantity(value);
      }
    }
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleAddProduct = () => {
    if (selectedProduct && selectedQuantity > 0) {
      setProducts([
        ...products,
        {
          product: selectedProduct,
          quantity: selectedQuantity,
        },
      ]);
      setSelectedProduct(null);
      setSelectedQuantity(0);
    }
  };

  const handleRemoveProduct = (index: number) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  const handleSubmit = async () => {
    try {
      if (!selectedProduct || selectedQuantity === 0 || !description) {
        // Validación de campos obligatorios
        alert('Por favor completa todos los campos.');
        return;
      }
  
      const formData = {
        id: 0,
        user: 0,
        date: new Date().toISOString(),
        fkClient: selectedProduct.clientId,
        fkUser: 0,
        checked: true,
        fkPreOrder: 0,
        descriptionJob: description,
        products: [
          {
            fkOrder: 0,
            fkInventoryColor: selectedProduct.value,
            quantity: selectedQuantity
          }
        ]
      };
  
      await SaveOrder(formData);
      // Limpiar el formulario después de guardar
      setSelectedProduct(null);
      setSelectedQuantity(0);
      setDescription('');
      alert('Orden guardada exitosamente');
    } catch (error) {
      console.error('Error al guardar la orden:', error);
      alert('Error al guardar la orden. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Agregar Orden</h1>
      <div className="mb-4">
        <label className="block">Seleccionar Producto:</label>
        <Select
          options={orderData.map(item => ({
            value: item.inventoryColorId,
            label: item.product.name_prod,
            clientId: item.clientId,
          }))}
          value={selectedProduct}
          onChange={handleProductChange}
          isSearchable
        />
      </div>
      <div className="mb-4">
        <label className="block">Cantidad:</label>
        <input
          type="number"
          value={selectedQuantity}
          onChange={handleQuantityChange}
          className="block w-full border border-gray-300 rounded-md py-2 px-3"
          min={0}
        />
      </div>
      <div className="mb-4">
        <label className="block">Descripción del Trabajo:</label>
        <input
          type="text"
          value={description}
          onChange={handleDescriptionChange}
          className="block w-full border border-gray-300 rounded-md py-2 px-3"
        />
      </div>
      <button onClick={handleAddProduct} className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Agregar Producto
      </button>
      {products.length > 0 && (
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Producto</th>
              <th className="border border-gray-300 px-4 py-2">Cantidad</th>
              <th className="border border-gray-300 px-4 py-2">Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">{item.product.label}</td>
                <td className="border border-gray-300 px-4 py-2">{item.quantity}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button onClick={() => handleRemoveProduct(index)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button onClick={handleSubmit} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Guardar Orden
      </button>
    </div>
  );
};

export default Order;
