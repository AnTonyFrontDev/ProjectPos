// import React from 'react';
import { useParams } from 'react-router-dom';
import BackButton from "@/components/Generics/BackButton";
import { View } from "../ViewS/NoteCredit";
import Detail from "../ViewS/NoteCredit/ViewDetail"; // Asegúrate de importar correctamente

const NoteCredit = () => {
  const { notecreditId } = useParams<{ notecreditId?: string }>();

  // Convertir el id a número si es necesario
  const numericId = notecreditId ? Number(notecreditId) : undefined;

  // Verifica si numericId es un número válido
  const isValidId = !isNaN(numericId as number);

  return (
    <div>
      <div className="flex items-center space-x-4 mb-4">
        <BackButton />
        <h2 className="text-2xl font-semibold text-gray-800">
          Nota de Crédito
        </h2>
      </div>
      {isValidId ? <Detail /> : <View />}
    </div>
  );
}

export default NoteCredit;
