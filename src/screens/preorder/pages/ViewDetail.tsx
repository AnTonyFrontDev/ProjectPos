
import { useParams } from 'react-router-dom'
import Detail from '../components/PreOrderDetail';

const ProductDetail = () => {
    const { preorderId } = useParams<{ preorderId : any}>();
    console.log(preorderId);
    return (
      <div>
        <h1>Detalle Pedido</h1>
        <Detail Id={preorderId} />
      </div>
    );
  };
  

export default ProductDetail