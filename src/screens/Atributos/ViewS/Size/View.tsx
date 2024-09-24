// SizeView.tsx
import { useState } from 'react';
import BreadcrumbData from "@/components/ui/Breadcrumb";
import ApiTable from '@/components/Generics/Tabla/apiTable';
import SearchFilter from '@/shared/SearchFilter';
import { GetSizesPaginated, RemoveSize } from "@/shared/Api/SizeApi";
import { sizeTable } from '@/components/Generics/Tabla/tData';
import G_Options from '@/components/Generics/gOptions';

import GenericPagination from '@/components/PaginationComponents/GenericPagination';

const SizeView = () => {
  const routes = [
    { title: 'Dashboard', path: '/' },
    { title: 'Atributos', path: '/atributos' },
    { title: 'Tallas', path: '/atributos/Sizes' }
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

  // Función para cambiar la dirección de ordenación
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
          columns={sizeTable}
        />
        <G_Options buttonText="Nuevo Size" usarForm="Size" />
      </div>
      <div className="mt-10">
        <GenericPagination getApiData={GetSizesPaginated}>
          {(apiData) => (
            <ApiTable
              getApiData={() => apiData.data.data}
              columns={sizeTable}
              searchTerm={searchTerm}
              filterColumn={filterColumn}
              sortDirection={sortDirection}
              notEditable={true}
              showActions={true}
              deleteProps={{ onRemove: RemoveSize, navigatePath: `/atributos/Size` }}
            />
          )}
        </GenericPagination>
      </div>
    </div>
  );
};

export default SizeView;
