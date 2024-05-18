import { useEffect, useState } from 'react';
import { Table } from 'antd';
import { getSaleById } from '@/shared/Api/Sale/SaleApi';
import { ISaleData } from '@/shared/interfaces/Sale/ISaleDetail';
import { DetalleProps as BillDetailProps } from '@/shared/interfaces/I_inventario';
const { Column } = Table;

const BillDetail = ({ Id: saleId }: BillDetailProps) => {
  const [saleData, setSaleData] = useState<ISaleData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSaleData = async () => {
      try {
        const data = await getSaleById(saleId);
        setSaleData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSaleData();
  }, [saleId]);

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (!saleData) {
    return <div className="text-center mt-4">Error loading sale data</div>;
  }

  const { preOrder, amount, itbis, fecha } = saleData;
  const { client, preOrderProducts } = preOrder;
  const total = amount + itbis;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Factura</h1>
      <div className="grid grid-cols-2 gap-2">
        {/* Columna de Información del Cliente */}
        <div className="bg-white shadow-md rounded-lg p-6 mr-3 mb-6">
          <h2 className="text-xl font-bold mb-4">Información del Cliente</h2>
          <p><strong>Nombre:</strong> {client.f_name} {client.f_surname} {client.l_surname}</p>
          <p><strong>RNC:</strong> {client.rnc}</p>
          <p><strong>DNI:</strong> {client.dni}</p>
        </div>

        {/* Columna de Información de la Factura */}
        <div className="bg-white shadow-md rounded-lg p-6 ml-3 mb-6">
          <h2 className="text-xl font-bold mb-4">Información de la Factura</h2>
          <p><strong>Fecha:</strong> {new Date(fecha).toLocaleString()}</p>
          <p><strong>Monto:</strong> ${amount}</p>
          <p><strong>ITBIS:</strong> ${itbis}</p>
          <p><strong>Total a Pagar:</strong> ${total}</p>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Productos</h2>
        <Table dataSource={preOrderProducts} rowKey="id" pagination={false}>
          <Column title="Id" dataIndex={['product', 'id']} key="id" />
          <Column title="Producto" dataIndex={['product', 'namE_PRODUCT']} key="product" />
          <Column title="Color" dataIndex={['colorPrimary', 'colorname']} key="colorPrimary" />
          <Column title="Cantidad" dataIndex="quantity" key="quantity" />
          <Column title="Tamaño" dataIndex={['size', 'size']} key="size" />
          <Column title="Descripción" dataIndex={['product', 'descriptioN_PRODUCT']} key="description" />
          <Column title="Precio" dataIndex={['product', 'salE_PRICE']} key="precio" 
          render={(text) => (
              <span>$ {text}</span>
            )} />
          <Column
            title="Precio Total"
            dataIndex={['quantity', 'salE_PRICE']}
            key="totalPrice"
            render={(text, record: any) => (
              <span>$ {record.quantity * record.product.salE_PRICE} {text}</span>
            )}
          />
        </Table>
      </div>
    </div>
  );
};

export default BillDetail;
