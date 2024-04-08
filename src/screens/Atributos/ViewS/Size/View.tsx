// SizeView.tsx
import { useEffect, useState } from 'react';
import BreadcrumbData from "@/components/ui/Breadcrumb";
import ApiTable from '@/components/Generics/Tabla/apiTable';
import Options from "../Size/components/Options";
import SearchFilter from '../Size/components/SearchFilter';
import { getSizes } from "@/shared/Api/Size/SizeApi";
import { sizeTable } from '@/components/Generics/Tabla/tData';

const SizeView = () => {
  const routes = [
    { title: 'Dashboard', path: '/' },
    { title: 'Atributos', path: '/atributos' },
    { title: 'Sizes', path: '/atributos/Sizes' }
  ];

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterColumn, setFilterColumn] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    // Puedes realizar alguna acción específica cuando cambia la lista de tamaños
  }, [searchTerm, filterColumn, sortDirection]);

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
        <Options />
      </div>
      <div className="mt-10">
        <ApiTable
          getApiData={getSizes}
          columns={sizeTable}
          searchTerm={searchTerm}
          filterColumn={filterColumn}
          sortDirection={sortDirection}
          showActions={true} 
        />
      </div>
    </div>
  );
};

export default SizeView;
