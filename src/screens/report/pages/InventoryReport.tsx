// Import necessary libraries and components
import { useEffect, useState } from 'react';
import { Table } from 'antd';
import { getInventoryDiffReport } from '@/shared/Api/Report/ReportsApi';

const InventoryReport = () => {
  // State to store the data fetched from the API
  const [data, setData] = useState([]);

  // Fetch the data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getInventoryDiffReport();
        // Transform the data to fit the table structure
        const transformedData = result.map((item : any) => ({
          key: item.id,
          quantity: item.quantity,
          size: item.size.size,
          name_product: item.product.namE_PRODUCT,
          color_primary: item.colorPrimary.colorname,
        }));
        setData(transformedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Define the columns for the table
  const columns = [
    {
      title: 'Cantidad Faltante',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Tamaño',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: 'Nombre del Producto',
      dataIndex: 'name_product',
      key: 'name_product',
    },
    {
      title: 'Color Primario',
      dataIndex: 'color_primary',
      key: 'color_primary',
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default InventoryReport;
