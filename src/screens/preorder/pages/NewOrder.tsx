import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Table } from 'antd';
import { getPreOrderById, GetPreOrderInprogressById } from '@/shared/Api/PreOrder/PreOrderApi';
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
    const [preOrderMap, setPreOrderMap] = useState<any | null>(null);
    const [preOrderInProgress, setpreOrderInProgress] = useState<any | null>(null);

    const handlePreOrder = async (id: number) => {
        try {
            const preOrder = await getPreOrderById(id);
            const preOrderData = preOrder.data[0];
            const itemsData = preOrderData.items.invColors;
            setPreOrderData(preOrderData);
            setPreOrderMap([preOrderData.items]); 
            setOrderResult(itemsData);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handlePreOrderProgress = async (id: number) => {
        try {
            const preOrderProgress = await GetPreOrderInprogressById(id);
            setpreOrderInProgress(preOrderProgress.data)
            // console.log('preOrderProgress',preOrderProgress)
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        if (preorderId) {
            handlePreOrder(Number(preorderId));
            handlePreOrderProgress(Number(preorderId));
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
            title: 'Color',
            dataIndex: ['colorPrimary', 'colorname'],
            key: 'primaryColor',
            render: (text: string, record: any) => {
                const backgroundColor = record.colorPrimary.code; 
                return (
                    <span>
                        {text} <span style={{
                            backgroundColor: backgroundColor,
                            border: '2px solid #000', // Black border
                            color: backgroundColor, // Inverted text color for better contrast
                            padding: '0px 4px', // Adjust padding for better spacing
                            borderRadius: '12px', // Rounded corners
                            display: 'inline-block' // Ensure proper alignment
                        }}>@</span>
                    </span>
                );
            },
        },
        {
            title: 'Size',
            dataIndex: ['size', 'size'],
            key: 'size',
        },
        {
            title: 'Type',
            dataIndex: ['product', 'type'],
            key: 'type',
        },
        {
            title: 'Category',
            dataIndex: ['size', 'category'],
            key: 'category',
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
            render: (_: any, record: any) => {
                const salePrice = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'DOP',
                }).format(record.product.sale_price);
                return <span>{salePrice}</span>;
            }
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Total Price',
            key: 'totalPrice',
            render: (_: any, record: any) => {
                const totalPrice = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'DOP',
                }).format(record.quantity * record.product.sale_price);
                return <span>{totalPrice}</span>;
            }
        }
    ];
    // console.log('OrderResult',orderResult)
    // console.log('preOrderInProgress',preOrderInProgress)
    return (
        <div>
            {orderResult && (
                <>
                    <Order preOrderMap={preOrderMap} preOrderInProgress={preOrderInProgress} client={fullClientName} preId={Number(preorderId)} />
                    <div className='container my-4'>
                        <h1 className='text-2xl font-bold mb-4'>Items Disponibles</h1>
                        <Table columns={columns} dataSource={orderResult} rowKey={(record) => record.product.id} pagination={false} />
                    </div>
                </>
            )}
        </div>
    );
};

export default NewOrder;
