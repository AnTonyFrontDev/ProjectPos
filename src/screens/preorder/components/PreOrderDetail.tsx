import React, { useEffect, useState } from 'react';
import { Descriptions, Table } from 'antd';
import { DetalleProps as DetallePreOrdersProps } from '@/shared/interfaces/I_inventario';
import { getPreOrderById } from '@/shared/Api/PreOrder/PreOrderApi';
// import OrderForm from './CheckOrder';
import SearchFilter from '@/shared/SearchFilter';
// import PreOrderReport from '../../report/reportPreOrder/components/Report';
import { Link } from 'react-router-dom';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Print from './PreOrderPrint';


const PreOrderDetail: React.FC<DetallePreOrdersProps> = ({ Id: preorderId }) => {
    const [detallePreOrder, setDetallePreOrder] = useState<any>(null);
    const [filteredItems, setFilteredItems] = useState<any[]>(['']);
    const [filterColumn, setFilterColumn] = useState<string>('');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const preOrderData = await getPreOrderById(preorderId);
                setDetallePreOrder(preOrderData.data[0]); // Obtén los datos de la preorden
                setFilteredItems(preOrderData.data[0]?.items.preOrderProducts || []); // Establecer todos los productos como predeterminado
            } catch (error) {
                console.error('Error al obtener detalle de la preorden:', error);
            }
        };

        fetchData();
    }, [preorderId]);

    const handleSearch = (searchText: string) => {
        if (!detallePreOrder) return;
        const filtered = detallePreOrder.items.preOrderProducts.filter((item: any) =>
            Object.values(item)
                .join('') // Concatenar todos los valores del objeto en una cadena
                .toLowerCase()
                .includes(searchText.toLowerCase())
        );
        setFilteredItems(filtered);
    };

    const handleFilterChange = (value: string) => {
        setFilterColumn(value);
        if (detallePreOrder) {
            const filtered = detallePreOrder.items.filter((item: any) =>
                String(item[filterColumn]).toLowerCase().includes(value.toLowerCase())
            );
            setFilteredItems(filtered);
            handleSearch('')
        }
    };

    const handleSortToggle = () => {
        // Copiar los elementos filtrados para no modificar el estado original directamente
        const sortedItems = [...filteredItems].sort((a, b) => {
            if (sortDirection === 'asc') {
                return a[filterColumn] - b[filterColumn];
            } else {
                return b[filterColumn] - a[filterColumn];
            }
        });
        setFilteredItems(sortedItems);
        setSortDirection((prevSortDirection) => (prevSortDirection === 'asc' ? 'desc' : 'asc'));
    };

    if (!detallePreOrder) {
        return <div>Cargando...</div>;
    }

    const { client } = detallePreOrder;
    console.log('detallePreOrder ', detallePreOrder)
    // console.log('filteredItems ', filteredItems)

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Nombre', dataIndex: 'productName', key: 'productName' },
        { title: 'Color Primario', dataIndex: 'colorPrimary', key: 'colorPrimary' },
        { title: 'Tamaño', dataIndex: 'size', key: 'size' },
        { title: 'Precio', dataIndex: 'price', key: 'price' },
        { title: 'Cantidad', dataIndex: 'quantity', key: 'quantity' },
        {
            title: 'Actions',
            key: 'actions',
            render: () => (
                <span>
                    {/* <ButtonModal
                    buttonText="Editar"
                    modalTitle=""
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded'
                    size={15}
                    modalContent={<ViewForm usarForm={usarForm} formData={record} isUpdate={true} updateData={updateDataSource} />}
                  /> */}
                    <button
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded'
                    >
                        Editar
                    </button>
                    <button
                        className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                    >
                        Delete
                    </button>
                </span>
            ),
        },
    ];


    return (
        <div>
            <Descriptions title="Información del Cliente">
                <Descriptions.Item label="Nombre">{`${client[0].f_name} ${client[0].l_name}`}</Descriptions.Item>
                <Descriptions.Item label="Apellido">{`${client[0].f_surname} ${client[0].l_surname}`}</Descriptions.Item>
                <Descriptions.Item label="RNC">{client[0].rnc}</Descriptions.Item>
                <Descriptions.Item label="DNI">{client[0].dni}</Descriptions.Item>
                <Descriptions.Item label="Teléfono">
                    {client[0].phones.map((phone: any) => (
                        <div key={phone.id}>{phone.number}</div>
                    ))}
                </Descriptions.Item>
            </Descriptions>
            <div className='flex'>
                <div className="mb-4">
                    <Link to={`/preOrder/NuevaOrden/${preorderId}`}>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Realizar Orden
                        </button>
                    </Link>
                </div>
                <div className="mb-4 ml-4 ">
                    <Link to={`/billing/NewDetail/${preorderId}`}>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Generar Factura
                        </button>
                    </Link>
                </div>
                <div className="mb-4 ml-4 ">
                    {/* <Link to={`/billing/NewDetail/${preorderId}`}> */}
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        Eliminar
                    </button>
                    {/* </Link> */}
                </div>
            </div>

            {/* <PreOrderReport id={preorderId} /> */}

            {/* <h3>Productos</h3> */}
            <div className="col-span-2 bg-gray-50 shadow-lg my-6 p-4 rounded-md flex justify-between">
                <SearchFilter
                    onSearch={handleSearch}
                    onFilterChange={handleFilterChange}
                    onSortToggle={handleSortToggle}
                    columns={columns.map((column) => ({ dataIndex: column.dataIndex as string, title: column.title }))}
                />
            </div>
            <Table
                columns={columns}
                dataSource={filteredItems}
            />

            <div className="text-right">
                <PDFDownloadLink
                    document={<Print Data={detallePreOrder} />}
                    fileName={`Pedido_${preorderId}.pdf`}
                    style={{
                        textDecoration: 'none',
                        padding: '10px',
                        color: '#fff',
                        backgroundColor: '#007bff',
                        borderRadius: '5px',
                    }}
                >
                    {({ loading }) => (loading ? 'Generando PDF...' : 'Guardar PDF')}
                </PDFDownloadLink>
            </div> 

        </div >
    );
};

export default PreOrderDetail;
