// apiTable.tsx
import React, { useEffect, useState } from 'react';
import { Modal, Table } from 'antd';
import PropTypes from 'prop-types';
import ButtonModal from '../Modal/ButtonModal';
import ViewForm from '@/components/FormularioV4/viewForm';
import { ExpensesUpdateDto } from "@/shared/interfaces/Expenses/IExpensesUpdate.ts";

interface GenericTableProps {
  getApiData?: () => Promise<any[]>;
  putApiData?: (data: any) => Promise<any[]>;
  delApiData?: (data: any) => Promise<any[]>;
  columns: any[];
  searchTerm: string;
  filterColumn?: string;
  sortDirection?: 'asc' | 'desc';
  handleTableRowClick?: any;
  showActions?: boolean;
  usarForm?: any;
  dataSource?: any[];
  notEditable?: boolean;
  //boton personalizable para poner en la tabla
  //useCustomButton: boolean;
  customButton?: [text: string, onClick: (id: ExpensesUpdateDto) => Promise<void>];
}

const GenericTable: React.FC<GenericTableProps> = ({
  getApiData,
  delApiData,
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
  }, [getApiData, delApiData , searchTerm, filterColumn, sortDirection, dataSource]);

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

      console.log(filteredData)

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

  const updateDataSource = async () => {
    // console.log("entro")
    await fetchData();
  };

  const handleDelete = async (record: any) => {
    Modal.confirm({
      title: 'Confirmar',
      content: 'Está seguro de que desea eliminar este registro?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        console.log('Delete:', record);
        if (delApiData) {
          try {
            await delApiData(record);
            const updatedData = data.filter(item => item.id !== record.id);
            setData(updatedData);
            // updateDataSource();
            await fetchData();
          } catch (error) {
            console.error('Error al eliminar el registro', error);
          }
        }
      },
    });
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
                modalContent={<ViewForm usarForm={usarForm} formData={record} isUpdate={true} updateData={updateDataSource} />}
              />
            )}
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

GenericTable.propTypes = {
  getApiData: PropTypes.func.isRequired,
  columns: PropTypes.array.isRequired,
  searchTerm: PropTypes.string.isRequired,
  filterColumn: PropTypes.string.isRequired,
  sortDirection: PropTypes.oneOf(['asc', 'desc'] as const).isRequired,
  showActions: PropTypes.bool,
};

export default GenericTable;
