// Producto.tsx
import BreadcrumbData from "@/components/ui/Breadcrumb"
import ApiTable from '@/components/Generics/Tabla/apiTable'
import SearchFilter from '@/shared/SearchFilter';
import { useEffect, useState } from 'react'
import { productTable } from "@/components/Generics/Tabla/tData";
import {getProducts, getProductsPaginated} from "@/shared/Api/ProductsApi";
import { useNavigate } from 'react-router-dom';
import G_Options from "@/components/Generics/gOptions";
import IPagination from "@/shared/interfaces/Pagination/IPagination.ts";
import {GetInventoryPaginated} from "@/shared/Api/InventoryApi.tsx";
import ButtonsPagination from "@/components/PaginationComponents/ButtonsPagination.tsx";

const Product = () => {
  const routes = [
    { title: 'Home', path: '/' },
    { title: 'Dashboard', path: '/' },
    { title: 'Inventory', path: '/inventory' }
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
    getProductsPaginated(page,itemsPerPage)
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
  // const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterColumn, setFilterColumn] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  useEffect(() => {
      fetchData()
  }, [page,selectedProductId]);

  const handleTableRowClick = (record: any) => {
    // Al hacer clic en una fila, establece el ID del producto seleccionado y muestra el detalle
    setSelectedProductId(record.id);
    console.log(record.id);
    navigate(`/product/ProductDetail/${record.id}`);
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
          columns={productTable}
        />
        <G_Options buttonText="Nuevo Producto" usarForm="Product" />
      </div>
      <div className="mt-10">
        <ApiTable
          getApiData={()=> apiData.data.data}
          columns={productTable}
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

export default Product