// Banks.tsx
import BreadcrumbData from "@/components/ui/Breadcrumb";
import ApiTable from '@/components/Generics/Tabla/apiTable';
import Options from "../Expenses/components/Options";
import SearchFilter from '../Bank/components/SearchFilter';
import { useEffect, useState } from 'react';

import { expensesTable } from "@/components/Generics/Tabla/tData";
import { getExpenses } from "@/shared/Api/Expenses/ExpensesApi";

const View = () => {
  const routes = [
    // { title: 'Home', path: '/' },
    { title: 'Dashboard', path: '/' },
    { title: 'Atributos', path: '/atributos' },
    { title: 'Expenses', path: '/atributos/Expenses' }
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
          columns={expensesTable}
        />
        <Options />
      </div>
      <div className="mt-10">
        <ApiTable
          getApiData={getExpenses}
          columns={expensesTable}
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
