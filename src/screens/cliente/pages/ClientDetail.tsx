
import { useParams } from 'react-router-dom'
import Detail from '../components/DetalleCliente';
import BackButton from '@/components/Generics/BackButton';

const InventoryDetail = () => {
  const { clientId } = useParams<{ clientId: any }>();
  console.log(clientId);
  return (
    <div>
      <div className="flex items-center space-x-4 mb-4">
        <BackButton />
        <h2 className="text-2xl font-semibold text-gray-800">
          Detalle Cliente
        </h2>
      </div>
      <Detail id={clientId} />
    </div>
  );
};


export default InventoryDetail