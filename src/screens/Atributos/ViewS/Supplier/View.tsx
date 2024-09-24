// SupplierView.tsx
import { useState } from 'react';
import BreadcrumbData from "@/components/ui/Breadcrumb";
import ApiTable from '@/components/Generics/Tabla/apiTable';
import SearchFilter from '@/shared/SearchFilter';
import { SupplierTable } from '@/components/Generics/Tabla/tData';
import G_Options from '@/components/Generics/gOptions';

import GenericPagination from '@/components/PaginationComponents/GenericPagination';
import { getSupplierPaginated, RemoveSupplier } from '@/shared/Api/SupplierApi';

const SupplierView = () => {
  const routes = [
    { title: 'Dashboard', path: '/' },
    { title: 'Atributos', path: '/atributos' },
    { title: 'Suplidores', path: '/atributos/Supplier' }
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
          columns={SupplierTable}
        />
        <G_Options buttonText="Nuevo Supplier" usarForm="Supplier" />
      </div>
      <div className="mt-10">
        <GenericPagination getApiData={getSupplierPaginated}>
          {(apiData) => (

            <ApiTable
              getApiData={() => apiData.data.data}
              columns={SupplierTable}
              searchTerm={searchTerm}
              filterColumn={filterColumn}
              sortDirection={sortDirection}
              usarForm={'Supplier'}
              showActions={true}
              deleteProps={{ onRemove: RemoveSupplier }}
            />
          )}
        </GenericPagination>
      </div>
    </div>
  );
};

export default SupplierView;
