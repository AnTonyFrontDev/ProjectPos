// import React from 'react';
import { useParams } from 'react-router-dom';
import { View } from "../ViewS/Payment";
import Detail from "../ViewS/Payment/ViewDetail"; // Asegúrate de importar el componente Detail desde el archivo correcto

const Payment = () => {
  const { paymentId } = useParams<{ paymentId?: string }>();

  // Convertir el id a número si es necesario, pero ten en cuenta que el valor puede ser undefined
  const numericId = paymentId ? Number(paymentId) : undefined;

  // Verifica si numericId es un número antes de usarlo
  const isValidId = !isNaN(numericId as number);
  return (
    <div>
      Payment
      {isValidId ? <Detail/> : <View />}
    </div>
  );
}

export default Payment;
