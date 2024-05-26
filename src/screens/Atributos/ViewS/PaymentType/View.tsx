// PaymentTypes.tsx
import { useEffect, useState } from 'react';
import BreadcrumbData from "@/components/ui/Breadcrumb";
import ApiTable from '@/components/Generics/Tabla/apiTable';
import SearchFilter from '@/shared/SearchFilter';

import { paymentTypeTable } from "@/components/Generics/Tabla/tData";
import {
  getPaymentTypes,
  GetPaymentTypesPaginated,
  RemovePaymentType
} from '@/shared/Api/Payment/PaymentType/PaymentTypeApi';
import G_Options from '@/components/Generics/gOptions';
import IPagination from "@/shared/interfaces/Pagination/IPagination.ts";
import {GetPaymentsPaginated} from "@/shared/Api/Payment/PaymentApi.ts";
import ButtonsPagination from "@/components/PaginationComponents/ButtonsPagination.tsx";

const View = () => {
  const routes = [
    { title: 'Dashboard', path: '/' },
    { title: 'Atributos', path: '/atributos' },
    { title: 'Modo de pago', path: '/atributos/PaymentType' }
  ];


  //estado para el numero de items que debe traer la peticion al API
  const [itemsPerPage, setItemsPerPage] = useState(1);
  //pagina
  const [page, setPage] = useState(1);
  //estado para la data de la API
  const [apiData, setApiData] = useState()
  //paginacion
  const [dataPagination,setDataPagination] = useState<IPagination>();
  const fetchData = async ()=>{
    GetPaymentTypesPaginated(page,itemsPerPage)
        .then((data)=>{
          console.log(data)
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
    // Puedes realizar alguna acción específica cuando cambia la lista de tipos de pago
    fetchData();
  }, [page,searchTerm, filterColumn, sortDirection]);

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
        <G_Options buttonText="Nuevo Modo" usarForm="TypePay"/>
      </div>
      <div className="mt-10">
        <ApiTable
          getApiData={async()=>apiData.data.data}
          delApiData={RemovePaymentType}
          usarForm='TypePay'
          columns={paymentTypeTable}
          searchTerm={searchTerm}
          filterColumn={filterColumn}
          sortDirection={sortDirection}
          showActions={true}
          editable={false}
        />
      </div>
      <ButtonsPagination dataPagination={dataPagination} HandleClickPage={HandleClickPage}/>
    </div>
  );
};

export default View;
