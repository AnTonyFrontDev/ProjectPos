// Banks.tsx
import { useState } from 'react';
import BreadcrumbData from "@/components/ui/Breadcrumb";
import ApiTable from '@/components/Generics/Tabla/apiTable';
import SearchFilter from '@/shared/SearchFilter';

import { typeProdTable } from "@/components/Generics/Tabla/tData";
import { GetTypesPaginated, RemoveTypeProd } from "@/shared/Api/TypeProduct";
import G_Options from "@/components/Generics/gOptions";
import GenericPagination from '@/components/PaginationComponents/GenericPagination';

const View = () => {
  const routes = [
    { title: 'Dashboard', path: '/' },
    { title: 'Atributos', path: '/atributos' },
    { title: 'Tipo Producto', path: '/atributos/TypeProd' }
  ];

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterColumn, setFilterColumn] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

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
        <GenericPagination getApiData={GetTypesPaginated}>
          {(apiData) => (

            <ApiTable
              getApiData={() => apiData.data.data}
              usarForm={'Types'}
              columns={typeProdTable}
              searchTerm={searchTerm}
              filterColumn={filterColumn}
              sortDirection={sortDirection}
              showActions={true}
              deleteProps={{ onRemove: RemoveTypeProd, navigatePath: `/TypeProd` }}
            />
          )}
        </GenericPagination>
      </div>
    </div>
  );
};

export default View;
