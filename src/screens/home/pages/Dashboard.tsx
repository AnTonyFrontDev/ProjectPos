import { Example1, Example2, Example3, Example5 } from '../components/example';
// import ViewForm from '../../../components/FormularioV4/viewForm.tsx'
// import ViewForm from '../../../components/FormularioV4/viewForm';
// import ButtonModal from '../../../components/Modal/ButtonModal';
import ApiTable from '../../../components/Tabla/apiTable'
// import Options from "../components/Options";
// import SearchFilter from '../components/SearchFilter';
// import { useState } from 'react'
// import { getInventory } from "../../../shared/Api/InventoryApi";
import { productTable } from "../../../components/Tabla/tData";
// import DetalleProducto from "../components/DetalleInventario";
import { getProducts } from "../../../shared/Api/ProductsApi";


const Dashboard = () => {

  return (
    <div className="grid grid-cols-4 gap-8">
      {/* Div 1 */}
      <div className="col-span-2 bg-gray-50 shadow-lg p-4 rounded-md">
        <Example1/>
      </div>

      {/* Div 2 */}
      <div className="col-span-2 bg-gray-50 shadow-lg p-4 rounded-md flex justify-center">
        <Example2/>
      </div>

      {/* Div 3 */}
      <div className="col-span-1 bg-gray-50 shadow-lg p-4 rounded-md flex justify-center">
        <Example3/>
      </div>

      {/* Div 4 */}
      <div className="col-span-2 bg-gray-50 shadow-lg p-4 rounded-md flex justify-between">
        <Example5/>
        <Example5/>
      </div>

      {/* Div 5 */}
      <div className="bg-gray-50 shadow-lg p-4 rounded-md flex justify-center">
        {/* Contenido del quinto div */}
        <Example5/>
      </div>

      {/* Div 5 */}
      <div className="col-span-4 bg-gray-50 shadow-lg p-4 rounded-md">
      <ApiTable
          getApiData={getProducts}
          columns={productTable}
          // searchTerm={searchTerm}
          // filterColumn={filterColumn}
          // sortDirection={sortDirection}
          // handleTableRowClick={handleTableRowClick}
        />
    
      </div>
    </div>
  )
}

export default Dashboard