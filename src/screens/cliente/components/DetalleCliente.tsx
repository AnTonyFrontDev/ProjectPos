import React, { useEffect, useState } from 'react';
import { Descriptions, Modal } from 'antd';
import { getClientById, RemoveClient } from '@/shared/Api/CustomersApi';
import ButtonModal from '../../../components/Generics/Modal/ButtonModal';
import ViewForm from '../../../components/FormularioV4/viewForm';
import { IClient } from '@/shared/interfaces/IClient';

const DetalleCliente: React.FC<IClient> = ({ id: clientId}) => {
  const [detalleCliente, setDetalleCliente] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!clientId) {
          return;
        }
        const clienteData = await getClientById(clientId);
        setDetalleCliente(clienteData);
        console.log(clienteData);
      } catch (error) {
        console.error('Error al obtener detalle del cliente:', error);
      }
    };

    fetchData();
  }, [clientId]);

  const handleRemoveClient = async () => {
    const clientData : IClient = {
      id: clientId,
      user: 1,
    };
    try {
      if (!clientData.id) {
        return;
      }
      const response = await RemoveClient(clientData);
      window.location.href = '/customers';
      console.log('Client removed successfully:', response);
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  const showConfirm = () => {
    Modal.confirm({
        title: 'Confirmar',
        content: '¿Está seguro de que desea eliminar este registro?',
        okText: 'Sí',
        okType: 'danger',
        cancelText: 'No',
        onOk: handleRemoveClient,
    });
};

  if (!detalleCliente) {
    return <div>Cargando...</div>;
  }

  const { f_name, l_name, f_surname, l_surname, rnc, dni, phones } = detalleCliente;

  return (
    <div className="my-8">
      {errorMessage && <p className="text-red-500 w-full">{errorMessage}</p>}
      <h1 className="text-3xl font-bold mb-4">{`${f_name} ${l_name} ${f_surname} ${l_surname}`}</h1>
      <Descriptions title='Detalles del Cliente' className="mb-4">
        <Descriptions.Item label="RNC">{rnc}</Descriptions.Item>
        <Descriptions.Item label="DNI">{dni}</Descriptions.Item>
        {/* Puedes mostrar los detalles de teléfonos aquí si es necesario */}
        {phones && phones.length > 0 && (
          <Descriptions.Item label="Teléfonos">
            {phones.map((phone: any) => (
              <div key={phone.id}>{`${phone.type}: ${phone.number}`}</div>
            ))}
          </Descriptions.Item>
        )}
      </Descriptions>

      <div className="flex mt-4">
        {/* Botón para editar */}
        <ButtonModal
          buttonText="Editar"
          modalTitle=""
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded'
          size={15}
          modalContent={<ViewForm usarForm="Client" formData={detalleCliente} isUpdate={true} updateData={detalleCliente} />}
        />
        {/* Botón para eliminar */}
        <button
          onClick={showConfirm}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Eliminar
        </button>
      </div>
    </div>

  );
};

export default DetalleCliente;
