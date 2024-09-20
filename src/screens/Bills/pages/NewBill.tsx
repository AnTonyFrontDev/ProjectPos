
import { useParams } from 'react-router-dom'
import NewBillComponents from '../components/NewBillComponents';

const NewBill = () => {
    const { preOrderId } = useParams<{ preOrderId : any}>();
    return (
      <div>
        <NewBillComponents id={preOrderId} />
       
      </div>
    );
  };
  

export default NewBill