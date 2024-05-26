import { useEffect, useState } from 'react';
import {getPreOrders, GetPreOrdersPaginated} from '@/shared/Api/PreOrder/PreOrderApi';
// import useOrderProcessing from '../hooks/useOrderHook';
// import mapPreOrderToCheckOrder from '../hooks/useMapPreOrder';
// import { Link } from 'react-router-dom';
import SearchFilter from '@/shared/SearchFilter';
import BreadcrumbData from "@/components/ui/Breadcrumb";
import ApiTable from '@/components/Generics/Tabla/apiTable';
import { preOrderTable } from '@/components/Generics/Tabla/tData';
import { Link, useNavigate } from 'react-router-dom';
import IPagination from "@/shared/interfaces/Pagination/IPagination.ts";
import ButtonsPagination from "@/components/PaginationComponents/ButtonsPagination.tsx";
// import { getOrders } from '@/shared/Api/Order/OrderApi';

const ListPreOrder = () => {
    const routes = [
        { title: 'Home', path: '/' },
        { title: 'Dashboard', path: '/' },
        { title: 'Pedidos', path: '/PreOrder' }
    ];

    const navigate = useNavigate();
    // const { loading, error, processOrder } = useOrderProcessing();
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
        GetPreOrdersPaginated(page,itemsPerPage)
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
    const [selectedPreOrderId, setSelectedPreOrderId] = useState<number | null>(null);

    useEffect(() => {
        if (selectedPreOrderId !== null) {
            // Realizar alguna acción con selectedProductId
            fetchData();
        }
    }, [page,selectedPreOrderId]);

    const handleSearch = (value: string) => {
        setSearchTerm(value);
    };

    const handleFilterChange = (value: string) => {
        setFilterColumn(value);
    };

    const handleSortToggle = () => {
        setSortDirection((prevSortDirection) => (prevSortDirection === 'asc' ? 'desc' : 'asc') as 'asc' | 'desc');
    };

    const handleTableRowClick = (record: any) => {
        // Al hacer clic en una fila, establece el ID del producto seleccionado y muestra el detalle
        setSelectedPreOrderId(record.id);
        console.log(record.id);
        navigate(`/preOrder/PreOrderDetail/${record.id}`);
    };


    //#region 

    // useEffect(() => {
    //     const fetchPreOrders = async () => {
    //         try {
    //             const response = await getPreOrders();
    //             setPreOrders(response.data);
    //         } catch (error) {
    //             console.error('Error fetching pre-orders:', error);
    //         }
    //     };

    //     fetchPreOrders();
    // }, []);

    // const handleOrderClick = async (preOrder: IPreOrderGet) => {
    //     // Convertir la data de IPreOrderGet a ICheckOrder
    //     const checkOrderData = mapPreOrderToCheckOrder(preOrder);
    //     console.log(error)
    //     // Procesar la orden
    //     await processOrder([checkOrderData], preOrder);
    // };

    //#endregion

    return (
        <>
            <BreadcrumbData routes={routes} />
            <div className="col-span-2 bg-gray-50 shadow-lg my-14 p-4 rounded-md flex justify-between">
                <SearchFilter
                    onSearch={handleSearch}
                    onFilterChange={handleFilterChange}
                    onSortToggle={handleSortToggle}
                    columns={preOrderTable}
                />
                <Link
                    to="/preOrder/new"
                    className="inline-block bg-green-500 
                    hover:bg-green-600 focus:outline-none 
                    focus:ring focus:ring-green-200 text-white 
                    font-bold py-2 px-4 rounded-md shadow-md transition-    colors duration-300"
                >
                    Nuevo Pedido
                </Link>
            </div>
            <ApiTable
                getApiData={() => apiData.data.data}
                columns={preOrderTable}
                searchTerm={searchTerm}
                filterColumn={filterColumn}
                sortDirection={sortDirection}
                showActions={false} // Opcional: mostrar acciones como editar/eliminar
                handleTableRowClick={handleTableRowClick}
            />
            <ButtonsPagination dataPagination={dataPagination} HandleClickPage={HandleClickPage}/>
        </>
    );
}

export default ListPreOrder;
