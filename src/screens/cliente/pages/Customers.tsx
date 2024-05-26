// Customers.tsx
import BreadcrumbData from "@/components/ui/Breadcrumb"
import ApiTable from '@/components/Generics/Tabla/apiTable'
import SearchFilter from '@/shared/SearchFilter';
import { useEffect, useState } from 'react'

import { customersTable } from "@/components/Generics/Tabla/tData";
import { useNavigate} from 'react-router-dom';
import G_Options from "@/components/Generics/gOptions";
import IPagination from "@/shared/interfaces/Pagination/IPagination.ts";
import {getOrdersPaginated} from "@/shared/Api/Order/OrderApi.ts";
import ButtonsPagination from "@/components/PaginationComponents/ButtonsPagination.tsx";
import {getClientsPaginated} from "@/shared/Api/Customers/CustomersApi.tsx";


const Customers = () => {
  const routes = [
    { title: 'Home', path: '/' },
    { title: 'Dashboard', path: '/' },
    { title: 'Customers', path: '/Customers' }
  ];

  const navigate = useNavigate();
  //estado para el numero de items que debe traer la peticion al API
  const [itemsPerPage, setItemsPerPage] = useState(10);

//pagina
  const [page, setPage] = useState(1);
//estado para la data de la API
  const [apiData, setApiData] = useState()
//----------

//paginacion
  const [dataPagination,setDataPagination] = useState<IPagination>();
  const fetchData = async ()=>{
    getClientsPaginated(page,itemsPerPage)
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
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);

  useEffect(() => {
    if (selectedClientId !== null) {
      // Realizar alguna acción con selectedProductId
      console.log(`El producto seleccionado tiene el ID: ${selectedClientId}`);
    }
    fetchData();
  }, [page,selectedClientId]);
  
  const handleTableRowClick = (record: any) => {
    // Al hacer clic en una fila, establece el ID del producto seleccionado y muestra el detalle
    setSelectedClientId(record.id);
    console.log(record.id);
    navigate(`/customers/ClientDetail/${record.id}`);
    // setDetalleVisible(true);
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
          columns={customersTable}
        />
        <G_Options buttonText="Nuevo Cliente" usarForm="Client" />
      </div>
      <div className="mt-10">
        <ApiTable
          getApiData={()=> apiData.data.data}
          
          columns={customersTable}
          searchTerm={searchTerm}
          filterColumn={filterColumn}
          sortDirection={sortDirection}
          handleTableRowClick={handleTableRowClick}
        />

      </div>
      <ButtonsPagination dataPagination={dataPagination} HandleClickPage={HandleClickPage}/>
    </div>
  )
}

export default Customers