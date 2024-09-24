
import { useParams } from 'react-router-dom'
import Detail from '../components/PreOrderDetail';
import BackButton from '@/components/Generics/BackButton';

const PreOrderDetail = () => {
  const { preorderId } = useParams<{ preorderId: any }>();
  console.log(preorderId);
  return (
    <div>
      <div className="flex items-center space-x-4 mb-4">
        <BackButton />
        <h2 className="text-2xl font-semibold text-gray-800">
          Detalle Pedido
        </h2>
      </div>
      <Detail id={preorderId} />
    </div>
  );
};


export default PreOrderDetail