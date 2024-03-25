// PaymentTypes.tsx
import { useEffect, useState } from 'react';
import BreadcrumbData from "@/components/Breadcrumb";
import ApiTable from '@/components/Tabla/apiTable';
import Options from "../PaymentType/components/Options";
import SearchFilter from '../PaymentType/components/SearchFilter';
import { paymentTypeTable } from "@/components/Tabla/tData";
import { getPaymentTypes } from "@/shared/Api/PaymentType/PaymentTypeApi";

const View = () => {
  const routes = [
    { title: 'Dashboard', path: '/' },
    { title: 'Atributos', path: '/atributos' },
    { title: 'Payment Types', path: '/atributos/PaymentTypes' }
  ];

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterColumn, setFilterColumn] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    // Puedes realizar alguna acción específica cuando cambia la lista de tipos de pago
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
          columns={paymentTypeTable}
        />
        <Options />
      </div>
      <div className="mt-10">
        <ApiTable
          getApiData={getPaymentTypes}
          columns={paymentTypeTable}
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