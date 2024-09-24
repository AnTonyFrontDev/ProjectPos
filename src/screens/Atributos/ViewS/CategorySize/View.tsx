// CategorySize.tsx
import { useState } from 'react';
import BreadcrumbData from '@/components/ui/Breadcrumb';
import ApiTable from '@/components/Generics/Tabla/apiTable';
import SearchFilter from '@/shared/SearchFilter';

import { categorySizeTable } from '@/components/Generics/Tabla/tData';
import { RemoveCategorySize, GetCategorySizesPaginated } from '@/shared/Api/CategorySizeApi';
import G_Options from '@/components/Generics/gOptions';
import GenericPagination from '@/components/PaginationComponents/GenericPagination';

const View = () => {
  const routes = [
    { title: 'Dashboard', path: '/' },
    { title: 'Atributos', path: '/atributos' },
    { title: 'Categoria de Size', path: '/atributos/CategorySize' }
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
          columns={categorySizeTable}
        />
        <G_Options buttonText="Nueva Categoria" usarForm="CSize" />
      </div>
      <div className="mt-10">
        <GenericPagination getApiData={GetCategorySizesPaginated}>
          {(apiData) => (

            <ApiTable
              getApiData={() => apiData.data.data}
              usarForm='CSize'
              columns={categorySizeTable}
              searchTerm={searchTerm}
              filterColumn={filterColumn}
              sortDirection={sortDirection}
              showActions={true}
              notEditable={true}
              deleteProps={{ onRemove: RemoveCategorySize, navigatePath: `/CategorySize` }}
            />
          )}
        </GenericPagination>
      </div>
    </div>
  );
};

export default View;
