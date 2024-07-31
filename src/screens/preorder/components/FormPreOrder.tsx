import Select from 'react-select';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormProps } from '@/components/Generics/Interface/IForms';

import useProductOptions from '@/screens/AddInventory/hooks/useProductOptions';
import useSizeOptions from '@/screens/AddInventory/hooks/useSizeOptions';
import useColorOptions from '@/screens/AddInventory/hooks/useColorOptions';
import { InputNumber, notification } from 'antd';
import { FormInputsClasses, TableSelectsClasses } from '@/shared/Common/stylesConst/cssComponent';
import { IPreOrderProduct, PreOrderProductDto, UpdatePreOrderProductDto } from '@/shared/interfaces/Preorder/IPreOrderProduct';
import { addPreOrderProduct, UpdatePreOrderProduct } from '@/shared/Api/PreOrder/PreOrderProductApi';

const AddProduct: React.FC<FormProps> = ({ formData: initialFormData, isUpdate }) => {
    const { preorderId } = useParams<{ preorderId: string }>();
    const [formData, setFormData] = useState<IPreOrderProduct>(new PreOrderProductDto());
    const { productOptions } = useProductOptions();
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

    const { sizeOptions } = useSizeOptions(selectedProductId ?? 0);
    const { colorOptions } = useColorOptions(selectedProductId ?? 0);

    useEffect(() => {
        if (isUpdate && initialFormData) {
            handleSetInitialFormData(initialFormData);
        }
    }, [isUpdate, initialFormData]);

    const handleSetInitialFormData = (initialData: any) => {
        const initialFormData = new PreOrderProductDto();
        initialFormData.id = initialData.id;
        initialFormData.fkProduct = initialData.productId;
        initialFormData.fkSize = initialData.sizeId;
        initialFormData.quantity = initialData.quantity;
        initialFormData.fkColorPrimary = initialData.colorPrimaryId;
        initialFormData.fkColorSecondary = initialData.colorSecondaryId;
        initialFormData.customPrice = initialData.price;
        setFormData(initialFormData);
        setSelectedProductId(initialData.productId); // Asegurar que selectedProductId también se actualice
    };

    useEffect(() => {
        if (selectedProductId !== null && !isUpdate) {
            console.log('prevData', formData);
            setFormData((prevData) => ({
                ...prevData,
                fkSize: 0,
                fkColorPrimary: 0,
            }));
        }
        console.log('initialFormData', initialFormData);
    }, [selectedProductId]);

    const handleSave = async () => {
        if (!formData.fkProduct || !formData.quantity || !formData.customPrice) {
            alert('Por favor completa todos los campos.');
            return;
        }

        try {
            if (isUpdate) {
                const dataToSave = new UpdatePreOrderProductDto({
                    id: initialFormData.id,
                    user: formData.user,
                    date: new Date().toISOString(),
                    fkProduct: formData.fkProduct,
                    fkSize: formData.fkSize,
                    quantity: formData.quantity,
                    fkColorPrimary: formData.fkColorPrimary,
                    fkColorSecondary: formData.fkColorSecondary,
                    fkPreOrder: parseInt(preorderId ?? '0'),
                });
                console.log('dataToSave', dataToSave);
                await UpdatePreOrderProduct(dataToSave);
                alert('Producto actualizado exitosamente');
            } else {
                const dataToSave = {
                    fkProduct: formData.fkProduct,
                    fkSize: formData.fkSize,
                    quantity: formData.quantity,
                    fkColorPrimary: formData.fkColorPrimary,
                    fkColorSecondary: formData.fkColorSecondary,
                    customPrice: formData.customPrice,
                    fkPreOrder: parseInt(preorderId ?? '0'),
                    user: formData.user,
                };
                await addPreOrderProduct(dataToSave)
                .then (() => {
                    notification.success({
                        message: 'Pedido Agregado',
                        description: 'La pedido se ha agregado exitosamente.',
                    })
                });
            }
            setFormData(new PreOrderProductDto());
            // window.location.reload();
        } catch (error) {
            console.error('Error al guardar el producto:', error);
            alert('Error al guardar el producto. Por favor, inténtalo de nuevo.');
        }
    };

    const handleSelectChange = (value: number, fieldName: keyof PreOrderProductDto) => {
        setFormData((prevData) => ({ ...prevData, [fieldName]: value }));
        if (fieldName === 'fkProduct') {
            setSelectedProductId(value);
        }
    };

    const handleInputChange = (value: number | null, fieldName: keyof PreOrderProductDto) => {
        setFormData((prevData) => ({ ...prevData, [fieldName]: value ?? 0 }));
    };

    return (
        <>
            <h1 className="text-2xl font-bold mb-4">{isUpdate ? 'Actualizar Producto' : 'Agregar Producto'}</h1>
            <form onSubmit={handleSave} className="max-w-md mx-auto mt-8">
                <div className='gap-4 w-full'>
                    <div className='mb-2'>
                        <label className="block text-sm font-medium text-gray-600">Producto:</label>
                        <Select
                            className={TableSelectsClasses}
                            options={productOptions.map(product => ({
                                value: product.id,
                                label: product.name_prod,
                            }))}
                            value={{
                                value: productOptions.find(product => product.id === formData.fkProduct)?.id || 0,
                                label: productOptions.find(product => product.id === formData.fkProduct)?.name_prod || '',
                            }}
                            onChange={(selectedOption) => handleSelectChange(selectedOption?.value || 0, 'fkProduct')}
                            isSearchable
                        />
                    </div>
                    <div className='mb-2'>
                        <label className="block text-sm font-medium text-gray-600">Color Primario:</label>
                        <Select
                            className={TableSelectsClasses}
                            options={colorOptions.map(color => ({
                                value: color.id,
                                label: `${color.colorname} - ${color.codE_COLOR}`,
                            }))}
                            value={{
                                value: colorOptions.find(color => color.id === formData.fkColorPrimary)?.id || 0,
                                label: `${colorOptions.find(color => color.id === formData.fkColorPrimary)?.colorname || ''} - ${colorOptions.find(color => color.id === formData.fkColorPrimary)?.codE_COLOR || ''}`,
                            }}
                            onChange={(selectedOption) => handleSelectChange(selectedOption?.value || 0, 'fkColorPrimary')}
                            isSearchable
                        />
                    </div>
                    <div className='mb-2'>
                        <label className="block text-sm font-medium text-gray-600">Tamaño:</label>
                        <Select
                            className={TableSelectsClasses}
                            options={sizeOptions.map(size => ({
                                value: size.id,
                                label: `${size.size} - ${size.category}`,
                            }))}
                            value={{
                                value: sizeOptions.find(size => size.id === formData.fkSize)?.id || 0,
                                label: `${sizeOptions.find(size => size.id === formData.fkSize)?.size || ''} - ${sizeOptions.find(size => size.id === formData.fkSize)?.category || ''}`,
                            }}
                            onChange={(selectedOption) => handleSelectChange(selectedOption?.value || 0, 'fkSize')}
                            isSearchable
                        />
                    </div>
                </div>
                <div className='gap-4 inline-flex w-full mt-4'>
                    <div className='flex flex-col w-1/4'>
                        <label className="block text-sm font-medium text-gray-600">Precio:</label>
                        <InputNumber
                            min={0}
                            step={0.01}
                            value={formData.customPrice}
                            onChange={(value) => handleInputChange(value, 'customPrice')}
                            className={FormInputsClasses}
                        />
                    </div>
                    <div className='w-1/2'>
                        <label className="block text-sm font-medium text-gray-600">Cantidad:</label>
                        <InputNumber
                            min={0}
                            step={1}
                            value={formData.quantity}
                            onChange={(value) => handleInputChange(value, 'quantity')}
                            className={FormInputsClasses}
                        />
                    </div>
                    <div className='flex flex-col items-center justify-center w-1/4'>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-5 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            {isUpdate ? 'Actualizar' : 'Guardar'}
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default AddProduct;
