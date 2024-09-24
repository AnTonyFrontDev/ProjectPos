import React, { useEffect, useState } from 'react';
import { Descriptions, Table, Modal, Button } from 'antd';
import { getPaymentByOrderId, RemovePayment } from '@/shared/Api/PaymentApi';
// import { DetalleProps as DetalleOrderProps } from '@/shared/interfaces/I_inventario';
import { useNavigate } from 'react-router-dom';
import { DATE } from '@/shared/Common/CurrentDate';
import { IBaseModelID } from '@/shared/interfaces/IBaseModel';

const PaymentDetail: React.FC<IBaseModelID> = ({ id: orderId }) => {
  const [orderDetail, setOrderDetail] = useState<any>(null);
  const [payment, setPaymentDetail] = useState<any>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!orderId) return;
        const orderData = await getPaymentByOrderId(orderId);
        setOrderDetail(orderData.data);
        setPaymentDetail(orderData.data.payments); // Obtén los detalles de la orden
        console.log('orderDetail', orderData.data.amountPending);
      } catch (error) {
        console.error('Error al obtener detalle de la orden:', error);
      }
    };
    
    fetchData();
  }, [orderId]);
  

  const handleDelete = async (paymentId: number) => {
    Modal.confirm({
      title: 'Confirmar',
      content: '¿Está seguro de que desea eliminar este registro?',
      okText: 'Sí',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          const formData = {
            id: paymentId,
            user: 1, // Reemplaza con el id del usuario real
            date: DATE,
          };
          await RemovePayment(formData); // Llama a la API para eliminar el pago
          navigate('/atributos/Payment'); // Redirige al usuario
        } catch (error) {
          console.error('Error al eliminar el registro', error);
        }
      },
    });
  };


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
    // {
    //   title: 'Monto Pendiente',
    //   dataIndex: 'amountPending',
    //   key: 'amountPending',
    // },
    {
      title: 'Acciones',
      key: 'action',
      render: (_: any, record: any) => (
        <Button type="link" danger onClick={() => handleDelete(record.id)}>
          Eliminar
        </Button>
      ),
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

export default PaymentDetail;
