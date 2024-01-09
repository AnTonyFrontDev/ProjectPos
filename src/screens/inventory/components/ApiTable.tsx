import { useEffect, useState } from 'react';
import { Table, Tag } from 'antd';
import { getInventory } from '../hooks/InventoryApi';

interface Product {
    id: number;
    product_name: string;
    price: number;
    quantity: number;
    last_replenishment: string;
    // ... (otros campos si los hay)
}

const ApiTable = ({ searchTerm }: { searchTerm: string }) => {
    
    const [tableData, setTableData] = useState<Product[]>([]);
    const [filteredData, setFilteredData] = useState<Product[]>([]);
    const [tableColumns, setTableColumns] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            console.log('Fetching data...')
            try {
                const response = await getInventory();

                if (response && response.success) {
                    const data: Product[] = response.data;

                    if (!data || data.length === 0) {
                        console.error('No data received.');
                        return;
                    }

                    // Customize column names
                    const columns = [
                        {
                            title: 'ID',
                            dataIndex: 'id',
                            key: 'id',
                        },
                        {
                            title: 'Product Name',
                            dataIndex: 'product_name',
                            key: 'product_name',
                        },
                        {
                            title: 'Price',
                            dataIndex: 'price',
                            key: 'price',
                        },
                        {
                            title: 'Quantity',
                            dataIndex: 'quantity',
                            key: 'quantity',
                        },
                        {
                            title: 'Last Replenishment',
                            dataIndex: 'last_replenishment',
                            key: 'last_replenishment',
                            render: (text: string) => {
                                if (text.trim() === '') {
                                    return <Tag color="green">New</Tag>;
                                }
                                return text;
                            },
                        },
                    ];
                    setTableData(data);
                    // Filtrar los datos basados en el término de búsqueda
                    const filtered = data.filter(item =>
                        Object.values(item).some(val =>
                            val.toString().toLowerCase().includes(searchTerm.toLowerCase())
                        )
                    );

                    setFilteredData(filtered);
                    setTableColumns(columns);
                } else {
                    console.error('API request failed:', response?.message || 'No error message available.');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [searchTerm]);

    return (
    <Table dataSource={filteredData} columns={tableColumns} />
    );
};

export default ApiTable;
