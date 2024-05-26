import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { getSizes } from '@/shared/Api/InventoryApi';
import { SaveProductSize } from '@/shared/Api/Products/ProductSize/ProductSize';

interface IProductSizeProps {
    productId: number;
}

const ProductSizeAdd: React.FC<IProductSizeProps> = ({ productId }) => {
    const [sizes, setSize] = useState<{ value: number; label: string }[]>([]);
    const [selectedSize, setSelectedSize] = useState<{ value: number; label: string } | null>(null);
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

        fetchSizes();
    }, []);

    const handleSizeChange = (selectedOption: { value: number; label: string } | null) => {
        setSelectedSize(selectedOption);
    };

    const handleAddColor = async () => {
        if (!selectedSize) {
            console.error('Por favor selecciona un color');
            return;
        }

        const formData = {
            fkProduct: Number(productId),
            fkSize: selectedSize.value
        };
        // console.log('Size agregado exitosamente.', formData);

        try {
            await SaveProductSize(formData);
            
            setShowSuccessAlert(true);
            setSelectedSize(null);
            setTimeout(() => {
                setShowSuccessAlert(false);
            }, 3000);
        } catch (error) {
            console.error('Error al agregar el size:', error);
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
                    onClick={handleAddColor}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Agregar Talla
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
