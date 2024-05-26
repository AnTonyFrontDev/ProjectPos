// Banks.tsx
import BreadcrumbData from "@/components/ui/Breadcrumb";
import ApiTable from '@/components/Generics/Tabla/apiTable';
import SearchFilter from '@/shared/SearchFilter';
import { useEffect, useState } from 'react';

import { banksTable } from "@/components/Generics/Tabla/tData";
import {getBanks, GetBanksPaginated, RemoveBank} from "@/shared/Api/Bank/BankApi";
import G_Options from "@/components/Generics/gOptions";
import {IBankColumns} from "@/shared/interfaces/Bank/IBankGet.ts";
import useDataPagination from "@/components/Hooks/useDataPagination.ts";
import ButtonsPagination from "@/components/PaginationComponents/ButtonsPagination.tsx";
import UseDataPagination from "@/components/Hooks/useDataPagination.ts";
import IPagination from "@/shared/interfaces/Pagination/IPagination.ts";

const View = () => {
  const routes = [
    { title: 'Dashboard', path: '/' },
    { title: 'Atributos', path: '/atributos' },
    { title: 'Banks', path: '/atributos/Banks' }
  ];

  //estado para el numero de items que debe traer la peticion al API
  const [itemsPerPage, setItemsPerPage] = useState(10);
  //pagina
  const [page, setPage] = useState(1);
  //estado para la data de la API
  const [apiData, setApiData] = useState()
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterColumn, setFilterColumn] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  //paginacion
  const [dataPagination,setDataPagination] = useState<IPagination>();
  const fetchData = async ()=>{
    GetBanksPaginated(page,itemsPerPage)
        .then((data)=>{
          setApiData(()=>data);
          if(data.headers["x-pagination"] != undefined){
              setDataPagination(()=> JSON.parse(data.headers["x-pagination"]) as IPagination);
          }
          console.log(dataPagination)
        })
  }
  //handle del click
  const HandleClickPage = (action:boolean)=>{
    action ? setPage((number) => number + 1) : setPage((number) => number - 1);
  }
  useEffect(() => {
    // Puedes realizar alguna acción específica cuando cambia la lista de bancos
    fetchData()
  }, [page,searchTerm, filterColumn, sortDirection]);

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
          columns={banksTable}
        />
        <G_Options buttonText="Nuevo Banco" usarForm="Bank" />
      </div>
      <div className="mt-10">
        <ApiTable
          getApiData={async() =>{

            const transformedData: IBankColumns[] = apiData.data.data.map((bank: IBankColumns) => ({
              ...bank,
              name: bank.bankName
            }));
            return transformedData;
          }}
          delApiData={RemoveBank}
          usarForm='Bank'
          columns={banksTable}
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
