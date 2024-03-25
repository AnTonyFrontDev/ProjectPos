import React, { useState } from 'react';
import { Select, Input, Button } from 'antd';
import { IClientGet } from '@/shared/interfaces/Client/IClientGet';
import { CustomersFilterApi } from '@/shared/Api/Customers/customersApiFilter';

const { Option } = Select;
const filterController: CustomersFilterApi = new CustomersFilterApi();

const SelectClients = (props: { onClientSelect: (clientId: string) => void }) => {
  const [selectedOption, setSelectedOption] = useState('fullName');
  const [filter, setFilter] = useState('');
  const [clients, setClients] = useState<IClientGet[]>([]);

  const changeOption = (value: string) => {
    setSelectedOption(value);
  };

  const changeInputFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const handleFilter = async () => {
    const list = await filterController.filterBy(selectedOption, filter);
    setClients(list);
  };

  const handleClientSelect = (value: string) => {
    props.onClientSelect(value);
  };

  return (
    <div>
      <h2>Valor actual {selectedOption}</h2>
      <Select value={selectedOption} onChange={changeOption} style={{ width: 190, marginRight: 8 }}>
        <Option value="fullName">Nombre completo</Option>
        <Option value="rnc">RNC</Option>
        <Option value="cedula">Cedula</Option>
      </Select>
      <Input
        type="text"
        value={filter}
        onChange={changeInputFilter}
        style={{ width: 200, marginRight: 8 }}
        placeholder={`Filtrar por ${selectedOption}`}
      />
      <Button type="default" onClick={handleFilter} style={{ marginRight: 8 }}>
        Filtrar
      </Button>

      {clients.length > 0 && (
        <Select onChange={handleClientSelect} style={{ width: 200 }}>
          <Option value="" hidden>
            Selecciona una opción
          </Option>
          {clients.map((client) => (
            <Option key={client.id} value={client.id}>
              {`${client.f_name} ${client.l_name}`}
            </Option>
          ))}
        </Select>
      )}
    </div>
  );
};

export default SelectClients;
