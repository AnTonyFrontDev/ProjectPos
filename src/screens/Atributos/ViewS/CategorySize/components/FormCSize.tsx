import { useEffect } from 'react';

import { useCategorySizeForm } from "../hooks/useCSizeForm";

interface CategorySizeFormProps {
    formData: any; 
    isUpdate: boolean;
    onSubmit: (formData: any) => void; 
}

const CategorySizeForm: React.FC<CategorySizeFormProps> = ({ formData: initialFormData, isUpdate }) => {
    const { formData, setFormData, handleInputChange, handleSubmit } = useCategorySizeForm();

    useEffect(() => {
        if (isUpdate && initialFormData) {
            handleSetInitialFormData(initialFormData);
        }
    }, [isUpdate, initialFormData]);

    const handleSetInitialFormData = (initialData: any) => {
        const { category } = initialData;
        setFormData({
            ...formData,
            category: category || '' 
        });
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
            {/* Campos del formulario de CategorySize */}
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
