import { useEffect } from 'react';

import { useCategorySizeForm } from "../hooks/useCSizeForm";
import { FormProps } from '@/components/Generics/Interface/IForms';
import { CategorySizeDto, ICategorySize } from '@/shared/interfaces/ICategorySize';


const CategorySizeForm: React.FC<FormProps> = ({ formData: initialFormData, isUpdate }) => {
    const { formData, setFormData, handleInputChange, handleSubmit, handleUpdate } = useCategorySizeForm();

    useEffect(() => {
        if (isUpdate && initialFormData) {
            handleSetInitialFormData(initialFormData);
        }
    }, [isUpdate, initialFormData]);

    const handleSetInitialFormData = (initialData: ICategorySize) => {
        const initialFormData = new CategorySizeDto();
        Object.assign(initialFormData, initialData);
        setFormData(initialFormData);
    };

    const onSubmitHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        if (isUpdate) {
            await handleUpdate(event);
        } else {
            await handleSubmit(event);
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className="max-w-md mx-auto mt-8">
            {/* Form Fields */}
            <div className="mb-4">
                <input
                    type="hidden"
                    name="id"
                    value={formData.id}
                    onChange={handleInputChange}
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

            {/* Submit Button */}
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
                {isUpdate ? "Actualizar" : "Guardar"}
            </button>
        </form>
    );
};

export default CategorySizeForm;
