import BreadcrumbData from "../../../components/Breadcrumb"
import ApiTable from '../components/ApiTable';
import Options from "../components/Options";
import SearchFilter from '../components/SearchFilter';
import { useState } from 'react'

const Inventory = () => {
    const routes = [
        { title: 'Home', path: '/' },
        { title: 'Dashboard', path: '/' },
        { title: 'Inventory', path: '/inventory' }
      ];

    const [searchTerm, setSearchTerm] = useState<string>(''); 

    const handleSearch = (value: string) => {
        setSearchTerm(value);
    };
  return (
    <div>
        <BreadcrumbData routes={routes}/>
        <div className="col-span-2 bg-gray-50 shadow-lg my-14 p-4 rounded-md flex justify-between">
          <SearchFilter onSearch={handleSearch}/>
          <Options/>
        </div>
        <div className="mt-10">
            <ApiTable searchTerm={searchTerm}/>    
        </div>
    </div>
  )
}

export default Inventory