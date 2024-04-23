// import React from 'react'
import React, { useEffect, useState } from 'react';
// import DetalleProducto from './DetalleProducto';
import { DetalleProps as DetallePreOrdersProps } from '@/shared/interfaces/I_inventario';
import { getPreOrderById } from '@/shared/Api/PreOrder/PreOrderApi';


const PreOrderDetail: React.FC<DetallePreOrdersProps> = ({ Id: preorderId }) => {
    const [detallePreOrder, setDetallePreOrder] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                getPreOrderById
                
                // const productIdNumber = Number(productId);
                const productData = await getPreOrderById(preorderId);
                setDetallePreOrder(productData);
                console.log(productData);

            } catch (error) {
                console.error('Error al obtener detalle del producto:', error);
            }
        };

        fetchData();
    }, [preorderId]);

    if (!detallePreOrder) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <div>PreOrderDetail</div>

        </div>
    )
}

export default PreOrderDetail

