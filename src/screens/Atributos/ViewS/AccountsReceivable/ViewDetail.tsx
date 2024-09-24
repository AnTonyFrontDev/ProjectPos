import { useParams } from 'react-router-dom';
import Detail from './components/AReceivableDetail';

const AReceivableDetail = () => {
  const { accountId } = useParams<{ accountId?: string }>();

  // Convierte paymentId a un número
  const numericAcccountId = accountId ? Number(accountId) : undefined;

  // Verifica si numericPaymentId es un número válido antes de pasar al componente Detail
  if (isNaN(numericAcccountId as number)) {
    return <div>ID de pago no válido</div>;
  }

  return (
    <div>
      <Detail id={numericAcccountId as number} />
    </div>
  );
};

export default AReceivableDetail;
