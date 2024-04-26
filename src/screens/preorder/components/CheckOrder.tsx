import { CheckOrder as apiCheckOrder } from '@/shared/Api/Order/OrderApi';
import { getPreOrderById } from '@/shared/Api/PreOrder/PreOrderApi';
import { useState } from 'react';
import Order from '../../Order/pages/Order';
import { Button } from 'antd';
import { IClient } from '@/shared/interfaces/order/IOrderGet';

interface PreOrderData {
  id: number;
  client: IClient[];
  items: any[];
}


const CheckOrder: React.FC<{ id: number }> = ({ id }) => {
  const [preOrderData, setPreOrderData] = useState<PreOrderData | null>(null);
  const [orderResult, setOrderResult] = useState<any | null>(null);

  const handleClick = async (id: number) => {

    try {
      // Obtener datos de la preorden por su ID
      const preOrder = await getPreOrderById(id);
      console.log('PreOrder:', preOrder.data[0]);
      setPreOrderData(preOrder.data[0]);


      // Construir el formData para CheckOrder 
      const formData = preOrder.data[0].items.map((item: any) => ({
        fkSize: item.sizeId,
        fkProduct: item.productId,
        fkColorPrimary: item.colorPrimaryId,
        fkColorSecondary: item.colorSecondaryId
      }));
      // console.log('FormData:', formData);

      // Realizar CheckOrder
      const orderResponse = await apiCheckOrder(formData); // Realizar la llamada y capturar el resultado
      // console.log('Order Response:', orderResponse);

      setOrderResult(orderResponse);
      // await apiCheckOrder(formData);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const fullClientName = preOrderData ? preOrderData.client : '';
  console.log('Datos Cargados', preOrderData, fullClientName);

  return (
    <div>
      <Button onClick={() => handleClick(id)}>Realizar CheckOrder</Button>
      {orderResult ? <Order orderData={orderResult} client={fullClientName} preId={id} /> : null}
    </div>
  );
};

export default CheckOrder;