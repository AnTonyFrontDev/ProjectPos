// Componente Dashboard
import { useEffect, useState } from 'react';
import { getPreOrdersPending } from '@/shared/Api/PreOrder/PreOrderApi';
import DOptions from '../components/DOptions';

import { IPreOrderGetPending } from '@/shared/interfaces/Preorder/IPreOrderPending';

const Dashboard = () => {
  const [orders, setOrders] = useState<IPreOrderGetPending[]>([]);

  useEffect(() => {
    async function fetchOrders() {
      const data = await getPreOrdersPending();
      setOrders(data);
    }

    fetchOrders();
  }, []);

  return (
    <>
      <DOptions/>
      <div className="grid grid-cols-4 gap-8">
        <div className="col-span-4 bg-gray-50 shadow-lg p-4 rounded-md">
          <div className="bg-gray-100 ">
            <div className="flex justify-between bg-white p-4 shadow-md">
              <h1 className="text-2xl font-bold">Pedidos Recientes</h1>
              <div className="flex items-center space-x-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Inventario Faltante</button>
                <button className="bg-green-500 text-white px-4 py-2 rounded-md">Ordenes</button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-yellow-200 p-4 shadow-md rounded-md">
                  <h2 className="text-xl font-semibold">Pedido ID: {order.id}</h2>
                  <p>Cliente: {order.client.f_name} {order.client.l_name}</p>
                  <p>Fecha de entrega: {new Date(order.dateDelivery).toLocaleDateString()}</p>
                  <h3 className="text-lg font-medium mt-2">Productos:</h3>
                  <ul className="list-disc pl-5">
                    {order.preOrderProducts.map((product : any ) => (
                      <li key={product.id}>
                        {product.product.namE_PRODUCT} - {product.quantity} unidades - {product.size.size} - {product.colorPrimary.colorname}/{product.colorSecondary.colorname}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;