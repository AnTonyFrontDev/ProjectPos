import Select from 'react-select';
import React, { useState } from 'react';
import { addPreOrder } from '@/shared/Api/PreOrder/PreOrderApi';
import { IPreOrder } from '@/shared/interfaces/Preorder/IPreOrder';
import { IProductsDtoAdd } from '@/shared/interfaces/Preorder/ProductToAdd';
import useProductOptions from '@/screens/AddInventory/hooks/useProductOptions';
import useSizeOptions from '@/screens/AddInventory/hooks/useSizeOptions';
import useColorOptions from '@/screens/AddInventory/hooks/useColorOptions';
import ButtonModal from '@/components/Modal/ButtonModal';
import ViewForm from '@/components/FormularioV4/viewForm';
import useClientOptions from '@/screens/AddInventory/hooks/useClientOptions';

const tableHeadClasses = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider";
const tableSelectsClasses = "block w-full py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm";
// const formInputsClasses = "px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500";

const PreOrders = () => {
  const [formData, setFormData] = useState<IPreOrder>({
    fkClient: 0,
    user: 1,
    productsDtoAdds: [],
  });

  const [tableData, setTableData] = useState<IProductsDtoAdd[]>([]);
  const { productOptions } = useProductOptions();
  const { sizeOptions } = useSizeOptions();
  const { colorOptions } = useColorOptions();
  const { clientOptions } = useClientOptions();

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  const handleAddRow = () => {
    const newRow: IProductsDtoAdd = {
      fkProduct: 0,
      fkSize: 0,
      quantity: 0,
      fkColorPrimary: 0,
      fkColorSecondary: 0,
      user: 1
    };
    setTableData([...tableData, newRow]);
  };

  const handleSave = async () => {
    if (!formData.fkClient || !tableData.length) {
      alert('Por favor completa todos los campos.');
      return;
    }

    try {
      const formDataWithProducts = {
        ...formData,
        productsDtoAdds: tableData,
      };
      await addPreOrder(formDataWithProducts);
      // Limpiar el formulario después de guardar
      setFormData({
        fkClient: 0,
        user: 0,
        productsDtoAdds: [{
          fkProduct: 0,
          fkSize: 0,
          quantity: 0,
          fkColorPrimary: 0,
          fkColorSecondary: 0,
          user: 1
        }]
      });
      setTableData([]);
      alert('Pedido guardado exitosamente');
    } catch (error) {
      console.error('Error al guardar el pedido:', error);
      alert('Error al guardar el pedido. Por favor, inténtalo de nuevo.');
    }
    handleTest();
  };

  const handleTest = () => {
    // Añadir los detalles del inventario al formData antes de mostrarlo en la consola
    const formDataWithDetails = {
      ...formData,
      productsDtoAdds: tableData,
    };
    console.log(formDataWithDetails);
  };

  const handleSelectChange = (value: number, rowIndex: number, fieldName: keyof IProductsDtoAdd) => {
    const updatedTableData = [...tableData];
    updatedTableData[rowIndex][fieldName] = value;
    setTableData(updatedTableData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, rowIndex: number, fieldName: keyof IProductsDtoAdd) => {
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
      <h1 className="text-2xl font-bold mb-4">Agregar Pedido</h1>
      <div className='flex gap-4 items-center'>
        <div className='flex flex-col '>
          <label>Cliente:</label>
        </div>
        <div className='flex flex-col w-1/3'> 
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
        <div className='flex'>
          <button
            onClick={handleSave}
            className="bg-green-500 hover:bg-green-700 text-white font-bold mx-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
            <th className={tableHeadClasses}>Size</th>
            <th className={tableHeadClasses}>Cantidad</th>
            <th className={tableHeadClasses}>Color 1</th>
            <th className={tableHeadClasses}>Color 2</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tableData.map((row, index) => (
            <tr key={index}>
              <td className="w-14 px-6 py-4">{index + 1}</td>
              <td>
                <div className="flex items-center">
                  <Select
                    className={tableSelectsClasses}
                    options={productOptions.map(product => ({
                      value: product.id,
                      label: product.name_prod
                    }))}
                    value={{
                      value: productOptions.find(product => product.id === row.fkProduct)?.id || 0,
                      label: productOptions.find(product => product.id === row.fkProduct)?.name_prod || ""
                    }}
                    onChange={(selectedOption) => handleSelectChange(selectedOption?.value || 0, index, 'fkProduct')}
                    isSearchable
                  />

                  <ButtonModal
                    buttonText=""
                    modalTitle=""
                    tooltipTitle="Agregar Producto"
                    size={16}
                    modalContent={<ViewForm usarForm="Product" />}
                    iconType="plus"
                    cssColor='blue'
                  />
                </div>
              </td>
              <td>
                <div className="flex items-center">
                  <Select
                    className={tableSelectsClasses}
                    options={sizeOptions.map(size => ({
                      value: size.id,
                      label: size.size + " - " + size.category
                    }))}
                    value={{
                      value: sizeOptions.find(size => size.id === row.fkSize)?.id || 0,
                      label: `${sizeOptions.find(size => size.id === row.fkSize)?.size || ""} - 
                                        ${sizeOptions.find(size => size.id === row.fkSize)?.category || ""}`
                    }}
                    onChange={(selectedOption) => handleSelectChange(selectedOption?.value || 0, index, 'fkSize')}
                    isSearchable

                  />

                  <ButtonModal
                    buttonText=""
                    modalTitle=""
                    tooltipTitle="Agregar Size"
                    size={16}
                    modalContent={<ViewForm usarForm="Size" />}
                    iconType="plus"
                    cssColor='blue'
                  />
                </div>
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
              <td>
                <Select
                  className={tableSelectsClasses}
                  options={colorOptions.map(color => ({
                    value: color.id,
                    label: `${color.colorname} - ${color.code}`
                  }))}
                  value={{
                    value: colorOptions.find(color => color.id === row.fkColorPrimary)?.id || 0,
                    label: `${colorOptions.find(color => color.id === row.fkColorPrimary)?.colorname || ""}
                     - ${colorOptions.find(color => color.id === row.fkColorPrimary)?.code || ""}`
                  }}
                  onChange={(selectedOption) => handleSelectChange(selectedOption?.value || 0, index, 'fkColorPrimary')}
                  isSearchable
                />

              </td>
              <td>
                <Select
                  className={tableSelectsClasses}
                  options={colorOptions.map(color => ({
                    value: color.id,
                    label: `${color.colorname} - ${color.code}`
                  }))}
                  value={{
                    value: colorOptions.find(color => color.id === row.fkColorSecondary)?.id || 0,
                    label: `${colorOptions.find(color => color.id === row.fkColorSecondary)?.colorname || ""} - 
                                        ${colorOptions.find(color => color.id === row.fkColorSecondary)?.code || ""}`
                  }}
                  onChange={(selectedOption) => handleSelectChange(selectedOption?.value || 0, index, 'fkColorSecondary')}
                  isSearchable
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

export default PreOrders;
