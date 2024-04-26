import { SaveOrder } from '@/shared/Api/Order/OrderApi';
import React, { useState } from 'react';
import Select from 'react-select';

const Order: React.FC<{ orderData: any[], client: any, preId: number }> = ({ orderData, client, preId }) => {
  const [products, setProducts] = useState<{ product: any; quantity: number; fkInventoryColor: number; }[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(0);
  const [description, setDescription] = useState<string>('');

  const handleProductChange = (selectedOption: any) => {
    setSelectedProduct(selectedOption);
    setSelectedQuantity(0);
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setSelectedQuantity(value);
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
          fkInventoryColor: selectedProduct.value || 0,
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
      if (!description || products.length === 0) {
        alert('Por favor completa todos los campos.');
        return;
      }
  
      const formData = {
        id: 0,
        user: 0,
        date: new Date().toISOString(),
        fkClient: client[0].id || 0,
        fkUser: 1,
        checked: true,
        fkPreOrder: preId,
        descriptionJob: description,
        products: products.map((product) => ({
          fkOrder: 0,
          fkInventoryColor: product.product.value,
          quantity: product.quantity,
        })),
      };
      console.log(formData)
      console.log(products)
      await SaveOrder(formData);
      setSelectedProduct(null);
      setSelectedQuantity(0);
      setDescription('');
      setProducts([]);
      alert('Orden guardada exitosamente');
    } catch (error) {
      console.error('Error al guardar la orden:', error);
      alert('Error al guardar la orden. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Agregar Orden</h1>
      <div className='gap-4 inline-flex w-full'>
        <div className='flex flex-col w-1/2'>
          <label>Cliente:</label>
          <input
            type="text"
            value={client[0].f_name || ""}
            readOnly
            className="form-input"
          />
        </div>
        <div className='flex flex-col w-1/2'>
          <label>Descripción:</label>
          <input
            type="text"
            value={description}
            onChange={handleDescriptionChange}
            className="form-input"
          />
        </div>
      </div>
  
      <table className="min-w-full divide-y divide-gray-200 mt-3">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap">{product.product.name_prod}</td>
              <td className="px-6 py-4 whitespace-nowrap">{product.quantity}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button onClick={() => handleRemoveProduct(index)} className="text-red-500 hover:text-red-700">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4">
        <label className="block">Seleccionar Producto:</label>
        <Select
          className="w-full"
          options={orderData.map(item => ({
            value: item.inventoryColorId,
            label: item.product.name_prod
          }))}
          value={selectedProduct}
          onChange={handleProductChange}
          isSearchable
        />
      </div>

      <div className="mt-4">
        <label className="block">Cantidad:</label>
        <input
          type="number"
          value={selectedQuantity}
          onChange={handleQuantityChange}
          className="w-full form-input"
        />
      </div>

      <div className="mt-4">
        <button onClick={handleAddProduct} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Agregar Producto</button>
      </div>

      <div className="mt-4">
        <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Guardar Orden</button>
      </div>
    </div>
  );
};

export default Order;
