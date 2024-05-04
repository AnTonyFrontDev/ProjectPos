import { SaveOrder } from '@/shared/Api/Order/OrderApi';
import React, { useState } from 'react';
import Select from 'react-select';
import { Table, Button } from 'antd';
import { IOrderProduct, IOrderPost } from '@/shared/interfaces/order/IOrderPost';
import { FormInputsClasses } from '@/shared/Common/cssComponent';

const Order: React.FC<{ orderData: any[], client: any, preId: number }> = ({ orderData, client, preId }) => {
  const [products, setProducts] = useState<IOrderProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [sendTo, setSendTo] = useState<string>('');

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

  const handleSendToChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSendTo(event.target.value);
  };

  const handleAddProduct = () => {
    if (selectedProduct && selectedQuantity > 0) {
      const newProduct: IOrderProduct = {
        fkOrder: 0,
        fkInventoryColor: selectedProduct.value || 0,
        name_prod: selectedProduct.label || "a",
        quantity: selectedQuantity,
      };
      setProducts([...products, newProduct]);
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

      const formData: IOrderPost = {
        id: 0,
        user: 1,
        date: new Date().toISOString(),
        fkClient: client[0].id || 0,
        fkUser: 1,
        checked: true,
        fkPreOrder: preId,
        descriptionJob: description,
        sendTo: sendTo,
        products: products,
      };

      console.log('FormData:', formData);
      await SaveOrder(formData);

      // Reiniciar los estados después de guardar la orden
      setSelectedProduct(null);
      setSelectedQuantity(0);
      setDescription('');
      setSendTo('');
      setProducts([]);

      alert('Orden guardada exitosamente');
    } catch (error) {
      console.error('Error al guardar la orden:', error);
      alert('Error al guardar la orden. Por favor, inténtalo de nuevo.');
    }
  };

  console.log('OrderData', orderData)

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Agregar Orden</h1>
      <div className='gap-4 inline-flex w-full'>
        <div className='flex flex-col w-1/2'>
          <label>Cliente:</label>
          <input
            type="text"
            value={`${client[0].f_name} ${client[0].l_name} ${client[0].f_surname} ${client[0].l_surname}`.trim() || ""}
            readOnly
            disabled
            className={FormInputsClasses}
          />
        </div>
        <div className='flex flex-col w-1/2'>
          <label>Descripción:</label>
          <input
            type="text"
            value={description}
            onChange={handleDescriptionChange}
            className={FormInputsClasses}
          />
        </div>
        <div className='flex flex-col w-1/2'>
          <label>Enviar a:</label>
          <input
            type="text"
            value={sendTo}
            onChange={handleSendToChange}
            className={FormInputsClasses}
          />
        </div>
      </div>


      <Table dataSource={products} rowKey={(_record : any, index : any) => index!.toString()}>
        <Table.Column
          title="#"
          dataIndex="index"
          key="index"
          render={(_text : any , _record : any , index : any ) => index + 1}
        />
        <Table.Column
          title="Producto"
          dataIndex="product"
          key="product"
          render={(_text : any, record: IOrderProduct) => record.name_prod}
        />
        <Table.Column
          title="Cantidad"
          dataIndex="quantity"
          key="quantity"
        />
        <Table.Column
          title="Acciones"
          key="actions"
          render={(_text : any, _record : any, index: any ) => (
            <Button
              type="link"
              danger
              onClick={() => handleRemoveProduct(index)}
            >
              Eliminar
            </Button>
          )}
        />
      </Table>

      <div className="mt-4">
        <label className="block">Seleccionar Producto:</label>
        <Select
          className="w-full"
          options={orderData.map(item => ({
            value: item.inventoryColorId,
            label: `${item.product.name_prod} - ${item.size.size} - ${item.colorPrimary.colorname} - ${item.quantity}`
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
