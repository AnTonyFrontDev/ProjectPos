// import React from 'react';
import { useParams } from 'react-router-dom';
import { View } from "../ViewS/NoteCredit";
import Detail from "../ViewS/NoteCredit/ViewDetail"; // Asegúrate de importar el componente Detail desde el archivo correcto

const NoteCredit = () => {
  const { notecreditId } = useParams<{ notecreditId?: string }>();

  // Convertir el id a número si es necesario, pero ten en cuenta que el valor puede ser undefined
  const numericId = notecreditId ? Number(notecreditId) : undefined;

  // Verifica si numericId es un número antes de usarlo
  const isValidId = !isNaN(numericId as number);
  console.log('id',notecreditId);
  console.log('isValidId',isValidId);
  console.log('numericId',numericId);
  return (
    <div>
      Nota de credito
      {isValidId ? <Detail/> : <View />}
    </div>
  );
}

export default NoteCredit;
