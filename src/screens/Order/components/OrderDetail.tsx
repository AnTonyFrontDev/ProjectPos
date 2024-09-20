import React, { useEffect, useState } from 'react';
import { cancelOrder, completeOrder, getOrderById } from '@/shared/Api/Order/OrderApi';
import { Descriptions, Modal, Table } from 'antd';
import SearchFilter from '@/shared/SearchFilter';
import Print from './OrderPrint';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { IBaseModel } from '@/shared/interfaces/IBaseModel';
// const { Panel } = Collapse;

const OrderDetail: React.FC<IBaseModel> = ({ id: orderId }) => {
  const [orderDetail, setOrderDetail] = useState<any>(null);
  const [filteredItems, setFilteredItems] = useState<any[]>(['']);
  const [filterColumn, setFilterColumn] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const fetchData = async () => {
      if (!orderId) return;
      try {
        const orderData = await getOrderById(orderId);
        setOrderDetail(orderData.data[0]); // Obtén los detalles de la orden
        setFilteredItems(orderData.data[0]?.detail[0]?.products || []);
      } catch (error) {
        console.error('Error al obtener detalle de la orden:', error);
      }
    };
    
    fetchData();
  }, [orderId]);
  
  console.log('orderDetail', orderDetail)
  // console.log(filteredItems)

  const handleSearch = (searchText: string) => {
    if (!orderDetail) return;
    const filtered = orderDetail.items.filter((item: any) =>
      Object.values(item)
        .join('') // Concatenar todos los valores del objeto en una cadena
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const handleFilterChange = (value: string) => {
    setFilterColumn(value);
    if (orderDetail) {
      const filtered = orderDetail.items.filter((item: any) =>
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

  const handleDelete = async (record: any,) => {
    Modal.confirm({
      title: 'Confirmar',
      content: 'Está seguro de que desea eliminar este registro?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        // console.log('Delete:', record);
        try {
          await cancelOrder(record);
          window.location.href = '/Order';
        } catch (error) {
          console.error('Error al eliminar el registro', error);
        }
      },
    });
  };
  const hanldeComplete = async (record: any,) => {
    Modal.confirm({
      title: 'Confirmar',
      content: 'Está seguro de que desea relizar esta acción??',
      okText: 'Si',
      okType: 'link',
      cancelText: 'No',
      onOk: async () => {
        // console.log('Delete:', record);
        try {
          await completeOrder(record);
          window.location.href = '/Order/OrderDetail/' + orderId;
        } catch (error) {
          console.error('Error al completar la orden', error);
        }
      },
    });
  };



  if (!orderDetail) {
    return <div>Cargando...</div>;
  }

  const { detail, descriptionJob, statusOrder } = orderDetail;

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Nombre', dataIndex: 'productName', key: 'productName' },
    { title: 'Tamaño', dataIndex: 'size', key: 'size' },
    {
      title: 'Color Primario',
      dataIndex: 'colorPrimary',
      key: 'colorPrimary',
      render: (colorPrimary: any) => (
        <span style={{ color: `#${colorPrimary.codE_COLOR}` }}>
          {colorPrimary.colorname}
        </span>
      )
    },
    { title: 'Precio', dataIndex: 'price', key: 'price' },
    { title: 'Cantidad', dataIndex: 'quantity', key: 'quantity' },
  ];

  return (
    <div>
      {/* Información del Cliente */}
      <Descriptions title="Información del Cliente">
        <Descriptions.Item label="Nombre">{detail[0].fullName}</Descriptions.Item>
        <Descriptions.Item label="Cantidad de Productos">{detail[0].quantity}</Descriptions.Item>
        <Descriptions.Item label="Monto Total">{detail[0].amount}</Descriptions.Item>
      </Descriptions>

      <Descriptions title="Información de la Orden">
        <Descriptions.Item label="Descripcion de la orden">{descriptionJob}</Descriptions.Item>
        <Descriptions.Item label="Estado de la orden">{statusOrder}</Descriptions.Item>
        <Descriptions.Item label="Observacion">{detail[0].observation}</Descriptions.Item>
      </Descriptions>
      <div className='flex'>
        <div className="mb-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => hanldeComplete({ id: orderId })}>
            {statusOrder == "pendiente" ? "Completar" : "Desmarcar"}
          </button>
        </div>
        <div className="mb-4 ml-4 ">
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleDelete({ id: orderId })}
          >
            Eliminar
          </button>
        </div>
      </div>

      {/* Productos */}
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
          document={<Print Data={orderDetail} />}
          fileName={`Orden_${orderId}.pdf`}
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

    </div>
  );
}

export default OrderDetail;
