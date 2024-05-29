// BankAccount.tsx
import BreadcrumbData from "@/components/ui/Breadcrumb";
import ApiTable from '@/components/Generics/Tabla/apiTable';
import SearchFilter from '@/shared/SearchFilter';
import { useState } from 'react';

import { bankAccountTable } from "@/components/Generics/Tabla/tData";
import G_Options from "@/components/Generics/gOptions";
import { GetBankAccountsPaginated, RemoveBankAccount } from "@/shared/Api/BankAccount/BankAccountApi";
import GenericPagination from '@/components/PaginationComponents/GenericPagination';

const View = () => {
  const routes = [
    { title: 'Dashboard', path: '/' },
    { title: 'Atributos', path: '/atributos' },
    { title: 'Banks', path: '/atributos/Banks' }
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
          columns={bankAccountTable}
        />
        <G_Options buttonText="Nueva Cuenta" usarForm="BankAccount" />
      </div>
      <div className="mt-10">
        <GenericPagination getApiData={GetBankAccountsPaginated}>
          {(apiData) => (

            <ApiTable
              getApiData={() => apiData.data.data}
              delApiData={RemoveBankAccount}
              usarForm='BankAccount'
              columns={bankAccountTable}
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

export default View;
