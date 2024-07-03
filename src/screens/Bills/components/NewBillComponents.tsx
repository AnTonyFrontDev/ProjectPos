import { getPreOrderById } from '@/shared/Api/PreOrder/PreOrderApi'
import { addSale } from '@/shared/Api/Sale/SaleApi';
import { DetalleProps as NewBillProps } from '@/shared/interfaces/I_inventario';
import { useEffect, useState } from 'react';
import { ISalePost } from '@/shared/interfaces/Sale/ISalePost';
import { Table, Descriptions } from 'antd';
import { FormInputsClasses } from '@/shared/Common/stylesConst/cssComponent';

const { Column } = Table

const NewBill = ({ Id: preorderId }: NewBillProps) => {
    const [preOrderData, setPreOrderData] = useState<any | null>(null);
    const [clientData, setClientData] = useState<any | null>(null);
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
                setPreOrderData(data.data[0].items);
                setClientData(data.data[0].client[0]);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchPreOrderData();
    }, [preorderId]);

    console.log('preOrderData',preOrderData)
    console.log('clientData', clientData)

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

    const handleChangeDirect = ({ name, value }: { name: string; value: string | number }) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: name === 'itbis' ? Number(value) : value
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
        <div className="container mx-auto">
            <h1 className="text-2xl mb-4">Agregar Factura</h1>
            <div className='my-2'>

            {clientData && (
                <Descriptions title="Informacion de Cliente" >
                    <Descriptions.Item label="Nombre de cliente">{clientData.f_name}{clientData.l_name} {clientData.f_surname} {clientData.l_surname}</Descriptions.Item>
                    <Descriptions.Item label="RNC">{clientData.rnc}</Descriptions.Item>
                    <Descriptions.Item label="DNI">{clientData.dni}</Descriptions.Item>
                    <Descriptions.Item label="Phone Number">{clientData.phones[0]?.number}</Descriptions.Item>
                </Descriptions>
            )}
            </div>
            <div className='gap-4 inline-flex w-full mb-4'>

                <div className="flex flex-col w-1/4">
                    <label>Comprobante Fiscal: </label>
                    <input
                        name="codIsc"
                        value={formData.codIsc}
                        onChange={handleChange}
                        placeholder="Comprobante"
                        className={FormInputsClasses}
                    />
                </div>
                <div className="flex flex-col w-1/8">
                    <label>Itbis: </label>
                    <select
                        name="itbis"
                        value={formData.itbis.toString()}
                        onChange={(e) => {
                            const value = e.target.value === "1" ? 1 : 0;
                            handleChangeDirect({ name: 'itbis', value }); // Use the refactored function here
                        }}
                        className={FormInputsClasses}
                    >
                        <option value="0">No</option>
                        <option value="1">Sí</option>
                    </select>
                </div>
                <div className="flex flex-col w-1/4">
                    <label>b14: </label>
                    <input
                        name="b14"
                        value={formData.b14}
                        onChange={handleChange}
                        placeholder="B14"
                        className={FormInputsClasses}
                    />
                </div>
            </div>
            <Table dataSource={preOrderData.preOrderProducts} rowKey="id">
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