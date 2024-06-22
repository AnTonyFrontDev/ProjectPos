import { SaveOrder } from '@/shared/Api/Order/OrderApi';
import React, { useState } from 'react';
import Select from 'react-select';
import { Table, Button } from 'antd';
import { IOrderProduct, IOrderPost } from '@/shared/interfaces/order/IOrderPost';
import { FormInputsClasses } from '@/shared/Common/cssComponent';

const Order: React.FC<{ preOrderMap: any[], preOrderInProgress: any[]; client: any, preId: number }> = ({ preOrderMap, preOrderInProgress, client, preId }) => {
  const [products, setProducts] = useState<IOrderProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(0);
  const [maxQuantity, setMaxQuantity] = useState(0);
  const [formData, setFormData] = useState({
    descriptionJob: '',
    sendTo: '',
    observation: ''
  });

  const handleProductChange = (selectedOption: any) => {
    setSelectedProduct(selectedOption);

    const selectedItem = preOrderMap.flatMap((item: any) => item.invColors).find((invColor: any) => invColor.inventoryColorId === selectedOption.value);
    // const selectedItem = preOrderInProgress.find((item: any) => item.id === selectedOption.value);
    console.log('selectedItem', selectedItem);
    // const quantityProgress = preOrderInProgress
    // .find((item: any) => item.id === selectedOption.value)?.quantity || 0;
    const quantityProgress = preOrderInProgress.find((item: any ) => item.quantity ? item.quantity : 0)
    console.log('quantityProgress', quantityProgress.quantity);

    const quantityPerItem = selectedItem ? Math.min(selectedItem.quantityPreOrder, quantityProgress.quantity) : 0;
    setMaxQuantity(quantityPerItem);
    setSelectedQuantity(0);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = Math.min(Number(event.target.value), maxQuantity);
    setSelectedQuantity(quantity);
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
      if (!formData.descriptionJob || products.length === 0) {
        alert('Por favor completa todos los campos.');
        return;
      }

      const orderData: IOrderPost = {
        id: 0,
        user: 1,
        date: new Date().toISOString(),
        fkClient: client[0].id || 0,
        fkUser: 1,
        checked: true,
        fkPreOrder: preId,
        descriptionJob: formData.descriptionJob,
        sendTo: formData.sendTo,
        products: products,
        observation: formData.observation,
      };

      // console.log('FormData:', orderData);
      await SaveOrder(orderData);

      // Reiniciar los estados después de guardar la orden
      setSelectedProduct(null);
      setSelectedQuantity(0);
      setFormData({
        descriptionJob: '',
        sendTo: '',
        observation: ''
      });
      setProducts([]);

      alert('Orden guardada exitosamente');
    } catch (error) {
      console.error('Error al guardar la orden:', error);
      alert('Error al guardar la orden. Por favor, inténtalo de nuevo.');
    }
  };

  // console.log('OrderData', orderData)
  console.log('PreOrderData', preOrderMap)

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
            name="descriptionJob"
            value={formData.descriptionJob}
            onChange={handleInputChange}
            className={FormInputsClasses}
          />
        </div>
        <div className='flex flex-col w-1/2'>
          <label>Enviar a:</label>
          <input
            type="text"
            name="sendTo"
            value={formData.sendTo}
            onChange={handleInputChange}
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
        <div className='flex flex-col w-1/2 mt-4'>
          <label>Observaciones:</label>
          <textarea
            name="observation"
            value={formData.observation}
            onChange={handleInputChange}
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
