import Select from 'react-select';
import React, { useEffect, useState } from 'react';
import useProductOptions from '../hooks/useProductOptions';
import useSizeOptions from '../hooks/useSizeOptions';
import useColorOptions from '../hooks/useColorOptions';
import { AddBuy } from '@/shared/Api/BuyInventory/BuyApi';
import { BuyPostDto, IBuyPost, IInventoryDetailDto } from '@/shared/interfaces/BuyInventory/IBuyInvPost';
import { InputNumber } from 'antd';
import { FormInputsClasses, TableHeadClasses, TableSelectsClasses } from '@/shared/Common/cssComponent';
import { ISizeGet } from '@/shared/interfaces/size/ISizeGet';


const AddInventory = () => {
    const [formData, setFormData] = useState<IBuyPost>(new BuyPostDto());
    const [tableData, setTableData] = useState<IInventoryDetailDto[]>([]);
    const { productOptions } = useProductOptions();

    const [disabledRows, setDisabledRows] = useState<boolean[]>(Array(tableData.length).fill(true));
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

    const [rowSizeOptions, setRowSizeOptions] = useState<{ [key: number]: ISizeGet[] }>({});

    const { sizeOptions } = useSizeOptions(selectedProductId ?? 0);
    const { colorOptions } = useColorOptions(selectedProductId ?? 0);

    useEffect(() => {
        if (selectedProductId !== null) {
            const updatedRowSizeOptions = { ...rowSizeOptions };
            tableData.forEach((row, index) => {
                if (row.fK_PRODUCT === selectedProductId) {
                    updatedRowSizeOptions[index] = sizeOptions;
                }
            });
            setRowSizeOptions(updatedRowSizeOptions);
        }
    }, [sizeOptions, selectedProductId, tableData]);

   
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleAddRow = () => {
        const newRow: IInventoryDetailDto = {
            ...new BuyPostDto().inventoryDetailDtoAdd[0],
            fK_BUY_INVENTORY: tableData.length,
        };
        setTableData([...tableData, newRow]);
        setDisabledRows([...disabledRows, true]);
    };

    const handleSave = async () => {
        if (!formData.company || !formData.rnc || !formData.ncf || !formData.totaL_SALE || !tableData.length) {
            alert('Por favor completa todos los campos.');
            return;
        }

        try {
            const formDataWithDetails = {
                ...formData,
                inventoryDetailDtoAdd: tableData,
            };
            console.log(formDataWithDetails);
            await AddBuy(formDataWithDetails);
            // Limpiar el formulario después de guardar
            setFormData(new BuyPostDto);
            setTableData([]);
            setDisabledRows([]);
            alert('Compra guardada exitosamente');
        } catch (error) {
            console.error('Error al guardar la compra:', error);
            alert('Error al guardar la compra. Por favor, inténtalo de nuevo.');
        }
        handleTest();
    };

    const handleTest = () => {
        // Añadir los detalles del inventario al formData antes de mostrarlo en la consola
        const formDataWithDetails = {
            ...formData,
            inventoryDetailDtoAdd: tableData,
        };
        console.log("Prueba", formDataWithDetails);
    };


    const handleSelectChange = (value: number, rowIndex: number, fieldName: keyof IInventoryDetailDto) => {
        const updatedTableData = [...tableData];
        updatedTableData[rowIndex][fieldName] = value;
        setTableData(updatedTableData);

        if (fieldName == 'fK_PRODUCT') {
            setRowSizeOptions(prev => ({ ...prev, [rowIndex]: sizeOptions }));
            setSelectedProductId(value);
        }

        console.log([rowIndex], sizeOptions)

        const updatedDisabledRows = [...disabledRows];
        updatedDisabledRows[rowIndex] = false;
        setDisabledRows(updatedDisabledRows);
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement> | { target: { value: number | null } },
        rowIndex: number,
        fieldName: keyof IInventoryDetailDto
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
        console.log("Prueba", updatedTableData);
        setTableData(updatedTableData);
    };


    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Agregar Compra</h1>
            <div className='flex gap-4'>
                <div className='flex flex-col'>
                    <label className='mb-1'>Compañia:</label>
                    <input type="text" name="company" value={formData.company} onChange={handleChange}
                        className={FormInputsClasses} />
                </div>
                <div className='flex flex-col'>
                    <label>RNC:</label>
                    <input type="text" name="rnc" value={formData.rnc} onChange={handleChange}
                        className={FormInputsClasses} />
                </div>
                <div className='flex flex-col'>
                    <label>NCF:</label>
                    <input type="text" name="ncf" value={formData.ncf} onChange={handleChange}
                        className={FormInputsClasses} />
                </div>
                <div className='flex flex-col'>
                    <label>PagoTotal:</label>
                    <input type="number" name="totaL_SALE" min="0.00" value={formData.totaL_SALE} onChange={handleChange}
                        className={FormInputsClasses} />
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
                        <th className={TableHeadClasses}>#</th>
                        <th className={TableHeadClasses}>Producto</th>
                        <th className={TableHeadClasses}>Color</th>
                        <th className={TableHeadClasses}>Size</th>
                        <th className={TableHeadClasses}>Unidad</th>
                        <th className={TableHeadClasses}>Precio</th>
                        {/* <th className={TableHeadClasses}>Color 2</th> */}
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
                                            value: productOptions.find(product => product.id === row.fK_PRODUCT)?.id || 0,
                                            label: productOptions.find(product => product.id === row.fK_PRODUCT)?.name_prod || ""
                                        }}
                                        onChange={(selectedOption) => handleSelectChange(selectedOption?.value || 0, index, 'fK_PRODUCT')}
                                        isSearchable
                                    />
                                </div>
                            </td>
                            <td>
                                <Select
                                    className={TableSelectsClasses}
                                    isDisabled={disabledRows[index]}
                                    options={colorOptions.map(color => ({
                                        value: color.id,
                                        label: `${color.colorname} - ${color.codE_COLOR}`
                                    }))}
                                    value={{
                                        value: colorOptions.find(color => color.id === row.coloR_PRIMARY)?.id || 0,
                                        label: `${colorOptions.find(color => color.id === row.coloR_PRIMARY)?.colorname || ""} 
                                                - ${colorOptions.find(color => color.id === row.coloR_PRIMARY)?.codE_COLOR || ""}`
                                    }}
                                    onChange={(selectedOption) => handleSelectChange(selectedOption?.value || 0, index, 'coloR_PRIMARY')}
                                    isSearchable
                                />
                            </td>
                            <td className='relative'>
                                <div className='flex items-center'>
                                    <Select
                                        className={TableSelectsClasses}
                                        // isDisabled={disabledRows[index]}
                                        options={(rowSizeOptions[index] || []).map(size => ({
                                            value: size.id,
                                            label: size.size + " - " + size.category
                                        }))}
                                        value={{
                                            value: rowSizeOptions[index]?.find(size => size.id === row.fK_SIZE)?.id || 0,
                                            label: `${rowSizeOptions[index]?.find(size => size.id === row.fK_SIZE)?.size || ""} - 
                                        ${rowSizeOptions[index]?.find(size => size.id === row.fK_SIZE)?.category || ""}`
                                        }}
                                        onChange={(selectedOption) => handleSelectChange(selectedOption?.value || 0, index, 'fK_SIZE')}
                                        isSearchable
                                    />
                                </div>
                            </td>
                            <td className='w-14'>
                                <InputNumber
                                    min={0}
                                    step={0}
                                    max={999}
                                    value={row.quantity}
                                    onChange={(value) => handleInputChange({ target: { value: value ?? 0 } }, index, 'quantity')}
                                    disabled={disabledRows[index]}
                                    className="text-lg w-full py-0.5 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                                />
                            </td>
                            <td className='w-14'>
                                <InputNumber
                                    min={0}
                                    step={0.01}
                                    max={99999.99}
                                    value={row.price}
                                    onChange={(value) => handleInputChange({ target: { value: value ?? 0 } }, index, 'price')}
                                    disabled={disabledRows[index]}
                                    className="text-lg w-full py-0.5 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
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
                            </button></td>
                    </tr>

                </tbody>
            </table>

        </div>
    );
};

export default AddInventory;
