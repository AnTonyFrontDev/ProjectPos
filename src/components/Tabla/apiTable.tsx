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
}

const GenericTable: React.FC<GenericTableProps> = ({ getApiData, columns, searchTerm, filterColumn, sortDirection, handleTableRowClick }) => {
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

  return (
    <Table
      dataSource={data}
      columns={columns.map(column => ({
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
};

export default GenericTable;
