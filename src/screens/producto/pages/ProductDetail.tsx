
import { useParams } from 'react-router-dom'
import Detail from '../components/DetalleProducto';

const ProductDetail = () => {
    const { productId } = useParams<{ productId : any}>();
    console.log(productId);
    return (
      <div>
        <h1>Detalle Cliente</h1>
        <Detail Id={productId} />
      </div>
    );
  };
  

export default ProductDetail