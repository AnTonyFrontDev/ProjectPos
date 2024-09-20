import { useParams } from 'react-router-dom';
import Detail from './components/NoteCreditDetail';

const NoteCreditDetail = () => {
  const { notecreditId } = useParams<{ notecreditId?: string }>();

  // Convierte paymentId a un número
  const numericNCreditId = notecreditId ? Number(notecreditId) : undefined;

  // Verifica si numericPaymentId es un número válido antes de pasar al componente Detail
  if (isNaN(numericNCreditId as number)) {
    return <div>ID de Nota de credito no válido</div>;
  }

  return (
    <div>
      <Detail id={numericNCreditId as number} />
    </div>
  );
};

export default NoteCreditDetail;
