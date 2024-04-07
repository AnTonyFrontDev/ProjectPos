// Colors.tsx
import BreadcrumbData from "@/components/Breadcrumb";
import ApiTable from '@/components/Generics/Tabla/apiTable';
import Options from "../Color/components/Options";
import SearchFilter from '../Color/components/SearchFilter';
import { useEffect, useState } from 'react';

import { colorTable } from "@/components/Generics/Tabla/tData";
import { getColors } from "@/shared/Api/Color/ColorApi";

const ColorView = () => {
  const routes = [
    { title: 'Dashboard', path: '/' },
    { title: 'Atributos', path: '/atributos' },
    { title: 'Colors', path: '/atributos/Colors' }
  ];

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterColumn, setFilterColumn] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    // Puedes realizar alguna acción específica cuando cambia la lista de colores
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
          columns={colorTable} // Asegúrate de tener la tabla correcta para los colores
        />
        <Options />
      </div>
      <div className="mt-10">
        <ApiTable
          getApiData={getColors}
          columns={colorTable} // Asegúrate de tener la tabla correcta para los colores
          searchTerm={searchTerm}
          filterColumn={filterColumn}
          sortDirection={sortDirection}
          showActions={true}
        />
      </div>
    </div>
  );
};

export default ColorView;
