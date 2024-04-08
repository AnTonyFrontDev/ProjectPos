import { useEffect } from 'react';

import { useCategorySizeForm } from "../hooks/useCSizeForm";

interface CategorySizeFormProps {
    formData: any;
    isUpdate: boolean;
}

const CategorySizeForm: React.FC<CategorySizeFormProps> = ({ formData: initialFormData, isUpdate }) => {
    const { formData, setFormData, handleInputChange, handleSubmit, handleUpdate } = useCategorySizeForm();

    useEffect(() => {
        if (isUpdate && initialFormData) {
            handleSetInitialFormData(initialFormData);
        }
    }, [isUpdate, initialFormData]);

    const handleSetInitialFormData = (initialData: any) => {
        const { id, category } = initialData;
        setFormData({
            ...formData,
            id: id || 0,
            category: category || ''
        });
    };

    const onSubmitHandler = isUpdate ? handleUpdate : handleSubmit;

    return (
        <form onSubmit={onSubmitHandler} className="max-w-md mx-auto mt-8">
            {/* Campos del formulario de CategorySize */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">ID</label>
                <input
                    type="text"
                    name="id"
                    value={formData.id}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    readOnly={!isUpdate} // El campo de ID debe ser de solo lectura en modo de actualización
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Category</label>
                <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
            </div>

            {/* Botón de envío */}
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
                {isUpdate ? "Update" : "Submit"}
            </button>
        </form>
    );
};

export default CategorySizeForm;
