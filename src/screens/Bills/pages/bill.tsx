// Sale.tsx
import BreadcrumbData from "@/components/ui/Breadcrumb";
import ApiTable from '@/components/Generics/Tabla/apiTable';
import SearchFilter from '@/shared/SearchFilter';
import { useState } from 'react';

import { saleTableTable } from "@/components/Generics/Tabla/tData";
import { getSalesPaginated, RemoveSale } from "@/shared/Api/SaleApi";
import { useNavigate } from "react-router-dom";
import GenericPagination from "@/components/PaginationComponents/GenericPagination";
import BackButton from "@/components/Generics/BackButton";

const View = () => {
  const routes = [
    { title: 'Dashboard', path: '/' },
    { title: 'Facturacion', path: '/billing' }
  ];

  const navigate = useNavigate();


  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterColumn, setFilterColumn] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');


  const handleTableRowClick = (record: any) => {
    // Al hacer clic en una fila, establece el ID del producto seleccionado y muestra el detalle
    navigate(`/billing/billDetail/${record.id}`);
  };

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
      <div className="flex items-center space-x-4 mb-4">
        <BackButton />
        <h2 className="text-2xl font-bold text-gray-800">
          Facturas
        </h2>
      </div>
      <BreadcrumbData routes={routes} />
      <div className="col-span-2 bg-gray-50 shadow-lg my-14 p-4 rounded-md flex justify-between">
        <SearchFilter
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          onSortToggle={handleSortToggle}
          columns={saleTableTable}
        />
      </div>
      <div className="mt-10">
        <GenericPagination getApiData={getSalesPaginated}>
          {(apiData) => (

            <ApiTable
              getApiData={() => apiData.data.data}
              delApiData={RemoveSale}
              usarForm='Bank'
              columns={saleTableTable}
              searchTerm={searchTerm}
              filterColumn={filterColumn}
              sortDirection={sortDirection}
              handleTableRowClick={handleTableRowClick}
            />
          )}

        </GenericPagination>
      </div>
    </div>
  );
};

export default View;
