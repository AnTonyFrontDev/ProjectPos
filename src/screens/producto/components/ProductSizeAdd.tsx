import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { getProductSize, RemoveProductSize, SaveProductSize } from '@/shared/Api/Products/ProductSize/ProductSize';
import { getSizes } from '@/shared/Api/Size/SizeApi';

interface IProductSizeProps {
    productId: number;
}

const ProductSizeAdd: React.FC<IProductSizeProps> = ({ productId }) => {
    const [sizes, setSize] = useState<{ value: number; label: string }[]>([]);
    const [selectedSize, setSelectedSize] = useState<{ value: number; label: string } | null>(null);
    const [productSizes, setProductSizes] = useState<any[]>([]);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    useEffect(() => {
        const fetchSizes = async () => {
            try {
                const sizesResponse = await getSizes();
                const sizeOptions = sizesResponse.map((size: any) => ({
                    value: size.id,
                    label: size.size,
                }));
                setSize(sizeOptions);
            } catch (error) {
                console.error('Error al obtener los Tallas:', error);
            }
        };

        const fetchProductSizes = async () => {
            try {
                const productSizesResponse = await getProductSize();
                //   console.log('Full productSizesResponse:', productColorsResponse);
                //   console.log('Product ID:', productId);

                const numericProductId = Number(productId);
                //   console.log('Numeric Product ID:', numericProductId);

                if (isNaN(numericProductId)) {
                    console.error('productId is not a valid number:', productId);
                    return;
                }

                const filteredSizes = productSizesResponse.filter((pc: any) => {
                    console.log('Checking product Size:', pc);
                    return pc.idProduct === numericProductId;
                });

                console.log('Filtered product Sizes:', filteredSizes);

                setProductSizes(filteredSizes);
            } catch (error) {
                console.error('Error al obtener los Sizes del producto:', error);
            }
        };


        fetchSizes();
        fetchProductSizes();
    }, []);

    const handleSizeChange = (selectedOption: { value: number; label: string } | null) => {
        setSelectedSize(selectedOption);
    };

    const handleAddSize = async () => {
        if (!selectedSize) {
            console.error('Por favor selecciona una Talla');
            return;
        }

        const formData = {
            idSize: selectedSize.value,
            idProduct: Number(productId),
        };
        // console.log('Size agregado exitosamente.', formData);

        try {
            await SaveProductSize(formData);
            setShowSuccessAlert(true);
            setSelectedSize(null);
            setTimeout(() => {
                setShowSuccessAlert(false);
            }, 3000);
            const updatedProductColors = await getProductSize();
            setProductSizes(updatedProductColors.filter((pc: any) => pc.idProduct === Number(productId)));
        } catch (error) {
            console.error('Error al agregar el size:', error);
        }
    };

    const handleDelete = async () => {
        if (!selectedSize) {
            console.error('Por favor selecciona un color para eliminar');
            return;
        }
        const numericProductId = Number(productId);
        const sizeToDelete = productSizes.find(pc => pc.idSize === selectedSize.value && pc.idProduct === numericProductId);

        if (!sizeToDelete) {
            console.error('No se encontró el color a eliminar');
            return;
        }

        console.log('Color a eliminar:', sizeToDelete.id);

        try {
            await RemoveProductSize({ id: sizeToDelete.id });
            setShowSuccessAlert(true);
            setSelectedSize(null);
            setTimeout(() => {
                setShowSuccessAlert(false);
            }, 3000);
            // Update the list of product colors
            const updatedProductColors = await getProductSize();
            setProductSizes(updatedProductColors.filter((pc: any) => pc.idProduct === numericProductId));
        } catch (error) {
            console.error('Error al eliminar el color:', error);
        }
    };

    return (
        <div>
            <h3>Agregar Talla:</h3>
            <div className="flex mt-4 items-center">
                <div className="flex items-center">
                    <label className="block text-sm font-medium text-gray-700">Selecciona un Talla:</label>
                    <Select
                        value={selectedSize}
                        onChange={handleSizeChange}
                        options={sizes}
                        placeholder="Seleccionar Talla"
                        className="p-4 m-2"
                    />
                </div>
                <button
                    onClick={handleAddSize}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mr-2 rounded focus:outline-none focus:shadow-outline"
                >
                    Agregar Talla
                </button>
                <button
                    className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                    onClick={handleDelete}
                >
                    Quitar
                </button>
            </div>
            {showSuccessAlert && (
                <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Éxito:</strong> El Size se agregó correctamente.
                </div>
            )}
        </div>
    );
};

export default ProductSizeAdd;
