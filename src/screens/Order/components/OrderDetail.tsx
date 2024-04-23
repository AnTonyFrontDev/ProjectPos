import React, { useEffect, useState } from 'react';
import { DetalleProps as DetalleOrderProps } from '../../../shared/interfaces/I_inventario';
import { getOrderById } from '@/shared/Api/Order/OrderApi';
import { Descriptions, Collapse } from 'antd';

const { Panel } = Collapse;

const OrderDetail: React.FC<DetalleOrderProps> = ({ Id: orderId }) => {
  const [orderDetail, setOrderDetail] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orderData = await getOrderById(orderId);
        setOrderDetail(orderData.data[0]); // Obtén los detalles de la orden
      } catch (error) {
        console.error('Error al obtener detalle de la orden:', error);
      }
    };

    fetchData();
  }, [orderId]);

  if (!orderDetail) {
    return <div>Cargando...</div>;
  }

  const { detail, descriptionJob, statusOrder } = orderDetail;

  return (
    <div>
      {/* Información del Cliente */}
      <Descriptions title="Información del Cliente">
        <Descriptions.Item label="Nombre">{detail[0].fullName}</Descriptions.Item>
        <Descriptions.Item label="Cantidad de Productos">{detail[0].quantity}</Descriptions.Item>
        <Descriptions.Item label="Monto Total">{detail[0].amount}</Descriptions.Item>
      </Descriptions>

      <Descriptions title="Información de la Orden">
        <Descriptions.Item label="Descripcion de la orden">{descriptionJob}</Descriptions.Item>
        <Descriptions.Item label="Estado de la orden">{statusOrder}</Descriptions.Item>
      </Descriptions>

      {/* Productos */}
      <Collapse accordion>
        {detail[0].products.map((product: any) => (
          <Panel header={`${product.productName} - ${product.size}`} key={product.id}>
            <Descriptions title="Detalle del Producto">
              <Descriptions.Item label="Precio">{product.price}</Descriptions.Item>
              <Descriptions.Item label="Tamaño">{product.size}</Descriptions.Item>
              <Descriptions.Item label="Color Primario">{product.colorPrimary.colorname}</Descriptions.Item>
              <Descriptions.Item label="Cantidad">{product.quantity}</Descriptions.Item>
            </Descriptions>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
}

export default OrderDetail;
