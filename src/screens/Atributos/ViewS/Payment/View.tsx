// Banks.tsx
import BreadcrumbData from "@/components/ui/Breadcrumb";
import ApiTable from '@/components/Generics/Tabla/apiTable';
import SearchFilter from '../../../../shared/SearchFilter';
import { useEffect, useState } from 'react';

import { paymentTable } from "@/components/Generics/Tabla/tData";
import {getPayments, GetPaymentsPaginated, RemovePayment} from "@/shared/Api/Payment/PaymentApi";
import G_Options from "@/components/Generics/gOptions";
import IPagination from "@/shared/interfaces/Pagination/IPagination.ts";
import {GetExpensesPaginated} from "@/shared/Api/Expenses/ExpensesApi.ts";
import ButtonsPagination from "@/components/PaginationComponents/ButtonsPagination.tsx";

const View = () => {
  const routes = [
    { title: 'Dashboard', path: '/' },
    { title: 'Atributos', path: '/atributos' },
    { title: 'Pagos', path: '/atributos/Payment' }
  ];



  //estado para el numero de items que debe traer la peticion al API
  const [itemsPerPage, setItemsPerPage] = useState(10);
  //pagina
  const [page, setPage] = useState(1);
  //estado para la data de la API
  const [apiData, setApiData] = useState()
  //paginacion
  const [dataPagination,setDataPagination] = useState<IPagination>();
  const fetchData = async ()=>{
    GetPaymentsPaginated(page,itemsPerPage)
        .then((data)=>{
          setApiData(()=>data);
          if(data.headers["x-pagination"] != undefined){
            setDataPagination(()=> JSON.parse(data.headers["x-pagination"]) as IPagination);
          }


        })
  }
  //handle del click
  const HandleClickPage = (action:boolean)=>{
    action ? setPage((number) => number + 1) : setPage((number) => number - 1);
  }
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterColumn, setFilterColumn] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    // Puedes realizar alguna acción específica cuando cambia la lista de bancos
    fetchData();
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
          columns={paymentTable}
        />
        <G_Options buttonText="Nuevo Pago" usarForm="Payment" />
      </div>
      <div className="mt-10">
        <ApiTable
          getApiData={async()=>apiData.data.data}
          delApiData={RemovePayment}
          usarForm='Payment'
          columns={paymentTable}
          searchTerm={searchTerm}
          filterColumn={filterColumn}
          sortDirection={sortDirection}
          showActions={true} 
        />
      </div>
      <ButtonsPagination dataPagination={dataPagination} HandleClickPage={HandleClickPage}/>
    </div>
  );
};

export default View;
