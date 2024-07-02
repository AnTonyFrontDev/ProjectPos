// Payment.tsx
import BreadcrumbData from "@/components/ui/Breadcrumb";
import ApiTable from '@/components/Generics/Tabla/apiTable';
import SearchFilter from '@/shared/SearchFilter';
import { useState } from 'react';
import { paymentTable } from "@/components/Generics/Tabla/tData";
import { GetPaymentsPaginated, RemovePayment } from "@/shared/Api/Payment/PaymentApi";
import G_Options from "@/components/Generics/gOptions";
import GenericPagination from "@/components/PaginationComponents/GenericPagination";

const View = () => {
  const routes = [
    { title: 'Dashboard', path: '/' },
    { title: 'Atributos', path: '/atributos' },
    { title: 'Pagos', path: '/atributos/Payment' }
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
          columns={paymentTable}
        />
        <G_Options buttonText="Nuevo Pago" usarForm="Payment" />
      </div>
      <div className="mt-10">
        <GenericPagination getApiData={GetPaymentsPaginated}>
          {(apiData) => (
            <ApiTable
              getApiData={async () => apiData.data.data}
              delApiData={RemovePayment}
              usarForm='Payment'
              columns={paymentTable}
              searchTerm={searchTerm}
              filterColumn={filterColumn}
              sortDirection={sortDirection}
              showActions={true}
              notEditable={true}
              
            />
          )}
        </GenericPagination>
      </div>
    </div>
  );
};

export default View;
