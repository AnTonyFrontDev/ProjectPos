import DOptions from '../components/DOptions';


const Dashboard = () => {

  return (
    <>
      <DOptions/>
    <div className="grid grid-cols-4 gap-8">
      <div className="col-span-4 bg-gray-50 shadow-lg p-4 rounded-md">
        <div className="bg-gray-100 ">
          <div className="flex justify-between bg-white p-4 shadow-md">
            <h1 className="text-2xl font-bold">Pedidos Recientes</h1>
            <div className="flex items-center space-x-4">
              {/* Puedes agregar elementos de navegación o notificaciones aquí */}
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Inventario Faltante</button>
              <button className="bg-green-500 text-white px-4 py-2 rounded-md">Ordenes</button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            <div className="bg-white flex p-4 shadow-md rounded-md">
              Listado De Pedidos
             </div>
          </div>
        </div>
      </div>

    </div>
    </>
  )
}

export default Dashboard