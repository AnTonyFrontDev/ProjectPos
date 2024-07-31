import { getPreOrderById } from '@/shared/Api/PreOrder/PreOrderApi'
import { addSale } from '@/shared/Api/Sale/SaleApi';
import { DetalleProps as NewBillProps } from '@/shared/interfaces/I_inventario';
import { useEffect, useState } from 'react';
import { ISalePost } from '@/shared/interfaces/Sale/ISalePost';
import { Table, Descriptions, Modal, notification } from 'antd';
import { FormInputsClasses } from '@/shared/Common/stylesConst/cssComponent';

const { Column } = Table;

const NewBill = ({ Id: preorderId }: NewBillProps) => {
    const [preOrderData, setPreOrderData] = useState<any | null>(null);
    const [clientData, setClientData] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [isCodIscEditable, setIsCodIscEditable] = useState(false);
    const [formData, setFormData] = useState<ISalePost>({
        fkOrder: preorderId,
        codIsc: null,
        itbis: 1,
        b14: null
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

    const handleAddSale = async () => {
        try {
            const processedFormData = {
                ...formData,
                codIsc: formData.codIsc?.trim() || null, // If empty string, set to null
                b14: formData.b14?.trim() || null         // If empty string, set to null
            };
            await addSale(processedFormData)
            .then (() => {
                notification.success({
                    message: 'Factura Agregada',
                    description: 'La factura se ha agregado exitosamente.',
                })
            });
        } catch (error) {
            console.error('Error adding sale:', error);
            notification.error({
                message: 'Error',
                description: 'Hubo un problema al agregar la factura.',
            });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value.trim() || null
        }));
    };

    const handleCodIscClick = () => {
        if (!isCodIscEditable) {
            Modal.confirm({
                title: 'Desea Comprobante Fiscal?',
                content: 'Haga clic en "Sí" para habilitar el campo y permitir la edición del comprobante fiscal.',
                onOk() {
                    setIsCodIscEditable(true);
                },
                onCancel() {
                    setIsCodIscEditable(false);
                },
            });
        }
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
                        <Descriptions.Item label="Nombre de cliente">
                            {clientData.f_name} {clientData.l_name} {clientData.f_surname} {clientData.l_surname}
                        </Descriptions.Item>
                        <Descriptions.Item label="RNC">{clientData.rnc}</Descriptions.Item>
                        <Descriptions.Item label="DNI">{clientData.dni}</Descriptions.Item>
                        <Descriptions.Item label="Phone Number">{clientData.phones[0]?.number}</Descriptions.Item>
                    </Descriptions>
                )}
            </div>
            <div className='gap-4 inline-flex w-full mb-4'>
                <div className="flex flex-col w-1/4" onClick={handleCodIscClick}>
                    <label>Comprobante Fiscal: </label>
                    <input
                        name="codIsc"
                        value={formData.codIsc || ""}
                        onChange={handleChange}
                        placeholder="Comprobante"
                        className={FormInputsClasses}
                        disabled={!isCodIscEditable}
                    />
                </div>
                <div className="flex flex-col w-1/4">
                    <label>b14: </label>
                    <input
                        name="b14"
                        value={formData.b14 || ""}
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
