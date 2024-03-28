import React, { useState } from 'react';
import Select from 'react-select';
import { IOrderPost, IOrderProduct } from '@/shared/interfaces/order/IOrderPost';
import ButtonModal from '@/components/Modal/ButtonModal';
import ViewForm from '@/components/FormularioV4/viewForm';
import { SaveOrder } from '@/shared/Api/Order/OrderApi';
import useColorOptions from '@/screens/AddInventory/hooks/useColorOptions';
import useClientOptions from '@/screens/AddInventory/hooks/useClientOptions';
import usePreOrderOptions from '@/screens/AddInventory/hooks/usePreOrderOptions';


const tableHeadClasses = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider";
const tableSelectsClasses = "block w-full py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm";
const formInputsClasses = "px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500";

const AddOrder = () => {
  const [formData, setFormData] = useState<IOrderPost>({
    id: 0,
    user: 1,
    date: new Date().toISOString(),
    fkClient: 0,
    fkUser: 0,
    checked: true,
    fkPreOrder: 0,
    descriptionJob: "",
    products: [],
  });
  const [tableData, setTableData] = useState<IOrderProduct[]>([]);
  const { PreOrderOptions } = usePreOrderOptions();
  const { clientOptions } = useClientOptions();
  const { colorOptions } = useColorOptions();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddRow = () => {
    const newRow: IOrderProduct = {
      fkOrder: formData.id,
      fkInventoryColor: 0,
      quantity: 0,
    };
    setTableData([...tableData, newRow]);
  };

  const handleSave = async () => {
    // if (!formData.fkClient || !formData.descriptionJob || !tableData.length) {
    //   alert('Por favor completa todos los campos.');
    //   return;
    // }

    try {
      const formDataWithProducts = {
        ...formData,
        products: tableData,
      };
      await AddOrder(formDataWithProducts);
      setFormData({
        id: 0,
        user: 1,
        date: new Date().toISOString(),
        fkClient: 0,
        fkUser: 0,
        checked: true,
        fkPreOrder: 0,
        descriptionJob: "",
        products: [],
      });
      setTableData([]);
      alert('Orden guardada exitosamente');
    } catch (error) {
      console.error('Error al guardar la orden:', error);
      alert('Error al guardar la orden. Por favor, inténtalo de nuevo.');
    }
  };

  const handleSelectChange = (value: number, rowIndex: number, fieldName: keyof IOrderProduct) => {
    const updatedTableData = [...tableData];
    updatedTableData[rowIndex][fieldName] = value;
    setTableData(updatedTableData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, rowIndex: number, fieldName: keyof IOrderProduct) => {
    const { value } = e.target;
    const updatedTableData = [...tableData];
    updatedTableData[rowIndex][fieldName] = parseInt(value, 10);
    setTableData(updatedTableData);
  };

  const handleChangeClient = (value: number) => {
    setFormData({
      ...formData,
      fkClient: value
    });
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Agregar Orden</h1>
      <div className='flex gap-4'>
        <div className='flex flex-col'>
          <label className='mb-1'>Cliente:</label>
          <Select
            className={tableSelectsClasses}
            options={clientOptions.map(client => ({
              value: client.id,
              label: client.f_name +" "+client.l_name + " " + client.f_surname +" "+client.l_surname
            }))}
            value={{
              value: clientOptions.find(client => client.id === formData.fkClient)?.id || 0,
              label: `${clientOptions.find(client => client.id === formData.fkClient)?.f_name || ""} 
               ${clientOptions.find(client => client.id === formData.fkClient)?.l_name || ""}
               ${clientOptions.find(client => client.id === formData.fkClient)?.f_surname || ""}
               ${clientOptions.find(client => client.id === formData.fkClient)?.l_surname || ""}`
            }}
            onChange={(selectedOption) => handleChangeClient(selectedOption?.value || 0)}
            isSearchable
          />
        </div>
        <div className='flex flex-col'>
          <label>Pedido:</label>
          <Select
            className={tableSelectsClasses}
            options={clientOptions.map(client => ({
              value: client.id,
              label: client.f_name +" "+client.l_name + " " + client.f_surname +" "+client.l_surname
            }))}
            value={{
              value: clientOptions.find(client => client.id === formData.fkClient)?.id || 0,
              label: `${clientOptions.find(client => client.id === formData.fkClient)?.f_name || ""} 
               ${clientOptions.find(client => client.id === formData.fkClient)?.l_name || ""}
               ${clientOptions.find(client => client.id === formData.fkClient)?.f_surname || ""}
               ${clientOptions.find(client => client.id === formData.fkClient)?.l_surname || ""}`
            }}
            onChange={(selectedOption) => handleChangeClient(selectedOption?.value || 0)}
            isSearchable
          />
        </div>
        <div className='flex flex-col'>
          <label>Descripcion:</label>
          <input type="text" name="descriptionJob" value={formData.descriptionJob} onChange={handleChange}
            className={formInputsClasses} />
        </div>
        <div className='flex'>
          <button
            onClick={handleSave}
            className="bg-green-500 hover:bg-green-700 text-white font-bold mx-2 mt-5 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Guardar
          </button>
        </div>
      </div>

      <table className="min-w-full divide-y divide-gray-200 mt-3">
        <thead className="bg-gray-50">
          <tr>
            <th className={tableHeadClasses}>#</th>
            <th className={tableHeadClasses}>Producto</th>
            <th className={tableHeadClasses}>Cantidad</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tableData.map((row, index) => (
            <tr key={index}>
              <td className="w-14 px-6 py-4">{index + 1}</td>
              <td>
                
              </td>
              <td className='w-14'>
                <input
                  type="number"
                  value={row.quantity}
                  onChange={(e) => handleInputChange(e, index, 'quantity')}
                  className="w-full px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                  min="0"

                />
              </td>
            </tr>
          ))}
          <tr>
            <td className="px-2 py-2">
              <button
                onClick={handleAddRow}
                className="bg-green-500 hover:bg-green-700 text-white font-bold mx-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                +
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AddOrder;