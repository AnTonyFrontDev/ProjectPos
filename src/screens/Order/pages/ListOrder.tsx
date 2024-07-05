import { useState } from 'react';
import { cancelOrder, getOrdersPaginated } from '@/shared/Api/Order/OrderApi';
import SearchFilter from '@/shared/SearchFilter';
import BreadcrumbData from "@/components/ui/Breadcrumb";
import { orderTable } from "@/components/Generics/Tabla/tData";
import ApiTable from '@/components/Generics/Tabla/apiTable';
import { useNavigate } from 'react-router-dom';
import GenericPagination from '@/components/PaginationComponents/GenericPagination';

function ListOrders() {
    const routes = [
        { title: 'Home', path: '/' },
        { title: 'Dashboard', path: '/' },
        { title: 'Ordenes', path: '/Order' }
    ];

    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filterColumn, setFilterColumn] = useState<string>('');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

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
        console.log('record', record);
        navigate(`/Order/OrderDetail/${record.id}`);
    };

    return (
        <>
            <BreadcrumbData routes={routes} />
            <div className="col-span-2 bg-gray-50 shadow-lg my-14 p-4 rounded-md flex justify-between">
                <SearchFilter
                    onSearch={handleSearch}
                    onFilterChange={handleFilterChange}
                    onSortToggle={handleSortToggle}
                    columns={orderTable}
                />
            </div>
            <GenericPagination getApiData={getOrdersPaginated}>
                {(apiData) => (

                    <ApiTable
                        getApiData={() => apiData.data.data}
                        delApiData={cancelOrder}
                        columns={orderTable}
                        searchTerm={searchTerm}
                        filterColumn={filterColumn}
                        sortDirection={sortDirection}
                        // showActions={true}
                        // editable={false}
                        handleTableRowClick={handleTableRowClick}
                    />
                )}

            </GenericPagination>
        </>
    );
}

export default ListOrders;
