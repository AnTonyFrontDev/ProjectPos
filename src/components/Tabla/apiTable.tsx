// apiTable.tsx
import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';

interface GenericTableProps {
  getApiData: () => Promise<any[]>;
  columns: any[];
  searchTerm: string;
  filterColumn?: string;
  sortDirection?: 'asc' | 'desc';
  handleTableRowClick?: any;
  showActions?: boolean;
}

const GenericTable: React.FC<GenericTableProps> = ({ getApiData, columns, searchTerm, filterColumn, sortDirection, handleTableRowClick, showActions }) => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiData = await getApiData();
        // Apply search filter
        let filteredData = apiData.filter(item =>
          Object.values(item).some(value =>
            typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );

        
        if (filterColumn) {
          filteredData = filteredData.filter(item => item[filterColumn] !== undefined && item[filterColumn] !== null);
        }

        
        if (filterColumn) {
          filteredData = filteredData.sort((a, b) => {
            const aValue = a[filterColumn];
            const bValue = b[filterColumn];

            if (typeof aValue === 'string' && typeof bValue === 'string') {
              
              return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
            } else {
              
              return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
            }
          });
        }

        setData(filteredData);
      } catch (error) {
        console.error('Error al obtener datos de la API', error);
      }
    };

    fetchData();
  }, [getApiData, searchTerm, filterColumn, sortDirection]);

// ... (código anterior)

const handleEdit = (record: any) => {
  console.log('Edit:', record);
};

const handleDelete = (record: any) => {
  console.log('Delete:', record);
};

const actionsColumn = showActions
    ? [
        {
          title: 'Actions',
          key: 'actions',
          render: ( record: any) => (
            <span>
              <button 
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded'
                onClick={() => handleEdit(record)}
              >
                Edit
              </button>
              <button 
                className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                onClick={() => handleDelete(record)}
              >
                Delete
              </button>
            </span>
          ),
        },
      ]
    : [];

// ... (código posterior)


  return (
    <Table
      dataSource={data}
      columns={[...columns, ...actionsColumn].map(column => ({
        ...column,
        onCell: (record: any) => ({
          onClick: () => handleTableRowClick(record),
        }),
      }))}
      
      
    />
  );
};

GenericTable.propTypes = {
  getApiData: PropTypes.func.isRequired,
  columns: PropTypes.array.isRequired,
  searchTerm: PropTypes.string.isRequired,
  filterColumn: PropTypes.string.isRequired,
  sortDirection: PropTypes.oneOf(['asc', 'desc'] as const).isRequired,
  showActions: PropTypes.bool,
};

export default GenericTable;
