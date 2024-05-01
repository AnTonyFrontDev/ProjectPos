// Banks.tsx
import BreadcrumbData from "@/components/ui/Breadcrumb";
import ApiTable from '@/components/Generics/Tabla/apiTable';
import G_Options from "@/components/Generics/gOptions";
import SearchFilter from '@/shared/SearchFilter';
import { useEffect, useState } from 'react';

import { typeProdTable } from "@/components/Generics/Tabla/tData";
import { getTypes } from "@/shared/Api/Products/TypeProd/TypeProduct";

const View = () => {
  const routes = [
    { title: 'Dashboard', path: '/' },
    { title: 'Atributos', path: '/atributos' },
    { title: 'Tipo Producto', path: '/atributos/TypeProd' }
  ];


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
  
  return (
    <div>
      <BreadcrumbData routes={routes} />
      <div className="col-span-2 bg-gray-50 shadow-lg my-14 p-4 rounded-md flex justify-between">
        <SearchFilter
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          onSortToggle={handleSortToggle}
          columns={typeProdTable}
        />
        <G_Options buttonText="Nuevo Tipo Producto" usarForm="Types" />
      </div>
      <div className="mt-10">
        <ApiTable
          getApiData={getTypes}
          columns={typeProdTable}
          searchTerm={searchTerm}
          filterColumn={filterColumn}
          sortDirection={sortDirection}
          showActions={true} 
        />
      </div>
    </div>
  );
};

export default View;
