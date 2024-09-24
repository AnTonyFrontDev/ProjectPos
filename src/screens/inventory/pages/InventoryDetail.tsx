
import { useParams } from 'react-router-dom'
import Detail from '../components/DetalleInventario';
import BackButton from '@/components/Generics/BackButton';

const InventoryDetail = () => {
    const { productId } = useParams<{ productId : any}>();
    console.log(productId);
    return (
      <div>
        {/* <h1>Detalle Inventario</h1> */}
        <BackButton/>
        <Detail id={productId} />
      </div>
    );
  };
  

export default InventoryDetail