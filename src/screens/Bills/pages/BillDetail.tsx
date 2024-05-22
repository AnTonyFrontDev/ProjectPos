
import { useParams } from 'react-router-dom'
import Detail from '../components/Detail';

const ProductDetail = () => {
    const { billId } = useParams<{ billId : any}>();
    return (
      <div>
        <Detail Id={billId} />
       
      </div>
    );
  };
  

export default ProductDetail