import { useState, useEffect, ChangeEvent } from 'react';
import { getPreOrders } from '@/shared/Api/PreOrder/PreOrderApi';
import Invoice from '../components/Invoice';
import { IPreOrderGet } from '@/shared/interfaces/Preorder/IPreOrderGet';

const Billing = () => {
  const [preOrders, setPreOrders] = useState<IPreOrderGet[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<IPreOrderGet | null>(null);
//   const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orders = await getPreOrders();
        if (orders && orders.length > 0) {
          setPreOrders(orders);
          setSelectedOrder(orders[0]); // Seleccionar automáticamente el primer pedido
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

//   const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
//     const term = e.target.value;
//     setSearchTerm(term);
//   };

  const handleSelectOrder = (e: ChangeEvent<HTMLSelectElement>) => {
    const orderId = parseInt(e.target.value);
    const selected = preOrders.find((order) => order.id === orderId);
    setSelectedOrder(selected || null);
    // setSearchTerm(''); // Limpiar el término de búsqueda después de seleccionar un pedido
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Factura</h1>

      {/* Búsqueda y selección de pedido */}
      <div className="mb-4">
        {/* <input
          type="text"
          className="w-full px-4 py-2 border rounded"
          placeholder="Search by ID or Delivery Date"
          value={searchTerm}
          onChange={handleSearch}
        /> */}
        <select
          className="w-full mt-2 px-4 py-2 border rounded"
          value={selectedOrder ? selectedOrder.id.toString() : ''}
          onChange={handleSelectOrder}
        >
          {preOrders.map((order) => (
            <option key={order.id} value={order.id}>
              Pedido #{order.id} - Fecha: {order.dateCreated}
            </option>
          ))}
        </select>
      </div>

      {/* Mostrar la factura */}
      {selectedOrder && <Invoice order={selectedOrder} />}
    </div>
  );
};

export default Billing;
