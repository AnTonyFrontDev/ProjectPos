import { Example1, Example2 } from '../components/example';
import { Progress } from 'antd';


const Dashboard = () => {

  return (
    <div className="grid grid-cols-4 gap-8">
      {/* Div 1 */}
      <div className="col-span-2 bg-gray-50 shadow-lg p-4 rounded-md">
        <Example1 />
      </div>

      {/* Div 2 */}
      <div className="col-span-2 bg-gray-50 shadow-lg p-4 rounded-md flex justify-center">
        <Example2 />
      </div>

      <div className="col-span-4 bg-gray-50 shadow-lg p-4 rounded-md">
        <div className="bg-gray-100 ">
          <div className="flex justify-between bg-white p-4 shadow-md">
            <h1 className="text-2xl font-bold">Sistema de Inventario</h1>
            <div className="flex items-center space-x-4">
              {/* Puedes agregar elementos de navegación o notificaciones aquí */}
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Notificaciones</button>
              <button className="bg-green-500 text-white px-4 py-2 rounded-md">Configuración</button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {/* Aquí puedes colocar componentes para mostrar información del inventario */}
            <div className="bg-white flex p-4 shadow-md rounded-md">
              <div className='mr-8'>
                <h2 className="text-lg font-bold mb-4">Productos</h2>
                <p>Total: 100</p>
                <p>En stock: 80</p>
              </div>
              <Progress type="circle" percent={30} size={80} />
              {/* Puedes agregar más detalles según sea necesario */}
            </div>
            <div className="bg-white p-4 shadow-md rounded-md">
              <h2 className="text-lg font-bold mb-4">Categorías</h2>
              <p>Total: 10</p>
              {/* Puedes agregar más detalles según sea necesario */}
            </div>
            {/* Agrega más bloques según las secciones de tu sistema de inventario */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard