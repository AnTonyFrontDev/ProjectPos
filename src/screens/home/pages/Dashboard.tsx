// Componente Dashboard
import DOptions from '../components/DOptions';
import ListPreOrder from '@/screens/preorder/pages/ListPreOrder';

const Dashboard = () => {


  return (
<>
  <div className="grid grid-cols-6 gap-4">
    {/* Primera columna más ancha */}
    <div className="col-span-5 bg-gray-50 shadow-lg p-4 rounded-md">
      <div className="bg-gray-100">
        <div className="flex justify-between bg-white p-4 shadow-md">
          <h1 className="text-2xl font-bold">Pedidos Recientes</h1>
          <div className="flex items-center space-x-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Inventario Faltante
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded-md">
              Ordenes
            </button>
          </div>
        </div>
        <div className="grid gap-4 p-4">
          <ListPreOrder onlyData={true} />
        </div>
      </div>
    </div>

    {/* Segunda columna más fina */}
    <div className="col-span-1 max-h-[87vh] overflow-auto">
      <DOptions />
    </div>
  </div>
</>

  );
};

export default Dashboard;