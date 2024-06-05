import { useEffect } from 'react';

import { usePaymentForm } from "../hooks/usePaymentForm";
import { FormProps } from '@/components/Generics/Interface/IForms';
import { IPaymentPost, PaymentDto } from '@/shared/interfaces/payment/IPaymentPost';
import Select from 'react-select';
import { TableSelectsClasses } from '@/shared/Common/cssComponent';


const PaymentForm: React.FC<FormProps> = ({ formData: initialFormData, isUpdate,
}) => {
    const { formData,
        typePaymentOptions,
        bankAccountOptions,
        loadBankAccountOptions,
        setFormData,
        handleInputChange,
        handleSubmit,
        handleUpdate,
        loadTypePaymentOptions
    } = usePaymentForm();



    useEffect(() => {
        if (isUpdate && initialFormData) {
            handleSetInitialFormData(initialFormData);
            console.log(initialFormData);
        }
        loadBankAccountOptions();
        loadTypePaymentOptions();
    }, [isUpdate, initialFormData]);

    const handleSetInitialFormData = (initialData: IPaymentPost) => {
        const initialFormData = new PaymentDto;
        Object.assign(initialFormData, initialData)
        setFormData(initialFormData)
    };


    const onSubmitHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        if (isUpdate) {
            await handleUpdate(event);
        } else {
            await handleSubmit(event);
            window.location.reload();
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
                <label className="block text-sm font-medium text-gray-600">Cuenta de Pago:</label>
                <input
                    type="text"
                    name="category"
                    value={formData.accountPayment}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Tipo de Pago:</label>
                <Select
                    className={TableSelectsClasses}
                    options={typePaymentOptions}
                    value={typePaymentOptions.find((option) => option.value === formData.fkTypePayment)}
                    onChange={(selectedOption) => setFormData({ ...formData, fkTypePayment: selectedOption?.value || 0 })}
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Cuenta de Banco:</label>
                <Select
                    className={TableSelectsClasses}
                    options={bankAccountOptions}
                    value={bankAccountOptions.find((option) => option.value === formData.fkBankAccount)}
                    onChange={(selectedOption) => setFormData({ ...formData, fkBankAccount: selectedOption?.value || 0 })}
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Cantidad:</label>
                <input
                    type="number"
                    name="category"
                    value={formData.amount}
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

export default PaymentForm;
