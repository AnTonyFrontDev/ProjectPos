
import { useParams } from 'react-router-dom'
import Detail from '../components/DetalleCliente';

const InventoryDetail = () => {
    const { clientId } = useParams<{ clientId : any}>();
    console.log(clientId);
    return (
      <div>
        <h1>Detalle Cliente</h1>
        <Detail id={clientId} />
      </div>
    );
  };
  

export default InventoryDetail