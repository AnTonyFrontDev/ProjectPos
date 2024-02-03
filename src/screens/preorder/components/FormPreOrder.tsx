import Order from "./Order";
import SelectClients from "./SelectClients";

const FormPreOrder = () => {
  //obtener el id del cliente
  const clientHandler = (clientId: string) => {
    console.log(clientId);
  };  

  return (
    <form>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Client
        </label>
        {/* <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"/> */}
      </div>
      <SelectClients onClientSelect={clientHandler} />
      <Order/>
    </form>
  );
};

export default FormPreOrder;
