import React, { useEffect, useState } from 'react';
import { Descriptions, Table } from 'antd';
import { getNoteCreditId } from '@/shared/Api/NoteCredit/NoteCreditApi';
import { IBaseModel } from '@/shared/interfaces/IBaseModel';

const NoteCreditDetail: React.FC<IBaseModel> = ({ id: notecreditId }) => {
  const [orderDetail, setOrderDetail] = useState<any>(null);
  const [client, setClient] = useState<any>(null);
  const [payments, setPayments] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!notecreditId) return;
      try {
        const orderData = await getNoteCreditId(notecreditId);
        setOrderDetail(orderData.data);
        setClient(orderData.data.client);
        setPayments(orderData.data.payments || []); // Asegúrate de que `payments` sea un array
      } catch (error) {
        console.error('Error al obtener detalle de la orden:', error);
      }
    };

    fetchData();
  }, [notecreditId]);

  if (!orderDetail || !client) {
    return <div>Cargando...</div>;
  }

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
      title: 'Número de Documento',
      dataIndex: 'documentNumber',
      key: 'documentNumber',
    },
  ];

  return (
    <div>
      <Descriptions title="Información del Cliente">
        <Descriptions.Item label="NO.">{client.id}</Descriptions.Item>
        <Descriptions.Item label="Nombre">{`${client.f_name} ${client.l_name}`}</Descriptions.Item>
        <Descriptions.Item label="Apellido">{`${client.f_surname} ${client.l_surname}`}</Descriptions.Item>
        <Descriptions.Item label="RNC">{client.rnc}</Descriptions.Item>
        <Descriptions.Item label="DNI">{client.dni}</Descriptions.Item>
        <Descriptions.Item label="Monto Pendiente">{orderDetail.amountPending}</Descriptions.Item>
      </Descriptions>
      
      <Table
        className='mt-4'
        dataSource={payments}
        columns={columns}
        rowKey="id"
        pagination={false}
      />
    </div>
  );
}

export default NoteCreditDetail;