// apiTable.tsx
import React, { useEffect, useState } from 'react';
import {Table } from 'antd';
import ButtonModal from '../Modal/ButtonModal';
import ViewForm from '@/components/FormularioV4/viewForm';
import { ExpensesUpdateDto } from "@/shared/interfaces/IExpenses";
import DeleteButton from '@/components/Generics/Modal/DeleteModal';
interface GenericTableProps {
  getApiData?: () => Promise<any[]>;
  delApiData?: (data: any) => Promise<any[]>;
  columns: any[];
  searchTerm?: string;
  filterColumn?: string;
  sortDirection?: 'asc' | 'desc';
  handleTableRowClick?: any;
  showActions?: boolean;
  usarForm?: any;
  dataSource?: any[];
  notEditable?: boolean;
  customButton?: [text: string, onClick: (id: ExpensesUpdateDto) => Promise<void>];
  deleteProps?: {
    onRemove: (data: any) => Promise<any> | undefined;
    navigatePath?: string;
  };
}

const GenericTable: React.FC<GenericTableProps> = ({
  getApiData,
  delApiData,
  deleteProps,
  columns,
  usarForm,
  searchTerm,
  filterColumn,
  sortDirection,
  handleTableRowClick,
  dataSource,
  notEditable,
  //useCustomButton,
  customButton,
  showActions, }) => {
  const [data, setData] = useState<any[]>(dataSource || []);

  useEffect(() => {
    if (!dataSource) {
      fetchData();
    }
  }, [getApiData, delApiData, searchTerm, filterColumn, sortDirection, dataSource]);

  const fetchData = async () => {
    try {
      const apiData = await getApiData!();

      let filteredData = apiData

      if (searchTerm) {
        filteredData = apiData.filter(item =>
          Object.values(item).some(value =>
            typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
      };

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


  const actionsColumn = showActions
    ? [
      {
        title: 'Actions',
        key: 'actions',
        render: (record: any) => (
          <span>
            {!notEditable && (
              <ButtonModal
                buttonText="Editar"
                modalTitle=""
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded'
                size={15}
                modalContent={<ViewForm usarForm={usarForm} formData={record} isUpdate={true} />}
              />
            )}
            {deleteProps && (
              <DeleteButton
              onRemove={deleteProps.onRemove }
              formData={record}
              confirmationMessage="¿Estás seguro de que deseas remover este Registro?"
              navigatePath={deleteProps.navigatePath || '/'}
              />
            )}
          </span>
        ),
      },
    ]
    //logica para agregar un boton personalizado
    : (customButton != null ? [
      {
        title: 'Actions',
        key: 'actions',
        render: (record: any) => (
          <span>

            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              onClick={() => customButton[1](record)}
            >
              {customButton[0]}
            </button>
          </span>
        ),
      },
    ] : []);

  return (
    <Table
      dataSource={data}
      pagination={false}
      columns={[...columns, ...actionsColumn].map(column => ({
        ...column,
        onCell: (record: any) => ({
          onClick: handleTableRowClick ? () => handleTableRowClick(record) : undefined,
        }),
      }))}
    />
  );
};
export default GenericTable;
