import { useEffect, useState } from 'react';
import { getPreOrders } from '@/shared/Api/PreOrder/PreOrderApi';
// import useOrderProcessing from '../hooks/useOrderHook';
// import mapPreOrderToCheckOrder from '../hooks/useMapPreOrder';
// import { Link } from 'react-router-dom';
import SearchFilter from '@/screens/Order/components/SearchFilter';
import BreadcrumbData from "@/components/ui/Breadcrumb";
import ApiTable from '@/components/Generics/Tabla/apiTable';
import { preOrderTable } from '@/components/Generics/Tabla/tData';
import { useNavigate } from 'react-router-dom';
// import { getOrders } from '@/shared/Api/Order/OrderApi';

const ListPreOrder = () => {
    const routes = [
        { title: 'Home', path: '/' },
        { title: 'Dashboard', path: '/' },
        { title: 'Ordenes', path: '/Order' }
    ];

    const navigate = useNavigate();
    // const { loading, error, processOrder } = useOrderProcessing();

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filterColumn, setFilterColumn] = useState<string>('');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [selectedPreOrderId, setSelectedPreOrderId] = useState<number | null>(null);

    useEffect(() => {
        if (selectedPreOrderId !== null) {
          // Realizar alguna acción con selectedProductId
          console.log(`El producto seleccionado tiene el ID: ${selectedPreOrderId}`);
        }
      }, [selectedPreOrderId]);

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
            </div>
            <ApiTable
                getApiData={getPreOrders}
                columns={preOrderTable}
                searchTerm={searchTerm}
                filterColumn={filterColumn}
                sortDirection={sortDirection}
                showActions={false} // Opcional: mostrar acciones como editar/eliminar
                handleTableRowClick={handleTableRowClick}
            />
        </>
    );
}

export default ListPreOrder;
