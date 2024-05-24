import Select from 'react-select';
import React, { useState } from 'react';
import { addPreOrder } from '@/shared/Api/PreOrder/PreOrderApi';
import { IPreOrder, PreOrderPostDto } from '@/shared/interfaces/Preorder/IPreOrder';
import { IProductsDtoAdd, ProductsDtoAdd } from '@/shared/interfaces/Preorder/ProductToAdd';
import useProductOptions from '@/screens/AddInventory/hooks/useProductOptions';
import useSizeOptions from '@/screens/AddInventory/hooks/useSizeOptions';
import useColorOptions from '@/screens/AddInventory/hooks/useColorOptions';
import ButtonModal from '@/components/Generics/Modal/ButtonModal';
import ViewForm from '@/components/FormularioV4/viewForm';
import useClientOptions from '@/screens/AddInventory/hooks/useClientOptions';
import { InputNumber } from 'antd';
import { FormInputsClasses, TableHeadClasses, TableSelectsClasses } from '@/shared/Common/cssComponent';


const PreOrders = () => {
  // const [formData, setFormData] = useState<IPreOrder>({
  //   fkClient: 0,
  //   dateDelivery: "",
  //   user: 1,
  //   productsDtoAdds: [],
  // });
  const [formData, setFormData] = useState<IPreOrder>(new PreOrderPostDto());

  const [tableData, setTableData] = useState<IProductsDtoAdd[]>([]);
  const { productOptions } = useProductOptions();
  const { clientOptions } = useClientOptions();

  const [disabledRows, setDisabledRows] = useState<boolean[]>(Array(tableData.length).fill(true));
  const [selectedProductId, setSelectedProductId] = useState(0);

  const { sizeOptions } = useSizeOptions(selectedProductId)
  const { colorOptions } = useColorOptions(selectedProductId);

  const handleAddRow = () => {
    const newRow: IProductsDtoAdd = {
        ...new ProductsDtoAdd()
    };
    setTableData([...tableData, newRow]);
    setDisabledRows([...disabledRows, true]);
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
      setFormData(new PreOrderPostDto);
      setTableData([]);
      setDisabledRows([]);
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

    if (fieldName == 'fkProduct') {
      setSelectedProductId(value || 0);
    }

    const updatedDisabledRows = [...disabledRows];
    updatedDisabledRows[rowIndex] = false;
    setDisabledRows(updatedDisabledRows);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | { target: { value: number | null } },
    rowIndex: number,
    fieldName: keyof IProductsDtoAdd
  ) => {
    const value = e.target.value;
    const updatedTableData = [...tableData];

    if (typeof value === 'number') {
      updatedTableData[rowIndex][fieldName] = value;
    } else if (typeof value === 'string') {
      updatedTableData[rowIndex][fieldName] = parseFloat(value);
    } else {
      updatedTableData[rowIndex][fieldName] = 0; // Default value or handle null appropriately
    }

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
      <div className='gap-4 inline-flex w-full'>
        <div className='flex flex-col w-1/4'>
          <label>Cliente:</label>
          <Select
            className={TableSelectsClasses + 'none'}
            options={clientOptions.map(client => ({
              value: client.id,
              label: `${client.f_name} ${client.l_name} ${client.f_surname} ${client.l_surname}`
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
        <div className='flex flex-col w-1/4'>
          <label className='mb-1'>Fecha de Entrega:</label>
          <input
            type="date"
            value={formData.dateDelivery || ""}
            onChange={(e) => setFormData({ ...formData, dateDelivery: e.target.value })}
            className={FormInputsClasses}
          />
        </div>
        <div className='flex flex-col items-center justify-center'>
          <button
            onClick={handleSave}
            className="bg-green-500 hover:bg-green-700 text-white font-bold mt-5 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Guardar
          </button>
        </div>
      </div>

      <table className="min-w-full divide-y divide-gray-200 mt-3">
        <thead className="bg-gray-50">
          <tr>
            <th className={TableHeadClasses}>#</th>
            <th className={TableHeadClasses}>Producto</th>
            <th className={TableHeadClasses}>Color </th>
            <th className={TableHeadClasses}>Size</th>
            <th className={TableHeadClasses}>Cantidad</th>
            <th className={TableHeadClasses}>Precio</th>
            <th className={TableHeadClasses}>Precio Total</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tableData.map((row, index) => (
            <tr key={index}>
              <td className="w-14 px-6 py-4">{index + 1}</td>
              <td>
                <div className="flex items-center">
                  <Select
                    className={TableSelectsClasses}
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
                    modalContent={<ViewForm usarForm="Product" formData={null} isUpdate={false} />}
                    iconType="plus"
                    cssColor='blue'
                  />
                </div>
              </td>
              <td>
                <Select
                  className={TableSelectsClasses}
                  isDisabled={disabledRows[index]}
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
                <div className="flex items-center">
                  <Select
                    className={TableSelectsClasses}
                    isDisabled={disabledRows[index]}
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
                    modalContent={<ViewForm usarForm="Size" formData={null} isUpdate={false} />}
                    iconType="plus"
                    cssColor='blue'
                  />
                </div>
              </td>
              <td className='w-14'>
                <InputNumber
                  min={0}
                  step={0}
                  value={row.quantity}
                  onChange={(value) => handleInputChange({ target: { value: value ?? 0 } }, index, 'quantity')}
                  disabled={disabledRows[index]}
                  className="text-md w-full py-0.5 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                />
              </td>
              <td className='w-14'>
                <InputNumber
                  min={0}
                  step={0.01}
                  value={row.customPrice}
                  onChange={(value) => handleInputChange({ target: { value: value ?? 0 } }, index, 'customPrice')}
                  disabled={disabledRows[index]}
                  className="text-md w-full py-0.5 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                />
              </td>
              <td className='w-14'>
                <input
                  type="number"
                  step="0.001"
                  min="0"
                  max="9999999.99"
                  value={(row.quantity * row.customPrice).toFixed(2)}
                  disabled
                  className="w-full px-2 py-1 rounded-md border border-gray-300 bg-gray-100 focus:outline-none"
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
