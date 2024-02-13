import React, { useEffect, useState } from 'react';
import { Descriptions } from 'antd';
// import { as DetalleClienteProps } from '@/shared/interfaces/I_cliente';
import { getClientById } from '@/shared/Api/Customers/CustomersApi';
import { DetalleProps as DetalleClienteProps } from '../../../shared/interfaces/I_inventario';

const DetalleCliente: React.FC<DetalleClienteProps> = ({ Id: clientId }) => {
  const [detalleCliente, setDetalleCliente] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clienteData = await getClientById(clientId);
        setDetalleCliente(clienteData);
        console.log(clienteData);
      } catch (error) {
        console.error('Error al obtener detalle del cliente:', error);
      }
    };

    fetchData();
  }, [clientId]);

  if (!detalleCliente) {
    return <div>Cargando...</div>;
  }

  const { f_name, l_name, f_surname, l_surname, rnc, dni, phones } = detalleCliente;

  return (
    <div className="my-8">
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
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-4 rounded">
          Editar
        </button>
        {/* Botón para eliminar */}
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Eliminar
        </button>
      </div>
    </div>

  );
};

export default DetalleCliente;
