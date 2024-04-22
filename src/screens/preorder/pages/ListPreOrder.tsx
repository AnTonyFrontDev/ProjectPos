import { useState, useEffect } from 'react';
import { getPreOrders } from '@/shared/Api/PreOrder/PreOrderApi';
import { IPreOrderGet } from '@/shared/interfaces/Preorder/IPreOrderGet';
import useOrderProcessing from '../hooks/useOrderHook';
// import { ICheckOrder } from '../../../shared/interfaces/order/IOrderPost';
import mapPreOrderToCheckOrder from '../hooks/useMapPreOrder';
import { Link } from 'react-router-dom';


function ListPreOrder() {
    const [preOrders, setPreOrders] = useState<IPreOrderGet[]>([]);
    const { loading, error, processOrder } = useOrderProcessing();

    useEffect(() => {
        const fetchPreOrders = async () => {
            try {
                const response = await getPreOrders();
                setPreOrders(response.data);
            } catch (error) {
                console.error('Error fetching pre-orders:', error);
            }
        };

        fetchPreOrders();
    }, []);

    const handleOrderClick = async (preOrder: IPreOrderGet) => {
        // Convertir la data de IPreOrderGet a ICheckOrder
        const checkOrderData = mapPreOrderToCheckOrder(preOrder);
        console.log(error)
        // Procesar la orden
        await processOrder([checkOrderData], preOrder);
    };

    return (
        <div className="container mx-auto">
            <div>
                <h2 className="text-2xl font-bold mb-4">Listado de Pedidos
                </h2>
                
                <Link to="/preOrder/new"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Agregar

                </Link>
            </div>
            <table className="w-full border-collapse border border-gray-200">
                <thead>
                    <tr>
                        <th className="p-3 text-left">ID</th>
                        <th className="p-3 text-left">Cliente</th>
                        <th className="p-3 text-left">Productos</th>
                        <th className="p-3 text-left">Ordenar</th> {/* Nueva columna para el botón */}
                    </tr>
                </thead>
                <tbody>
                    {preOrders.map(data => (
                        <tr key={data.id}>
                            <td className="p-3">{data.id}</td>
                            <td className="p-3">{`${data.client.f_name} ${data.client.f_surname} ${data.client.l_surname}`}</td>
                            <td className="p-3">
                                <ul>
                                    {data.preOrderProducts.map(productData => (
                                        <li key={productData.id}>{productData.product.namE_PRODUCT}</li>
                                    ))}
                                </ul>
                            </td>
                            <td className="p-3">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => handleOrderClick(data)}
                                    disabled={loading}
                                >
                                    {loading ? 'Procesando...' : 'Ordenar'}
                                    
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListPreOrder;
