// PreOrder.tsx
import BreadcrumbData from "@/components/Breadcrumb";
import ApiTable from '@/components/Tabla/apiTable';
import Options from "../components/Options";
import SearchFilter from '../components/SearchFilter';
import { useEffect, useState } from 'react';
import { preOrderTable } from "@/components/Tabla/tData";
import { getPreOrders } from "@/shared/Api/PreOrder/PreOrderApi";
import { useNavigate } from 'react-router-dom';

const PreOrder = () => {
  const routes = [
    { title: 'Home', path: '/' },
    { title: 'Dashboard', path: '/' },
    { title: 'PreOrders', path: '/PreOrders' }
  ];

  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterColumn, setFilterColumn] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedPreOrderId, setSelectedPreOrderId] = useState<number | null>(null);

  useEffect(() => {
    if (selectedPreOrderId !== null) {
      // Realizar alguna acción con selectedPreOrderId
      console.log(`El pedido seleccionado tiene el ID: ${selectedPreOrderId}`);
    }
  }, [selectedPreOrderId]);

  const handleTableRowClick = (record: any) => {
    // Al hacer clic en una fila, establece el ID del pedido seleccionado y muestra el detalle
    setSelectedPreOrderId(record.id);
    console.log(record.id);
    navigate(`/preorders/PreOrderDetail/${record.id}`);
    // setDetalleVisible(true);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleFilterChange = (value: string) => {
    setFilterColumn(value);
  };

  // Function to toggle sorting direction
  const handleSortToggle = () => {
    setSortDirection((prevSortDirection) => (prevSortDirection === 'asc' ? 'desc' : 'asc') as 'asc' | 'desc');
  };

  return (
    <div>
      <BreadcrumbData routes={routes} />
      <div className="col-span-2 bg-gray-50 shadow-lg my-14 p-4 rounded-md flex justify-between">
        <SearchFilter
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          onSortToggle={handleSortToggle}
          columns={preOrderTable}
        />
        <Options />
      </div>
      <div className="mt-10">
        <ApiTable
          getApiData={getPreOrders}
          columns={preOrderTable}
          searchTerm={searchTerm}
          filterColumn={filterColumn}
          sortDirection={sortDirection}
          handleTableRowClick={handleTableRowClick}
        />
      </div>
    </div>
  );
};

export default PreOrder;
