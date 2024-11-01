// Customers.tsx
import BreadcrumbData from "@/components/ui/Breadcrumb"
import ApiTable from '@/components/Generics/Tabla/apiTable'
import SearchFilter from '@/shared/SearchFilter';
import { useEffect, useState } from 'react'

import { customersTable } from "@/components/Generics/Tabla/tData";
import { getClients } from "@/shared/Api/CustomersApi";
import { useNavigate} from 'react-router-dom';
import G_Options from "@/components/Generics/gOptions";

const AllExpenses = () =>{
    const routes = [
        { title: 'Home', path: '/' },
        { title: 'Dashboard', path: '/' },
        { title: 'Customers', path: '/Customers' }
      ];
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filterColumn, setFilterColumn] = useState<string>('');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [selectedClientId, setSelectedClientId] = useState<number | null>(null);

    const navigate = useNavigate();
    useEffect(() => {
        if (selectedClientId !== null) {
          // Realizar alguna acción con selectedProductId
          console.log(`El producto seleccionado tiene el ID: ${selectedClientId}`);
        }
      }, [selectedClientId]);
      
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
      const handleTableRowClick = (record: any) => {
        // Al hacer clic en una fila, establece el ID del producto seleccionado y muestra el detalle
        setSelectedClientId(record.id);
        console.log(record.id);
        navigate(`/customers/ClientDetail/${record.id}`);
        // setDetalleVisible(true);
      };
    return(
        <div>
        <BreadcrumbData routes={routes} />
        <div className="col-span-2 bg-gray-50 shadow-lg my-14 p-4 rounded-md flex justify-between">
          <SearchFilter
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            onSortToggle={handleSortToggle}
            columns={customersTable}
          />
          <G_Options buttonText="Agregar gasto" usarForm="Expenses" />
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
  
        </div>
      </div>
    )
}

export default AllExpenses 