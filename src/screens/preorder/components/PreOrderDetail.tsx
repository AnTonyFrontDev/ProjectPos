// import React from 'react'
import React, { useEffect, useState } from 'react';
// import DetalleProducto from './DetalleProducto';
import { DetalleProps as DetallePreOrdersProps } from '@/shared/interfaces/I_inventario';
import { getPreOrderById } from '@/shared/Api/PreOrder/PreOrderApi';
import { Descriptions, Collapse } from 'antd';

const { Panel } = Collapse;

const PreOrderDetail: React.FC<DetallePreOrdersProps> = ({ Id: preorderId }) => {
    const [detallePreOrder, setDetallePreOrder] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const preOrderData = await getPreOrderById(preorderId);
                setDetallePreOrder(preOrderData.data[0]); // Obtén los datos de la preorden
            } catch (error) {
                console.error('Error al obtener detalle de la preorden:', error);
            }
        };

        fetchData();
    }, [preorderId]);

    if (!detallePreOrder) {
        return <div>Cargando...</div>;
    }

    const { client, items } = detallePreOrder;

    return (
        <div>
            <Descriptions title="Información del Cliente">
                <Descriptions.Item label="Nombre">{client[0].f_name} {client[0].l_name}</Descriptions.Item>
                <Descriptions.Item label="Apellido">{client[0].f_surname} {client[0].l_surname}</Descriptions.Item>
                <Descriptions.Item label="RNC">{client[0].rnc}</Descriptions.Item>
                <Descriptions.Item label="DNI">{client[0].dni}</Descriptions.Item>
                <Descriptions.Item label="Teléfono">
                    {client[0].phones.map((phone : any) => (
                        <div key={phone.id}>{phone.number}</div>
                    ))}
                </Descriptions.Item>
            </Descriptions>

            <h3>Productos</h3>
            <Collapse accordion>
                {items.map((item : any) => (
                    <Panel header={`${item.id} - ${item.productName}`} key={item.id}>
                        <Descriptions title="Información del Producto">
                            <Descriptions.Item label="Precio">{item.price}</Descriptions.Item>
                            <Descriptions.Item label="Tamaño">{item.size}</Descriptions.Item>
                            <Descriptions.Item label="Color Primario">{item.colorPrimary}</Descriptions.Item>
                            <Descriptions.Item label="Cantidad">{item.quantity}</Descriptions.Item>
                        </Descriptions>
                    </Panel>
                ))}
            </Collapse>
        </div>
    );
}

export default PreOrderDetail;

