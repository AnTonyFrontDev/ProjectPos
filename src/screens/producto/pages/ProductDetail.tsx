
import { useParams } from 'react-router-dom'
import Detail from '../components/DetalleProducto';

const ProductDetail = () => {
    const { productId } = useParams<{ productId : any}>();
    return (
      <div>
        <Detail id={productId} />
      </div>
    );
  };
  

export default ProductDetail