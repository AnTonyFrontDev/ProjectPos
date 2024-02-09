import { useState } from "react";
import { IProductsDtoAdd } from "../../../shared/interfaces/screens/preorder/ProductToAdd";
import Order from "./Order";
import SelectClients from "./SelectClients";
import { IPreOrder } from "../../../shared/interfaces/screens/preorder/IPreOrder";
import axios from "axios";

//quitar de aqui
const url = "https://localhost:7065/api/preorder/PreOrder/AddPreOrder";
const FormPreOrder = () => {
    const [productToAddList, setProductToAddList] = useState<IProductsDtoAdd[]>([]);
    const [clientId,setClientId] = useState(0);
    const clientHandler = (clientId: string) => {
        setClientId(Number(clientId));
    };

    const sendForm = ()=>{
      const preOrder : IPreOrder = {
        fkClient : clientId,
        user : 1,
        productsDtoAdds : productToAddList
      }   
      axios.post<IPreOrder>(url, preOrder)
      .then(response => {
        // Manejar la respuesta si la solicitud es exitosa
        console.log('Respuesta:', response.data);
      })
      .catch(error => {
        // Manejar el error si la solicitud falla
        console.error('Error al enviar la solicitud:', error);
      });
    }
    return (
        <form>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Client
                </label>
                {/* <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"/> */}
            </div>
            <SelectClients onClientSelect={clientHandler} />
            {/* Pasa el estado y la función de actualización al componente Order */}
            <Order productToAddList={productToAddList} setProductToAddList={setProductToAddList} />
            <button type="button" onClick={sendForm}>
          test
        </button>

        </form>
    );
};

export default FormPreOrder;