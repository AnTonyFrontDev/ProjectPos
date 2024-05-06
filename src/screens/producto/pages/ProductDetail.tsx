
import { useParams } from 'react-router-dom'
import Detail from '../components/DetalleProducto';
import ProductColorAdd from '../components/ProductColorAdd';

const ProductDetail = () => {
    const { productId } = useParams<{ productId : any}>();
    console.log(productId);
    return (
      <div>
        <Detail Id={productId} />
        <ProductColorAdd productId={productId}/>
       
      </div>
    );
  };
  

export default ProductDetail