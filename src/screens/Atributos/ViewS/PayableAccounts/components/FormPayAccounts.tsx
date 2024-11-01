import { useEffect, useState } from 'react';
import { usePayAccountForm } from '../hooks/usePayAccountForm';
import { FormProps } from '@/components/Generics/Interface/IForms';
import { IPaymentExpenseSave, PaymentExpensesDtoAdd } from '@/shared/interfaces/IPaymentExpense';
import Select from 'react-select';
import { TableSelectsClasses } from '@/shared/Common/stylesConst/cssComponent';


const ExpensesForm: React.FC<FormProps> = ({ formData: initialFormData, isUpdate
}) => {
    const {
        formData,
        typePaymentOptions,
        bankAccountOptions,
        expenseOptions,
        loadExpenseOptions,
        loadBankAccountOptions,
        loadTypePaymentOptions,
        setFormData,
        handleInputChange,
        handleSubmit,
        handleUpdate,
    } = usePayAccountForm();

    const [selectedPaymentType, setSelectedPaymentType] = useState<string | null>(null);

    useEffect(() => {
        if (isUpdate && initialFormData) {
            handleSetInitialFormData(initialFormData);
        }
        loadBankAccountOptions();
        loadExpenseOptions();
        loadTypePaymentOptions();
    }, [isUpdate, initialFormData]);

    const handleSetInitialFormData = (initialData: IPaymentExpenseSave) => {
        const initialFormData = new PaymentExpensesDtoAdd;
        Object.assign(initialFormData, initialData)
        setFormData(initialFormData)
    };

    const onPaymentTypeChange = (selectedOption: any) => {
        setFormData({ ...formData, idPaymentType: selectedOption?.value || 0 });
        setSelectedPaymentType(selectedOption?.label || null);
        // onChange={(selectedOption) => setFormData({ ...formData, idPaymentType: selectedOption?.value || 0 })}
    };

    const onSubmitHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        if (isUpdate) {
            await handleUpdate(event);
        } else {
            await handleSubmit(event);
        }
        window.location.reload();
    };

    return (
        <form onSubmit={onSubmitHandler} className="max-w-md mx-auto mt-8">
            {/* Campos del formulario de CategorySize */}

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Gasto:</label>
                <Select
                    className={TableSelectsClasses}
                    options={expenseOptions}
                    value={expenseOptions.find((option) => option.value === formData.idExpense)}
                    onChange={(selectedOption) => setFormData({ ...formData, idExpense: selectedOption?.value || 0 })}
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Tipo de pago:</label>
                <Select
                    className={TableSelectsClasses}
                    options={typePaymentOptions}
                    value={typePaymentOptions.find((option) => option.value === formData.idPaymentType)}
                    onChange={onPaymentTypeChange}
                />
            </div>
            {selectedPaymentType !== "Efectivo" && (
                <>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">Cuenta de Banco</label>
                        <Select
                            className={TableSelectsClasses}
                            options={bankAccountOptions}
                            value={bankAccountOptions.find((option) => option.value === formData.idBankAccount)}
                            onChange={(selectedOption) => setFormData({ ...formData, idBankAccount: selectedOption?.value || 0 })}
                        />
                    </div>
                </>
            )}

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Monto</label>
                <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
            </div>

            {/* Botón de envío */}
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
                {isUpdate ? "Actualizar " : "Enviar"}
            </button>
        </form>
    );
};

export default ExpensesForm;
