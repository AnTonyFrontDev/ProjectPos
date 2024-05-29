// Colors.tsx
import BreadcrumbData from "@/components/ui/Breadcrumb";
import ApiTable from '@/components/Generics/Tabla/apiTable';
import SearchFilter from '@/shared/SearchFilter';
import { useState } from 'react';

import { colorTable } from "@/components/Generics/Tabla/tData";
import { GetColorsPaginated } from "@/shared/Api/Color/ColorApi";
import G_Options from "@/components/Generics/gOptions";
import GenericPagination from "@/components/PaginationComponents/GenericPagination";

const ColorView = () => {
  const routes = [
    { title: 'Dashboard', path: '/' },
    { title: 'Atributos', path: '/atributos' },
    { title: 'Colors', path: '/atributos/Colors' }
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
          columns={colorTable}
        />
        <G_Options buttonText="Nuevo Color" usarForm="Color" />
      </div>
      <div className="mt-10">
        <GenericPagination getApiData={GetColorsPaginated}>
          {(apiData) => (

            <ApiTable
              getApiData={() => {
                return apiData.data.data
              }}
              columns={colorTable}
              searchTerm={searchTerm}
              filterColumn={filterColumn}
              sortDirection={sortDirection}
              showActions={true}
            />
          )}

        </GenericPagination>
      </div>
    </div>
  );
};

export default ColorView;
