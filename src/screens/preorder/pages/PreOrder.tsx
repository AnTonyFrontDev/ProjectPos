import Select from 'react-select';
import React, { useEffect, useState } from 'react';
import { addPreOrder } from '@/shared/Api/PreOrderApi';
import { IPreOrder, PreOrderPostDto } from '@/shared/interfaces/IPreOrder';
import useProductOptions from '@/screens/AddInventory/hooks/useProductOptions';
import useSizeOptions from '@/screens/AddInventory/hooks/useSizeOptions';
import useColorOptions from '@/screens/AddInventory/hooks/useColorOptions';
// import ButtonModal from '@/components/Generics/Modal/ButtonModal';
// import ViewForm from '@/components/FormularioV4/viewForm';
import useClientOptions from '@/screens/AddInventory/hooks/useClientOptions';
import { InputNumber } from 'antd';
import { FormInputsClasses, TableHeadClasses, TableSelectsClasses } from '@/shared/Common/stylesConst/cssComponent';
import { ISize } from '@/shared/interfaces/ISize';
import { IColor } from '@/shared/interfaces/IColor';
import showGenericNotification from '@/util/antd/notification';
import showAlert from '@/util/antd/alert';
import { IPreOrderProductSave, ProductsDtoAdd } from '@/shared/interfaces/IPreOrderProduct';
import BackButton from '@/components/Generics/BackButton';


const PreOrders = () => {
  const [formData, setFormData] = useState<IPreOrder>(new PreOrderPostDto());

  const [tableData, setTableData] = useState<IPreOrderProductSave[]>([]);
  const { productOptions } = useProductOptions();
  const { clientOptions } = useClientOptions();

  const [disabledRows, setDisabledRows] = useState<boolean[]>(Array(tableData.length).fill(true));
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  const [rowSizeOptions, setRowSizeOptions] = useState<{ [key: number]: ISize[] }>({});
  const [rowColorOptions, setRowColorOptions] = useState<{ [key: number]: IColor[] }>({});

  const { sizeOptions } = useSizeOptions(selectedProductId ?? 0);
  const { colorOptions } = useColorOptions(selectedProductId ?? 0);

  useEffect(() => {
    if (selectedProductId !== null) {
      const updatedRowSizeOptions = { ...rowSizeOptions };
      const updatedRowColorOptions = { ...rowColorOptions };
      tableData.forEach((row, index) => {
        if (row.fkProduct === selectedProductId) {
          updatedRowSizeOptions[index] = sizeOptions;
          updatedRowColorOptions[index] = colorOptions;
        }
      });
      setRowSizeOptions(updatedRowSizeOptions);
      setRowColorOptions(updatedRowColorOptions);
    }
  }, [sizeOptions, colorOptions, selectedProductId, tableData]);

  const handleAddRow = () => {
    const newRow: IPreOrderProductSave = {
      ...new ProductsDtoAdd()
    };
    setTableData([...tableData, newRow]);
    setDisabledRows([...disabledRows, true]);
  };

  const handleSave = async () => {
    if (!formData.fkClient || !tableData.length) {
      showAlert({
        title: 'Error', content: 'Por favor, complete todos los campos.',
        onOk: () => {
          return;
        }
      });
      return;
    }
    try {
      const formDataWithProducts = {
        ...formData,
        productsDtoAdds: tableData,
      };
      await addPreOrder(formDataWithProducts)
        .then(() => {
          showGenericNotification({
            isSuccess: true,
            title: 'Pedido Agregado',
            message: 'El Pedido se ha agregado exitosamente.'
          });
        });
      // Limpiar el formulario después de guardar
      setFormData(new PreOrderPostDto);
      setTableData([]);
      setDisabledRows([]);
    } catch (error) {
      console.error('Error al guardar el pedido:', error);
      showGenericNotification({
        isSuccess: false,
        title: 'Error addPreOrder',
        message: 'Error al guardar el pedido. Por favor, inténtalo de nuevo.'
      });
    }

  };

  const handleSelectChange = (value: number, rowIndex: number, fieldName: keyof IPreOrderProductSave) => {
    const updatedTableData = [...tableData];
    updatedTableData[rowIndex][fieldName] = value;
    setTableData(updatedTableData);

    if (fieldName == 'fkProduct') {
      setRowSizeOptions(prev => ({ ...prev, [rowIndex]: sizeOptions }));
      setRowColorOptions(prev => ({ ...prev, [rowIndex]: colorOptions }));
      setSelectedProductId(value);
    }

    const updatedDisabledRows = [...disabledRows];
    updatedDisabledRows[rowIndex] = false;
    setDisabledRows(updatedDisabledRows);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | { target: { value: number | null } },
    rowIndex: number,
    fieldName: keyof IPreOrderProductSave
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
      <div className="flex items-center space-x-4 mb-4">
        <BackButton />
        <h2 className="text-2xl font-bold text-gray-800">
          Agregar Pedido
        </h2>
      </div>
      <div className='gap-4 inline-flex w-full'>
        <div className='flex flex-col w-1/4'>
          <label>Cliente:</label>
          <Select
            className={TableSelectsClasses + 'none'}
            options={clientOptions.map(client => ({
              value: client.id || 0,
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
                      value: product.id || 0,
                      label: product.name_prod || ""
                    }))}
                    value={{
                      value: productOptions.find(product => product.id === row.fkProduct)?.id || 0,
                      label: productOptions.find(product => product.id === row.fkProduct)?.name_prod || ""
                    }}
                    onChange={(selectedOption) => handleSelectChange(selectedOption?.value || 0, index, 'fkProduct')}
                    isSearchable
                  />

                  {/* <ButtonModal
                    buttonText="+"
                    modalTitle=""
                    tooltipTitle="Agregar Producto"
                    size={16}
                    modalContent={<ViewForm usarForm="Product" formData={null} isUpdate={false} />}
                  /> */}
                </div>
              </td>
              <td>
                <Select
                  className={TableSelectsClasses}
                  isDisabled={disabledRows[index]}
                  options={(rowColorOptions[index] || []).map(color => ({
                    value: color.id || 0,
                    label: `${color.colorname} - ${color.codE_COLOR}`
                  }))}
                  value={{
                    value: rowColorOptions[index]?.find(color => color.id === row.fkColorPrimary)?.id || 0,
                    label: `${rowColorOptions[index]?.find(color => color.id === row.fkColorPrimary)?.colorname || ""}
                           - ${rowColorOptions[index]?.find(color => color.id === row.fkColorPrimary)?.codE_COLOR || ""}`
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
                    options={(rowSizeOptions[index] || []).map(size => ({
                      value: size.id || 0,
                      label: size.size + " - " + size.category
                    }))}
                    value={{
                      value: rowSizeOptions[index]?.find(size => size.id === row.fkSize)?.id || 0,
                      label: `${rowSizeOptions[index]?.find(size => size.id === row.fkSize)?.size || ""} - 
                                        ${rowSizeOptions[index]?.find(size => size.id === row.fkSize)?.category || ""}`
                    }}
                    onChange={(selectedOption) => handleSelectChange(selectedOption?.value || 0, index, 'fkSize')}
                    isSearchable

                  />
                  {/* <ButtonModal
                    buttonText="+"
                    modalTitle=""
                    tooltipTitle="Agregar Size"
                    size={16}
                    modalContent={<ViewForm usarForm="Size" formData={null} isUpdate={false} />}
                  /> */}
                </div>
              </td>
              <td className='w-14'>
                <InputNumber
                  min={0}
                  step={0}
                  max={10000}
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
