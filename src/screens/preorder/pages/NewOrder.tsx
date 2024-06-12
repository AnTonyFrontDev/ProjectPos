import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Table } from 'antd';
import { CheckOrder as apiCheckOrder } from '@/shared/Api/Order/OrderApi';
import { getPreOrderById } from '@/shared/Api/PreOrder/PreOrderApi';
import Order from '../../Order/pages/Order';
import { IClient } from '@/shared/interfaces/order/IOrderGet';

interface PreOrderData {
    id: number;
    client: IClient[];
    items: any[];
}

const NewOrder: React.FC = () => {
    const { preorderId } = useParams<{ preorderId: string }>();
    const [preOrderData, setPreOrderData] = useState<PreOrderData | null>(null);
    const [orderResult, setOrderResult] = useState<any | null>(null);

    const handleClick = async (id: number) => {
        try {
            const preOrder = await getPreOrderById(id);
            setPreOrderData(preOrder.data[0]);

            const formData = preOrder.data[0].items.map((item: any) => ({
                fkSize: item.sizeId,
                fkProduct: item.productId,
                fkColorPrimary: item.colorPrimaryId,
                fkColorSecondary: item.colorSecondaryId,
            }));

            const orderResponse = await apiCheckOrder(formData);
            setOrderResult(orderResponse);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        if (preorderId) {
            handleClick(Number(preorderId));
        }
    }, [preorderId]);

    const fullClientName = preOrderData ? preOrderData.client : '';

    const columns = [
        {
            title: 'Product ID',
            dataIndex: ['product', 'id'],
            key: 'productId',
        },
        {
            title: 'Product Name',
            dataIndex: ['product', 'name_prod'],
            key: 'productName',
        },
        {
            title: 'Description',
            dataIndex: ['product', 'description'],
            key: 'description',
        },
        {
            title: 'Sale Price',
            dataIndex: ['product', 'sale_price'],
            key: 'salePrice',
        },
        {
            title: 'Type',
            dataIndex: ['product', 'type'],
            key: 'type',
        },
        {
            title: 'Size',
            dataIndex: ['size', 'size'],
            key: 'size',
        },
        {
            title: 'Category',
            dataIndex: ['size', 'category'],
            key: 'category',
        },
        {
            title: 'Primary Color',
            dataIndex: ['colorPrimary', 'colorname'],
            key: 'primaryColor',
            render: (text: string, record: any) => (
                <span style={{ backgroundColor: record.colorPrimary.code, color: '#fff', padding: '2px 4px', borderRadius: '4px' }}>
                    {text}
                </span>
            ),
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
    ];

    return (
        <div>
            {orderResult && (
                <>
                    <Order orderData={orderResult} client={fullClientName} preId={Number(preorderId)} />
                    <div className='container my-4'>
                    <h1 className='text-2xl font-bold mb-4'>Items Disponibles</h1>
                    <Table columns={columns} dataSource={orderResult} rowKey={(record) => record.product.id} pagination={false}/>
                    </div>
                </>
            )}
        </div>
    );
};

export default NewOrder;
