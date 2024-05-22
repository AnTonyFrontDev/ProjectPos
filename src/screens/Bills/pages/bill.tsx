// Sale.tsx
import BreadcrumbData from "@/components/ui/Breadcrumb";
import ApiTable from '@/components/Generics/Tabla/apiTable';
import SearchFilter from '@/shared/SearchFilter';
import { useEffect, useState } from 'react';

import { saleTableTable } from "@/components/Generics/Tabla/tData";
// import { getBanks, RmoveBank } from "@/shared/Api/Bank/BankApi";
// import G_Options from "@/components/Generics/gOptions";
import { getSales, RemoveSale } from "@/shared/Api/Sale/SaleApi";
import { useNavigate } from "react-router-dom";

const View = () => {
  const routes = [
    { title: 'Dashboard', path: '/' },
    { title: 'Billing', path: '/billing' }
  ];

  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterColumn, setFilterColumn] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedSaleId, setSelectedSaleId] = useState<number | null>(null);


  useEffect(() => {
    // Puedes realizar alguna acción específica cuando cambia la lista de bancos
  }, [searchTerm, filterColumn, sortDirection]);

  const handleTableRowClick = (record: any) => {
    // Al hacer clic en una fila, establece el ID del producto seleccionado y muestra el detalle
    setSelectedSaleId(record.id);
    console.log(record.id);
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
        <ApiTable
          getApiData={getSales}
          delApiData={RemoveSale}
          usarForm='Bank'
          columns={saleTableTable}
          searchTerm={searchTerm}
          filterColumn={filterColumn}
          sortDirection={sortDirection}
          handleTableRowClick={handleTableRowClick}
        />
      </div>
    </div>
  );
};

export default View;
