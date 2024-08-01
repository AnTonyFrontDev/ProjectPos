// PaymentTypes.tsx
import { useState } from 'react';
import BreadcrumbData from "@/components/ui/Breadcrumb";
import ApiTable from '@/components/Generics/Tabla/apiTable';
import SearchFilter from '@/shared/SearchFilter';

import { paymentTypeTable } from "@/components/Generics/Tabla/tData";
import { GetPaymentTypesPaginated, RemovePaymentType } from '@/shared/Api/Payment/PaymentType/PaymentTypeApi';
import G_Options from '@/components/Generics/gOptions';

import GenericPagination from '@/components/PaginationComponents/GenericPagination';

const View = () => {
  const routes = [
    { title: 'Dashboard', path: '/' },
    { title: 'Atributos', path: '/atributos' },
    { title: 'Modo de pago', path: '/atributos/PaymentType' }
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
          columns={paymentTypeTable}
        />
        <G_Options buttonText="Nuevo Modo" usarForm="TypePay" />
      </div>
      <div className="mt-10">
        <GenericPagination getApiData={GetPaymentTypesPaginated}>
          {(apiData) => (

            <ApiTable
              getApiData={async () => apiData.data.data}
              usarForm='TypePay'
              columns={paymentTypeTable}
              searchTerm={searchTerm}
              filterColumn={filterColumn}
              sortDirection={sortDirection}
              showActions={true}
              notEditable={true}
              deleteProps={{ onRemove: RemovePaymentType, navigatePath: `/PaymentType` }}
            />
          )}

        </GenericPagination>
      </div>
    </div>
  );
};

export default View;
