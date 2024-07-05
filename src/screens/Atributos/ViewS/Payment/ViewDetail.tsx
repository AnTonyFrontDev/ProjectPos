import { useParams } from 'react-router-dom';
import Detail from './components/PaymentDetail';

const PaymentDetail = () => {
  const { paymentId } = useParams<{ paymentId?: string }>();

  // Convierte paymentId a un número
  const numericPaymentId = paymentId ? Number(paymentId) : undefined;

  // Verifica si numericPaymentId es un número válido antes de pasar al componente Detail
  if (isNaN(numericPaymentId as number)) {
    return <div>ID de pago no válido</div>;
  }

  return (
    <div>
      <Detail Id={numericPaymentId as number} />
    </div>
  );
};

export default PaymentDetail;
