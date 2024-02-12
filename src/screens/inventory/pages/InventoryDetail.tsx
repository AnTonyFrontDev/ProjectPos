
import { useParams } from 'react-router-dom'
import Detail from '../components/DetalleInventario';

const InventoryDetail = () => {
    const { productId } = useParams<{ productId : any}>();
    console.log(productId);
    return (
      <div>
        <h1>Detalle Inventario</h1>
        <Detail productId={productId} />
      </div>
    );
  };
  

export default InventoryDetail