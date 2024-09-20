import React, { useEffect, useState } from 'react';
import { Descriptions, Table } from 'antd';
import { getPaymentByOrderId } from '@/shared/Api/Payment/PaymentApi';
import { getPreOrderById } from '@/shared/Api/PreOrder/PreOrderApi';
import ApiTable from '@/components/Generics/Tabla/apiTable';
import { IBaseModelID } from '@/shared/interfaces/IBaseModel';
import { IPreOrder } from '@/shared/interfaces/IPreOrder';
import { PaymentsTableByOrders, ProductsTableByOrders } from '@/components/Generics/Tabla/tData';

const AReceivableDetail: React.FC<IBaseModelID> = ({ id: accountId }) => {
  const [orderDetail, setOrderDetail] = useState<any>(null);
  const [payment, setPaymentDetail] = useState<any>(null);
  const [filteredItems, setFilteredItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchPreOrderData = async () => {
      try {
        if (!accountId) return;
        const preOrderData = await getPreOrderById(accountId);
        setFilteredItems(preOrderData?.data[0]?.items.preOrderProducts || []);
        setOrderDetail(preOrderData.data[0]);
      } catch (error) {
        console.error('Error al obtener pre-order:', error);
      }
    };
    const fetchPaymentData = async () => {
      try {
        if (!accountId) return;
        const orderData = await getPaymentByOrderId(accountId);
        setPaymentDetail(orderData.data.payments);
        setOrderDetail((prevOrderDetail : IPreOrder) => ({
          ...prevOrderDetail,
          ...orderData.data, // Actualiza con los datos del pago
        }));
      } catch (error) {
        console.error('Error al obtener el pago:', error);
      }
    };

    // Ejecutar ambas llamadas, pero de forma independiente
    fetchPreOrderData();
    fetchPaymentData();
  }, [accountId]);

  
  if (!orderDetail) {
    return <div>Cargando...</div>;
  }
  console.log('orderDetail', orderDetail);
  console.log('Payment', payment);
  const client =  orderDetail?.client?.[0];
  
  return (
    <div>
      <Descriptions title="Informacion del Cliente">
        <Descriptions.Item label="No. Pedido">{client?.id}</Descriptions.Item>
        <Descriptions.Item label="Nombre">{client?.f_name} {client?.l_name}</Descriptions.Item>
        <Descriptions.Item label="Apellido">{client?.f_surname} {client?.l_surname}</Descriptions.Item>
        <Descriptions.Item label="RNC">{client?.rnc}</Descriptions.Item>
        <Descriptions.Item label="DNI">{client?.dni}</Descriptions.Item>
        <Descriptions.Item label="Monto Pendiente">{orderDetail.amountPending }</Descriptions.Item>
      </Descriptions>
      {payment?.length > 0 && (
        <>
          <h2 className='my-4'>Pagos</h2>
          <Table
            className='mt-4'
            dataSource={payment}
            columns={PaymentsTableByOrders}
            rowKey="id"
            pagination={false}
          />
        </>
      )}
      {filteredItems.length > 0 && (
        <div className='my-8'>
          <h2 className='my-4'>Productos</h2>
          <ApiTable
            dataSource={filteredItems}
            columns={ProductsTableByOrders}
            usarForm='PreOrder'
          />
        </div>
      )}
    </div>
  );
}

export default AReceivableDetail;
