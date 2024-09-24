// import React from 'react';
import { useParams } from 'react-router-dom';
import BackButton from "@/components/Generics/BackButton";
import { View } from "../ViewS/Payment";
import Detail from "../ViewS/Payment/ViewDetail"; // Asegúrate de importar correctamente

const Payment = () => {
  const { paymentId } = useParams<{ paymentId?: string }>();

  // Convertir el id a número si es necesario
  const numericId = paymentId ? Number(paymentId) : undefined;

  // Verifica si numericId es un número válido
  const isValidId = !isNaN(numericId as number);

  return (
    <div>
      <div className="flex items-center space-x-4 mb-4">
        <BackButton />
        <h2 className="text-2xl font-semibold text-gray-800">
          Payment
        </h2>
      </div>
      {isValidId ? <Detail /> : <View />}
    </div>
  );
}

export default Payment;
