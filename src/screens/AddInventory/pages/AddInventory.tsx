import Select from 'react-select';
import React, { useState } from 'react';
import useProductOptions from '../hooks/useProductOptions';
import useSizeOptions from '../hooks/useSizeOptions';
import useColorOptions from '../hooks/useColorOptions';
import { AddBuy } from '@/shared/Api/BuyInventory/BuyApi';
import { IBuyPost, IInventoryDetailDto } from '@/shared/interfaces/BuyInventory/IBuyInvPost';
import ButtonModal from '@/components/Modal/ButtonModal';
import ViewForm from '@/components/FormularioV4/viewForm';


const tableHeadClasses = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider";
const tableSelectsClasses = "block w-full py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
const formInputsClasses = "px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"


const AddInventory = () => {
    const [formData, setFormData] = useState<IBuyPost>({
        company: '',
        rnc: '',
        ncf: '',
        totaL_SALE: 0,
        inventoryDetailDtoAdd: [],
    });
    const [tableData, setTableData] = useState<IInventoryDetailDto[]>([]);
    const { productOptions } = useProductOptions();
    const { sizeOptions } = useSizeOptions();
    const { colorOptions } = useColorOptions();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleAddRow = () => {
        const newRow: IInventoryDetailDto = {
            fK_BUY_INVENTORY: tableData.length,
            fK_PRODUCT: 0,
            quantity: 0,
            price: 0,
            fK_SIZE: 0,
            coloR_PRIMARY: 0,
            coloR_SECONDARY: 0,
        };
        setTableData([...tableData, newRow]);
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
            setFormData({
                company: '',
                rnc: '',
                ncf: '',
                totaL_SALE: 0,
                inventoryDetailDtoAdd: [],
            });
            setTableData([]);
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
        console.log(formDataWithDetails);
    };


    const handleSelectChange = (value: number, rowIndex: number, fieldName: keyof IInventoryDetailDto) => {
        const updatedTableData = [...tableData];
        updatedTableData[rowIndex][fieldName] = value;
        setTableData(updatedTableData);

    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, rowIndex: number, fieldName: keyof IInventoryDetailDto) => {
        const { value } = e.target;
        const updatedTableData = [...tableData];
        updatedTableData[rowIndex][fieldName] = parseInt(value, 10);
        setTableData(updatedTableData);
    };


    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Agregar Compra</h1>
            <div className='flex gap-4'>
                <div className='flex flex-col'>
                    <label className='mb-1'>Company:</label>
                    <input type="text" name="company" value={formData.company} onChange={handleChange}
                        className={formInputsClasses} />
                </div>
                <div className='flex flex-col'>
                    <label>RNC:</label>
                    <input type="text" name="rnc" value={formData.rnc} onChange={handleChange}
                        className={formInputsClasses} />
                </div>
                <div className='flex flex-col'>
                    <label>NCF:</label>
                    <input type="text" name="ncf" value={formData.ncf} onChange={handleChange}
                        className={formInputsClasses} />
                </div>
                <div className='flex flex-col'>
                    <label>PagoTotal:</label>
                    <input type="number" name="totaL_SALE" min="0.00" value={formData.totaL_SALE} onChange={handleChange}
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
                        <th className={tableHeadClasses}>Unidad</th>
                        <th className={tableHeadClasses}>Precio</th>
                        <th className={tableHeadClasses}>Size</th>
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
                                            value: productOptions.find(product => product.id === row.fK_PRODUCT)?.id || 0,
                                            label: productOptions.find(product => product.id === row.fK_PRODUCT)?.name_prod || ""
                                        }}
                                        onChange={(selectedOption) => handleSelectChange(selectedOption?.value || 0, index, 'fK_PRODUCT')}
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
                            <td className='w-14'>
                                <input
                                    type="number"
                                    value={row.quantity}
                                    onChange={(e) => handleInputChange(e, index, 'quantity')}
                                    className="w-full px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                                    min="0"
                                />
                            </td>
                            <td className='w-14'>
                                <input
                                    type="number"
                                    value={row.price}
                                    onChange={(e) => handleInputChange(e, index, 'price')}
                                    className="w-full px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                                    min="0"
                                />
                            </td>

                            <td className='relative'>
                                <div className='flex items-center'>

                                    <Select
                                        className={tableSelectsClasses}
                                        options={sizeOptions.map(size => ({
                                            value: size.id,
                                            label: size.size + " - " + size.category
                                        }))}
                                        value={{
                                            value: sizeOptions.find(size => size.id === row.fK_SIZE)?.id || 0,
                                            label: `${sizeOptions.find(size => size.id === row.fK_SIZE)?.size || ""} - 
                                        ${sizeOptions.find(size => size.id === row.fK_SIZE)?.category || ""}`
                                        }}
                                        onChange={(selectedOption) => handleSelectChange(selectedOption?.value || 0, index, 'fK_SIZE')}
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
                            <td>
                                <Select
                                    className={tableSelectsClasses}
                                    options={colorOptions.map(color => ({
                                        value: color.id,
                                        label: `${color.colorname} - ${color.code}`
                                    }))}
                                    value={{
                                        value: colorOptions.find(color => color.id === row.coloR_PRIMARY)?.id || 0,
                                        label: `${colorOptions.find(color => color.id === row.coloR_PRIMARY)?.colorname || ""} - ${colorOptions.find(color => color.id === row.coloR_PRIMARY)?.code || ""}`
                                    }}
                                    onChange={(selectedOption) => handleSelectChange(selectedOption?.value || 0, index, 'coloR_PRIMARY')}
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
                                        value: colorOptions.find(color => color.id === row.coloR_SECONDARY)?.id || 0,
                                        label: `${colorOptions.find(color => color.id === row.coloR_SECONDARY)?.colorname || ""} - 
                                        ${colorOptions.find(color => color.id === row.coloR_SECONDARY)?.code || ""}`
                                    }}
                                    onChange={(selectedOption) => handleSelectChange(selectedOption?.value || 0, index, 'coloR_SECONDARY')}
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
                            </button></td>
                    </tr>

                </tbody>
            </table>

        </div>
    );
};

export default AddInventory;
