import { useState, useEffect } from 'react';
import { GetPreOrdersPaginated } from '@/shared/Api/PreOrder/PreOrderApi';
import SearchFilter from '@/shared/SearchFilter';
import BreadcrumbData from "@/components/ui/Breadcrumb";
import ApiTable from '@/components/Generics/Tabla/apiTable';
import { preOrderTable } from '@/components/Generics/Tabla/tData';
import { Link, useNavigate } from 'react-router-dom';
import GenericPagination from '@/components/PaginationComponents/GenericPagination';
import BackButton from '@/components/Generics/BackButton';
// import { GetBuyPaginated } from '@/shared/Api/BuyInventory/BuyApi';

interface ListPreOrderProps {
    onlyData?: boolean;
}

const ListPreOrder = ({ onlyData }: ListPreOrderProps) => {
    const routes = [
        { title: 'Home', path: '/' },
        { title: 'Dashboard', path: '/' },
        { title: 'Pedidos', path: '/PreOrder' }
    ];

    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filterColumn, setFilterColumn] = useState<string>('');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    // Efecto para ordenar automáticamente por fecha si onlyData es true
    useEffect(() => {
        if (onlyData) {
            setFilterColumn('dateCreated');
            setSortDirection('desc');
        }
    }, [onlyData]);

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
        navigate(`/preOrder/PreOrderDetail/${record.id}`);
    };

    return (
        <>
            {!onlyData && <>
                <div className="flex items-center space-x-4 mb-4">
                    <BackButton />
                    <h2 className="text-2xl font-bold text-gray-800">
                        Pedidos
                    </h2>
                </div>
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
                        font-bold py-2 px-4 rounded-md shadow-md transition-colors duration-300"
                    >
                        Nuevo Pedido
                    </Link>
                </div>
            </>}
            <GenericPagination getApiData={GetPreOrdersPaginated}>
                {(apiData) => (
                    <ApiTable
                        getApiData={() => apiData.data.data}
                        columns={preOrderTable}
                        searchTerm={searchTerm}
                        filterColumn={filterColumn}
                        sortDirection={sortDirection}
                        showActions={false} // Opcional: mostrar acciones como editar/eliminar
                        handleTableRowClick={handleTableRowClick}
                    />
                )}
            </GenericPagination>
        </>
    );
}

export default ListPreOrder;
