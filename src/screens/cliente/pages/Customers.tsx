// Inventory.tsx
import BreadcrumbData from "@/components/Breadcrumb"
import ApiTable from '@/components/Tabla/apiTable'
import Options from "../components/Options";
import SearchFilter from '../components/SearchFilter';
import { useEffect, useState } from 'react'

import { customersTable } from "@/components/Tabla/tData";
import { getClients } from "@/shared/Api/Customers/CustomersApi";
import { useNavigate} from 'react-router-dom';


const Customers = () => {
  const routes = [
    { title: 'Home', path: '/' },
    { title: 'Dashboard', path: '/' },
    { title: 'Customers', path: '/Customers' }
  ];

  const navigate = useNavigate();

  // const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterColumn, setFilterColumn] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  // const [detalleVisible, setDetalleVisible] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);

  useEffect(() => {
    if (selectedClientId !== null) {
      // Realizar alguna acción con selectedProductId
      console.log(`El producto seleccionado tiene el ID: ${selectedClientId}`);
    }
  }, [selectedClientId]);
  
  const handleTableRowClick = (record: any) => {
    // Al hacer clic en una fila, establece el ID del producto seleccionado y muestra el detalle
    setSelectedClientId(record.id);
    console.log(record.id);
    navigate(`/customers/ClientDetail/${record.id}`);
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
          columns={customersTable}
        />
        <Options />
      </div>
      <div className="mt-10">
        <ApiTable
          getApiData={getClients}
          columns={customersTable}
          searchTerm={searchTerm}
          filterColumn={filterColumn}
          sortDirection={sortDirection}
          handleTableRowClick={handleTableRowClick}
        />
        {/* {detalleVisible && selectedProductId && (
        <DetalleProducto productId={selectedProductId} />
      )} */}
      </div>
    </div>
  )
}

export default Customers