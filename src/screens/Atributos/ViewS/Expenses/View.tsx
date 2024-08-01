// Expenses.tsx
import BreadcrumbData from "@/components/ui/Breadcrumb";
import ApiTable from '@/components/Generics/Tabla/apiTable';
import SearchFilter from '@/shared/SearchFilter';
import { useState } from 'react';

import { expensesTable } from "@/components/Generics/Tabla/tData";
import { GetExpensesPaginated, RemoveExpenses } from "@/shared/Api/Expenses/ExpensesApi";
import G_Options from "@/components/Generics/gOptions";

import GenericPagination from "@/components/PaginationComponents/GenericPagination";

const View = () => {
  const routes = [
    { title: 'Dashboard', path: '/' },
    { title: 'Atributos', path: '/atributos' },
    { title: 'Gastos', path: '/atributos/Expenses' }
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
          columns={expensesTable}
        />
        <G_Options buttonText="Nuevo Gasto" usarForm="Expenses" />
      </div>
      <div className="mt-10">
        <GenericPagination getApiData={GetExpensesPaginated}>
          {(apiData) => (

            <ApiTable
              getApiData={async () => apiData.data.data}
              usarForm='Expenses'
              columns={expensesTable}
              searchTerm={searchTerm}
              filterColumn={filterColumn}
              sortDirection={sortDirection}
              notEditable={true}
              showActions={true}
              deleteProps={{ onRemove: RemoveExpenses, navigatePath: `/Expenses` }}
            />
          )}

        </GenericPagination>
      </div>
    </div>
  );
};

export default View;
