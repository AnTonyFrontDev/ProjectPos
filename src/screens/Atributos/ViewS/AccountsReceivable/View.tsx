// Banks.tsx
import BreadcrumbData from "@/components/ui/Breadcrumb";
import ApiTable from '@/components/Generics/Tabla/apiTable';
import SearchFilter from '@/shared/SearchFilter';
import { useEffect, useState } from 'react';

import { ReceivableTable } from "@/components/Generics/Tabla/tData";
import { GetAccountsReceivable } from "@/shared/Api/PreOrderApi";
import { useNavigate } from "react-router-dom";

const View = () => {
  const routes = [
    { title: 'Dashboard', path: '/' },
    { title: 'Atributos', path: '/atributos' },
    { title: 'CuentasPorCobrar', path: '/atributos/CuentasPorCobrar' }
  ];

  const navigate = useNavigate();


  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterColumn, setFilterColumn] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
 
  useEffect(() => {
    // Puedes realizar alguna acción específica cuando cambia la lista de bancos
  }, [searchTerm, filterColumn, sortDirection]);

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
    console.log(record);
    // Al hacer clic en una fila, establece el ID del producto seleccionado y muestra el detalle
    navigate(`/atributos/CuentasPorCobrar/${record.id}`);
  };

  return (
    <div>
      <BreadcrumbData routes={routes} />
      <div className="col-span-2 bg-gray-50 shadow-lg my-14 p-4 rounded-md flex justify-between">
        <SearchFilter
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          onSortToggle={handleSortToggle}
          columns={ReceivableTable}
        />
        {/*<G_Options buttonText="Nuevo Gasto" usarForm="Expenses" />*/}
      </div>
      <div className="mt-10">
        <ApiTable
          getApiData={GetAccountsReceivable}
          columns={ReceivableTable}
          searchTerm={searchTerm}
          filterColumn={filterColumn}
          sortDirection={sortDirection}
          handleTableRowClick={handleTableRowClick}
        />
      </div>
    </div>
  );
};

export default View;
