import { useEffect } from 'react';
import { usePaymentExpensesForm } from '../hooks/useExpensesForm';
import { FormProps } from '@/components/Generics/Interface/IForms';
import { PaymentExpensesDtoAdd, IPaymentExpenseDtoAdd } from '@/shared/interfaces/PaymentExpenses/PaymentExpenseDtoAdd';
import useTypePaymentOptions from '../hooks/useTypePaymentOptions';
// import useBankOptions from '../hooks/useBankOptions';
import useBankAccountOptions from '../hooks/useBankAccountOptions';
import { TableSelectsClasses } from '@/shared/Common/cssComponent';
import Select from 'react-select';
import useExpensesOptions from "@/screens/Atributos/ViewS/PaymentExpenses/hooks/useExpensesOptions.ts";

const ExpensesForm: React.FC<FormProps> = ({ formData: initialFormData, isUpdate }) => {
    const { formData, setFormData, handleInputChange, handleSubmit, handleUpdate } = usePaymentExpensesForm();
    const { typePaymentOptions } = useTypePaymentOptions();
    const { bankAccountOptions } = useBankAccountOptions();
    const {expensesOptions} = useExpensesOptions()
    useEffect(() => {
        if (isUpdate && initialFormData) {
            handleSetInitialFormData(initialFormData);
        }
    }, [isUpdate, initialFormData]);

    const handleSetInitialFormData = (initialData: IPaymentExpenseDtoAdd) => {
        const initialFormData = new PaymentExpensesDtoAdd;
        Object.assign(initialFormData, initialData)
        setFormData(initialFormData)
    };

    const handleSelectChange = (selectedOption: any, fieldName: keyof IPaymentExpenseDtoAdd) => {
        setFormData({
            ...formData,
            [fieldName]: selectedOption.value
        });
    };

    const onSubmitHandler = isUpdate ? handleUpdate : handleSubmit;

    return (
        <form onSubmit={onSubmitHandler} className="max-w-md mx-auto mt-8">
            <div className="mb-2">
                <label className="block text-sm font-medium text-gray-600">Pago:</label>
                <Select
                    className={TableSelectsClasses}
                    options={expensesOptions.map(expenses => ({
                        value: expenses.id,
                        label: expenses.name
                    }))}
                    value={expensesOptions.map(expenses => ({
                        value: expenses.id,
                        label: expenses.name
                    })).find(option => option.value === formData.idExpense)}
                    onChange={(selectedOption) => handleSelectChange(selectedOption, 'idExpense')}
                    isSearchable
                />
            </div>
            <div className="mb-2">
                <label className="block text-sm font-medium text-gray-600">Tipo de pago:</label>
                <Select
                    className={TableSelectsClasses}
                    options={typePaymentOptions.map(tPay => ({
                        value: tPay.id,
                        label: tPay.type
                    }))}
                    value={typePaymentOptions.map(tPay => ({
                        value: tPay.id,
                        label: tPay.type
                    })).find(option => option.value === formData.idPaymentType)}
                    onChange={(selectedOption) => handleSelectChange(selectedOption, 'idPaymentType')}
                    isSearchable
                />
            </div>
            <div className="mb-2">
                <label className="block text-sm font-medium text-gray-600">Cuenta de Banco:</label>
                <Select
                    className={TableSelectsClasses}
                    options={bankAccountOptions.map(bAccount => ({
                        value: bAccount.id,
                        label: `${bAccount.account} - ${bAccount.bankType}`
                    }))}
                    value={bankAccountOptions.map(bAccount => ({
                        value: bAccount.id,
                        label: `${bAccount.account} - ${bAccount.bankType}`
                    })).find(option => option.value === formData.idBankAccount)}
                    onChange={(selectedOption) => handleSelectChange(selectedOption, 'idBankAccount')}
                    isSearchable
                />

            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Monto:</label>
                <input
                    type="text"
                    name="amount"
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

export default ExpensesForm;
