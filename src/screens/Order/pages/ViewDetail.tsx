
import { useParams } from 'react-router-dom'
import Detail from '../components/OrderDetail';

const ProductDetail = () => {
    const { orderId } = useParams<{ orderId : any}>();
    console.log(orderId);
    return (
      <div>
        <h1>Detalle de Orden</h1>
        <Detail id={orderId} />
      </div>
    );
  };
  

export default ProductDetail