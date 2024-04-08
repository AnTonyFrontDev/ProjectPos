// CategorySize.tsx
import { useEffect, useState } from 'react';
import BreadcrumbData from '@/components/ui/Breadcrumb';
import ApiTable from '@/components/Generics/Tabla/apiTable';
import SearchFilter from '../CategorySize/components/SearchFilter';

import { categorySizeTable } from '@/components/Generics/Tabla/tData';
import { RemoveCategorySize, getCategorySizes } from '@/shared/Api/CategorySize/CategorySizeApi';
import G_Options from '@/components/Generics/gOptions';

const View = () => {
  const routes = [
    { title: 'Dashboard', path: '/' },
    { title: 'Atributos', path: '/atributos' },
    { title: 'Categoria de Size', path: '/atributos/CategorySize' }
  ];

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterColumn, setFilterColumn] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
  }, [searchTerm, filterColumn, sortDirection]);

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
        <ApiTable
          getApiData={getCategorySizes}
          delApiData={RemoveCategorySize}
          usarForm='CSize'
          columns={categorySizeTable}
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
