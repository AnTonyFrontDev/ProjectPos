import { getPreOrderById } from '@/shared/Api/PreOrder/PreOrderApi'
import { addSale } from '@/shared/Api/Sale/SaleApi';
import { DetalleProps as NewBillProps } from '@/shared/interfaces/I_inventario';
import { useEffect, useState } from 'react';
import { ISalePost } from '@/shared/interfaces/Sale/ISalePost';
import { Table } from 'antd';
// import { IPreOrder } from '@/shared/interfaces/Preorder/IPreOrder';

const { Column } = Table

const NewBill = ({ Id: preorderId }: NewBillProps) => {
    const [preOrderData, setPreOrderData] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState<ISalePost>({
        fkOrder: preorderId,
        codIsc: '',
        itbis: 0,
        b14: ''
      });

    useEffect(() => {
        const fetchPreOrderData = async () => {
            try {
                const data = await getPreOrderById(preorderId);
                setPreOrderData(data.data[0]);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchPreOrderData();
    }, [preorderId]);

    const handleAddSale = async () => {
        try {
          await addSale(formData);
          // Optionally, you can redirect or show a success message after adding the sale
        } catch (error) {
          console.error('Error adding sale:', error);
          // Handle error appropriately
        }
      };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }));
      };

    if (loading) {
        return <div className="text-center mt-4">Loading...</div>;
    }

    if (!preOrderData) {
        return <div className="text-center mt-4">Error loading pre-order data</div>;
    }

    // Render the table of the pre-order data
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl mb-4">Agregar Factura</h1>
            <div className="mb-4">
                <input
                    name="codIsc"
                    value={formData.codIsc}
                    onChange={handleChange}
                    placeholder="Código ISC"
                />
            </div>
            <div className="mb-4">
                <input
                    type="number"
                    name="itbis"
                    value={formData.itbis}
                    onChange={handleChange}
                    placeholder="ITBIS"
                />
            </div>
            <div className="mb-4">
                <input
                    name="b14"
                    value={formData.b14}
                    onChange={handleChange}
                    placeholder="B14"
                />
            </div>
            <Table dataSource={preOrderData.items} rowKey="id">
                <Column title="ID" dataIndex="id" key="id" />
                <Column title="Producto" dataIndex="productName" key="productName" />
                <Column title="Precio" dataIndex="price" key="price" />
                <Column title="Cantidad" dataIndex="quantity" key="quantity" />
            </Table>
            <button onClick={handleAddSale} className="bg-green-500 hover:bg-green-700 text-white font-bold mx-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Agregar Factura
            </button>
        </div>
    );
};

export default NewBill;