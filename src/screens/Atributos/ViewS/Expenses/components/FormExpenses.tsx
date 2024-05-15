import { useEffect } from 'react';
import { useExpensesForm } from '../hooks/useExpensesForm';
import { FormProps } from '@/components/Generics/Interface/IForms';
import { ExpensesDto, IExpensesPost } from '@/shared/interfaces/Expenses/IExpensesPost';
import useTypePaymentOptions from '../hooks/useTypePaymentOptions';
import useBankOptions from '../hooks/useBankOptions';
import { TableSelectsClasses } from '@/shared/Common/cssComponent';
import Select from 'react-select';

const ExpensesForm: React.FC<FormProps> = ({ formData: initialFormData, isUpdate }) => {
    const { formData, setFormData, handleInputChange, handleSubmit, handleUpdate } = useExpensesForm();
    const { typePaymentOptions } = useTypePaymentOptions();
    const { bankOptions } = useBankOptions();

    useEffect(() => {
        if (isUpdate && initialFormData) {
            handleSetInitialFormData(initialFormData);
        }
    }, [isUpdate, initialFormData]);

    const handleSetInitialFormData = (initialData: IExpensesPost) => {
        const initialFormData = new ExpensesDto;
        Object.assign(initialFormData, initialData)
        setFormData(initialFormData)
    };

    const handleSelectChange = (selectedOption: any, fieldName: keyof IExpensesPost) => {
        setFormData({
            ...formData,
            [fieldName]: selectedOption.value
        });
    };

    const onSubmitHandler = isUpdate ? handleUpdate : handleSubmit;

    return (
        <form onSubmit={onSubmitHandler} className="max-w-md mx-auto mt-8">
            {/* Campos del formulario de CategorytPay */}

            <div className="mb-2">
                <label className="block text-sm font-medium text-gray-600">Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
            </div>

            <div className="mb-2">
                <label className="block text-sm font-medium text-gray-600">Description</label>
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
            </div>

            <div className="mb-2">
                <label className="block text-sm font-medium text-gray-600">Amount</label>
                <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
            </div>

            <div className="mb-2">
                <label className="block text-sm font-medium text-gray-600">Voucher</label>
                <input
                    type="text"
                    name="voucher"
                    value={formData.voucher}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
            </div>

            <div className="mb-2">
                <label className="block text-sm font-medium text-gray-600">Número de documento</label>
                <input
                    type="text"
                    name="documentNumber"
                    value={formData.documentNumber}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
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
                <label className="block text-sm font-medium text-gray-600">Banco:</label>
                <Select
                    className={TableSelectsClasses}
                    options={bankOptions.map(tPay => ({
                        value: tPay.id,
                        label: tPay.bankName
                    }))}
                    value={bankOptions.map(tPay => ({
                        value: tPay.id,
                        label: tPay.bankName
                    })).find(option => option.value === formData.fkBankAccount)}
                    onChange={(selectedOption) => handleSelectChange(selectedOption, 'fkBankAccount')}
                    isSearchable
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
