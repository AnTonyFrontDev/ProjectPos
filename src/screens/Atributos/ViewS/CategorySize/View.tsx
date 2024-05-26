// CategorySize.tsx
import { useEffect, useState } from 'react';
import BreadcrumbData from '@/components/ui/Breadcrumb';
import ApiTable from '@/components/Generics/Tabla/apiTable';
import SearchFilter from '@/shared/SearchFilter';

import { categorySizeTable } from '@/components/Generics/Tabla/tData';
import {
  RemoveCategorySize,
  getCategorySizes,
  GetCategorySizesPaginated
} from '@/shared/Api/CategorySize/CategorySizeApi';
import G_Options from '@/components/Generics/gOptions';
import IPagination from "@/shared/interfaces/Pagination/IPagination.ts";
import ButtonsPagination from "@/components/PaginationComponents/ButtonsPagination.tsx";

const View = () => {
  const routes = [
    { title: 'Dashboard', path: '/' },
    { title: 'Atributos', path: '/atributos' },
    { title: 'Categoria de Size', path: '/atributos/CategorySize' }
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
    GetCategorySizesPaginated(page,itemsPerPage)
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

  useEffect(() => {
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
          columns={categorySizeTable}
        />
        <G_Options buttonText="Nueva Categoria" usarForm="CSize" />
      </div>
      <div className="mt-10">
        <ApiTable
          getApiData={async ()=>{
            return apiData.data.data;
          }}
          delApiData={RemoveCategorySize}
          usarForm='CSize'
          columns={categorySizeTable}
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
