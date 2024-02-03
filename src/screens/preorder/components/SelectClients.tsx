// // import { Modal } from "antd";
import { useState } from "react";
import { IClientGet } from "@/shared/interfaces/Client/IClientGet";
import { CustomersFilterApi } from "@/shared/Api/Customers/customersApiFilter";

//controlador de filtros
const filterController: CustomersFilterApi = new CustomersFilterApi();

const SelectClients = (props: { onClientSelect : (clientId : string) => void  }) => {
    //handler del select de clientes
  const handleClientSelect = (event : React.ChangeEvent<HTMLSelectElement>) =>{
    const clientId = event.target.value;
    props.onClientSelect(clientId);
  }
  //estado para la opcion seleccionada
  const [selectedOption, setSelectedOption] = useState("fullName");
  //estado para el filtro
  const [filter, setFilter] = useState("");
  //estado para los clientes
  const [clients, setClients] = useState<IClientGet[]>([]);
  //handler para manejar sobre que tipo vamos a filtrar 
  const changeOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };
  //handler del input para filtrar
  const changeInputFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
}

  const handleFilter = async () => {
    
    const list = await filterController.filterBy(selectedOption, filter);
    setClients(list);
    
  };
  return (
    <div>
      <h2>Valor actual {selectedOption}</h2>
      <select value={selectedOption} onChange={changeOption}>
        <option value="fullName" defaultValue={"fullName"}>
          Nombre completo
        </option>
        <option value="rnc">RNC</option>
        <option value="cedula">Cedula</option>
      </select>
      <input type="text" value={filter} onChange={changeInputFilter}/>
      <button onClick={handleFilter} type="button">
        Filtrar
      </button>

      {clients.length > 0 && (
        <select onChange={handleClientSelect} > 
        <option value="" hidden>Selecciona una opción </option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.f_name} {client.l_name}
            </option>
          ))}
        </select>
      )}

      {/* {props.clients.map(client =>(
           

        ))} */}
    </div>
  );
};

export default SelectClients;
