// CategorySize.tsx
import { useEffect, useState } from 'react';
import BreadcrumbData from '@/components/Breadcrumb';
import ApiTable from '@/components/Tabla/apiTable';
import Options from '../CategorySize/components/Options';
import SearchFilter from '../CategorySize/components/SearchFilter';

import { categorySizeTable } from '@/components/Tabla/tData';
import { RemoveCategorySize, UpdateCategorySize, getCategorySizeById, getCategorySizes } from '@/shared/Api/CategorySize/CategorySizeApi';

const View = () => {
  const routes = [
    { title: 'Dashboard', path: '/' },
    { title: 'Atributos', path: '/atributos' },
    { title: 'CategorySize', path: '/atributos/CategorySize' }
  ];

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterColumn, setFilterColumn] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    // Puedes realizar alguna acción específica cuando cambia la lista de CategorySize
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
          columns={categorySizeTable}
        />
        <Options />
      </div>
      <div className="mt-10">
        <ApiTable
          idApiData={getCategorySizeById}
          useForm="CSize"
          getApiData={getCategorySizes}
          putApiData={UpdateCategorySize}
          delApiData={RemoveCategorySize}
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
