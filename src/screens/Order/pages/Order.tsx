import { SaveOrder } from '@/shared/Api/Order/OrderApi';
import React, { useState } from 'react';
import Select from 'react-select';
import { Table, Button } from 'antd';
import { IOrderProduct, IOrderPost } from '@/shared/interfaces/order/IOrderPost';
import { FormInputsClasses } from '@/shared/Common/cssComponent';

const Order: React.FC<{ preOrderMap: any[], client: any, preId: number }> = ({ preOrderMap, client, preId }) => {
  const [products, setProducts] = useState<IOrderProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(0);
  const [maxQuantity, setMaxQuantity] = useState(0);
  const [description, setDescription] = useState<string>('');
  const [sendTo, setSendTo] = useState<string>('');

  const handleProductChange = (selectedOption: any) => {
    setSelectedProduct(selectedOption);

    const selectedItem = preOrderMap.flatMap((item: any) => item.invColors).find((invColor: any) => invColor.inventoryColorId === selectedOption.value);

    console.log('selectedItem', selectedItem);

    setMaxQuantity(selectedItem ? selectedItem.quantityPreOrder : 0);
    setSelectedQuantity(0);
  };
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = Math.min(Number(event.target.value), maxQuantity);
    setSelectedQuantity(quantity);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleSendToChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSendTo(event.target.value);
  };

  const handleAddProduct = () => {
    if (selectedProduct && selectedQuantity > 0) {
      const existingProductIndex = products.findIndex(product => product.fkInventoryColor === selectedProduct.value);

      if (existingProductIndex !== -1) {
        alert('Este producto ya está en la lista.');
        return;
      }

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
        observation: '',
      };

      // console.log('FormData:', formData);
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

  // console.log('OrderData', orderData)
  console.log('PreOrderData', preOrderMap)

  // console.log('OrderData', orderData)

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Agregar Orden</h1>
      <div className='gap-4 inline-flex w-full mb-5'>
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


      <Table dataSource={products} rowKey={(_record: any, index: any) => index!.toString()}>
        <Table.Column
          title="#"
          dataIndex="index"
          key="index"
          render={(_text: any, _record: any, index: any) => index + 1}
        />
        <Table.Column
          title="Producto"
          dataIndex="product"
          key="product"
          render={(_text: any, record: IOrderProduct) => record.name_prod}
        />
        <Table.Column
          title="Cantidad"
          dataIndex="quantity"
          key="quantity"
        />
        <Table.Column
          title="Acciones"
          key="actions"
          render={(_text: any, _record: any, index: any) => (
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
        <label className="block mb-2">Seleccionar Producto:</label>
        <div className="flex space-x-4">
          <Select
            className="w-1/2"
            options={preOrderMap.flatMap((item: any) =>
              item.invColors.map((invColor: any) => ({
                value: invColor.inventoryColorId,
                label: `${invColor.product.name_prod} - ${invColor.size.size} - ${invColor.colorPrimary.colorname} - ${invColor.quantityPreOrder}`
              }))
            )}
            value={selectedProduct}
            onChange={handleProductChange}
            isSearchable
          />
          <input
            type="number"
            value={selectedQuantity}
            onChange={handleQuantityChange}
            className={FormInputsClasses}
            max={maxQuantity}
            min={0}
            step={0}
          />
        </div>
        <div className='flex flex-col w-1/2'>
          <label>Obsevaciones:</label>
          <input
            type="textarea"
            value={sendTo}
            onChange={handleSendToChange}
            className={FormInputsClasses}
          />
        </div>
      </div>

      <div className="mt-4">
        <div className="flex space-x-4">
          <button onClick={handleAddProduct} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Agregar Producto
          </button>
          <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Guardar Orden
          </button>
        </div>
      </div>
    </div>
  );
};

export default Order;
