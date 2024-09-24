
import { useParams } from 'react-router-dom'
import Detail from '../components/DetalleCompra';

const BuyDetail = () => {
    const { id } = useParams<{ id : any}>();
    console.log(id);
    return (
      <div>
        <Detail id={id} />
      </div>
    );
  };
  

export default BuyDetail