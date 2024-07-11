import React, { useEffect, useState } from 'react';
import { Descriptions, Table } from 'antd';
import { DetalleProps as DetalleOrderProps } from '@/shared/interfaces/I_inventario';
import { getNoteCreditId } from '@/shared/Api/NoteCredit/NoteCreditApi';


const NoteCreditDetail: React.FC<DetalleOrderProps> = ({ Id: notecreditId }) => {
  const [orderDetail, setOrderDetail] = useState<any>(null);
  const [payment, setPaymentDetail] = useState<any>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const orderData = await getNoteCreditId(notecreditId);
        setOrderDetail(orderData.data);
        setPaymentDetail(orderData.data.payments); // Obtén los detalles de la orden
        console.log('orderDetail', orderData.data.amountPending);
      } catch (error) {
        console.error('Error al obtener detalle de la orden:', error);
      }
    };
    
    fetchData();
  }, [notecreditId]);
  


  if (!payment) {
    return <div>Cargando...</div>;
  }

  const client = payment[0]?.client;
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Monto',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Tipo de Pago',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Banco',
      dataIndex: 'bank',
      key: 'bank',
    },
    {
      title: 'Cuenta',
      dataIndex: 'account',
      key: 'account',
    },
    {
      title: 'Numero De Documento',
      dataIndex: 'documentNumber',
      key: 'documentNumber',
    },
  ];

  return (
    <div>
      <Descriptions title="Informacion del Cliente">
        <Descriptions.Item label="NO.">{client?.id}</Descriptions.Item>
        <Descriptions.Item label="Nombre">{client?.f_name} {client?.l_name}</Descriptions.Item>
        <Descriptions.Item label="Apellido">{client?.f_surname} {client?.l_surname}</Descriptions.Item>
        <Descriptions.Item label="RNC">{client?.rnc}</Descriptions.Item>
        <Descriptions.Item label="DNI">{client?.dni}</Descriptions.Item>
        <Descriptions.Item label="Monto Pendiente">{orderDetail.amountPending}</Descriptions.Item>
      </Descriptions>
      
      <Table
        className='mt-4'
        dataSource={payment}
        columns={columns}
        rowKey="id"
        pagination={false}
      />
    </div>
  );
}

export default NoteCreditDetail;
