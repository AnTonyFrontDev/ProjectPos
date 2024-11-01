import { useEffect } from 'react';

import { usePaymentTypeForm } from "../hooks/usePayTypeForm";
import { FormProps } from '@/components/Generics/Interface/IForms';
import { PaymentTypePostDto, IPaymentType } from '@/shared/interfaces/IPaymentType';


const PaymentTypeForm: React.FC<FormProps> = ({ formData: initialFormData, isUpdate, 
    //handleReloadTable, onSubmitSuccess 
}) => {
    const { formData, setFormData, handleInputChange, handleSubmit, handleUpdate } = usePaymentTypeForm();

    useEffect(() => {
        if (isUpdate && initialFormData) {
            handleSetInitialFormData(initialFormData);
            console.log(initialFormData);
        }
    }, [isUpdate, initialFormData]);

    const handleSetInitialFormData = (initialData: IPaymentType) => {
        const initialFormData = new PaymentTypePostDto;
        Object.assign(initialFormData, initialData)
        setFormData(initialFormData)
    };

    // const onSubmitHandler = isUpdate ? handleUpdate : handleSubmit;

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
                <label className="block text-sm font-medium text-gray-600">Tipo de Pago</label>
                <input
                    type="text"
                    name="type"
                    value={formData.type}
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

export default PaymentTypeForm;
