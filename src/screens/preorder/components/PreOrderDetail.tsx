import React, { useEffect, useState } from 'react';
import { Descriptions, Table } from 'antd';
import { DetalleProps as DetallePreOrdersProps } from '@/shared/interfaces/I_inventario';
import { getPreOrderById } from '@/shared/Api/PreOrder/PreOrderApi';
import OrderForm from './CheckOrder';



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

    // Definir columnas para la tabla de productos
    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Nombre', dataIndex: 'productName', key: 'productName' },
        { title: 'Tamaño', dataIndex: 'size', key: 'size' },
        { title: 'Color Primario', dataIndex: 'colorPrimary', key: 'colorPrimary' },
        { title: 'Precio', dataIndex: 'price', key: 'price' },
        { title: 'Cantidad', dataIndex: 'quantity', key: 'quantity' },
    ];

    return (
        <div>
            <Descriptions title="Información del Cliente">
                <Descriptions.Item label="Nombre">{`${client[0].f_name} ${client[0].l_name}`}</Descriptions.Item>
                <Descriptions.Item label="Apellido">{`${client[0].f_surname} ${client[0].l_surname}`}</Descriptions.Item>
                <Descriptions.Item label="RNC">{client[0].rnc}</Descriptions.Item>
                <Descriptions.Item label="DNI">{client[0].dni}</Descriptions.Item>
                <Descriptions.Item label="Teléfono">
                    {client[0].phones.map((phone: any) => (
                        <div key={phone.id}>{phone.number}</div>
                    ))}
                </Descriptions.Item>
            </Descriptions>
            <OrderForm id={preorderId} />

            <h3>Productos</h3>
            <Table
                columns={columns}
                dataSource={items} 
            />
        </div>
    );
};

export default PreOrderDetail;
