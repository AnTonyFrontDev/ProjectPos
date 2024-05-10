import React, { useEffect, useState } from 'react';
import { Descriptions, Table } from 'antd';
import { DetalleProps as DetallePreOrdersProps } from '@/shared/interfaces/I_inventario';
import { getPreOrderById } from '@/shared/Api/PreOrder/PreOrderApi';
import OrderForm from './CheckOrder';
import SearchFilter from '@/shared/SearchFilter';
import PreOrderReport from '../../report/reportPreOrder/components/Report';



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
                setFilteredItems(preOrderData.data[0]?.items || []); // Establecer todos los productos como predeterminado
            } catch (error) {
                console.error('Error al obtener detalle de la preorden:', error);
            }
        };

        fetchData();
    }, [preorderId]);

    const handleSearch = (searchText: string) => {
        if (!detallePreOrder) return;
        const filtered = detallePreOrder.items.filter((item: any) =>
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
    console.log(detallePreOrder)

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Nombre', dataIndex: 'productName', key: 'productName' },
        { title: 'Tamaño', dataIndex: 'size', key: 'size' },
        { title: 'Color Primario', dataIndex: 'colorPrimary', key: 'colorPrimary' },
        { title: 'Precio', dataIndex: 'price', key: 'price' },
        { title: 'Cantidad', dataIndex: 'quantity', key: 'quantity' },
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
            <OrderForm id={preorderId} />

            <PreOrderReport id={preorderId}/>

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

        </div >
    );
};

export default PreOrderDetail;
