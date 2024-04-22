import { useState} from 'react'; 
import { getOrders } from '@/shared/Api/Order/OrderApi';
import SearchFilter from '../components/SearchFilter';
import BreadcrumbData from "@/components/ui/Breadcrumb";
import { orderTable } from "@/components/Generics/Tabla/tData";
import ApiTable from '@/components/Generics/Tabla/apiTable';

function ListOrders() {
    const routes = [
        { title: 'Home', path: '/' },
        { title: 'Dashboard', path: '/' },
        { title: 'Ordenes', path: '/Order' }
    ];

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
            <ApiTable
                getApiData={getOrders}
                columns={orderTable}
                searchTerm={searchTerm}
                filterColumn={filterColumn}
                sortDirection={sortDirection}
                showActions={false} // Opcional: mostrar acciones como editar/eliminar
            />
        </>
    );
}

export default ListOrders;
