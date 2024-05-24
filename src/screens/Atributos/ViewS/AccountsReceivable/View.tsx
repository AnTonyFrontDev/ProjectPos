// Banks.tsx
import BreadcrumbData from "@/components/ui/Breadcrumb";
import ApiTable from '@/components/Generics/Tabla/apiTable';
import SearchFilter from '@/shared/SearchFilter';
import { useEffect, useState } from 'react';

import { expensesTable } from "@/components/Generics/Tabla/tData";
import { GetAccountsReceivable } from "@/shared/Api/PreOrder/PreOrderApi";
// import {CompleteExpense, GetAccountsPayable, RemoveExpenses } from "@/shared/Api/Expenses/ExpensesApi";
// import {ExpensesUpdateDto} from "@/shared/interfaces/Expenses/IExpensesUpdate.ts";
//import G_Options from "@/components/Generics/gOptions";

const View = () => {
  const routes = [
    { title: 'Dashboard', path: '/' },
    { title: 'Atributos', path: '/atributos' },
    { title: 'CuentasPorCobrar', path: '/atributos/CuentasPorCobrar' }
  ];


  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterColumn, setFilterColumn] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  //funcion para pagar
  //extraer logica de aqui
//   const payAccount = async (obj: ExpensesUpdateDto)=>{
//     await CompleteExpense(obj.id);
//     //refrescar la pagina cuando termine la ejecucion
//     window.location.reload();

//   }
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
        {/*<G_Options buttonText="Nuevo Gasto" usarForm="Expenses" />*/}
      </div>
      <div className="mt-10">
        <ApiTable
          getApiData={GetAccountsReceivable}
          columns={expensesTable}
          searchTerm={searchTerm}
          filterColumn={filterColumn}
          sortDirection={sortDirection}
        //   customButton= {['Pagar',payAccount]}
        />
      </div>
    </div>
  );
};

export default View;
