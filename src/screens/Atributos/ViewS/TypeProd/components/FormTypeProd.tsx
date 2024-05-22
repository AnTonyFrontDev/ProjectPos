import { useEffect } from 'react';

import { useTypeProdForm } from "../hooks/useTypeProdForm";
import { FormProps } from '@/components/Generics/Interface/IForms';
import { TypeProdDto, ITypeProdPost } from '@/shared/interfaces/Product/TypeProd/ITypeProdPost';

const TypeProdForm: React.FC<FormProps> = ({ formData: initialFormData, isUpdate,
    //handleReloadTable, onSubmitSuccess 
}) => {
    const { formData, setFormData, handleInputChange, handleSubmit, handleUpdate } = useTypeProdForm();

    useEffect(() => {
        if (isUpdate && initialFormData) {
            handleSetInitialFormData(initialFormData);
            console.log(initialFormData);
        }
    }, [isUpdate, initialFormData]);

    const handleSetInitialFormData = (initialData: ITypeProdPost) => {
        const initialFormData = new TypeProdDto;
        Object.assign(initialFormData, initialData)
        setFormData(initialFormData)
    };


    const onSubmitHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        if (isUpdate) {
            await handleUpdate(event);
        } else {
            await handleSubmit(event);
        }
        // Llama a handleReloadTable después de enviar el formulario
        // handleReloadTable();
    };

    return (
        <form onSubmit={onSubmitHandler} className="max-w-md mx-auto mt-8">
            {/* Campos del formulario de CategorySize */}
            <div className="mb-4">
                <input
                    type="hidden"
                    name="id"
                    value={formData.id}
                    onChange={handleInputChange}
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Tipo Producto</label>
                <input
                    type="text"
                    name={!isUpdate ? "typeProd" : "type"}
                    value={!isUpdate ? formData.typeProd : formData.type}
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

export default TypeProdForm;
