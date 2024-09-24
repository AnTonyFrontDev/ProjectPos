
import { useParams } from 'react-router-dom'
import Detail from '../components/OrderDetail';
import BackButton from '@/components/Generics/BackButton';

const ProductDetail = () => {
  const { orderId } = useParams<{ orderId: any }>();
  console.log(orderId);
  return (
    <div>
      <div className="flex items-center space-x-4 mb-4">
        <BackButton />
        <h2 className="text-2xl font-semibold text-gray-800">
          Detalle de Orden
        </h2>
      </div>
      <Detail id={orderId} />
    </div>
  );
};


export default ProductDetail