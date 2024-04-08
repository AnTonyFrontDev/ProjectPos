import { useEffect } from 'react';
import { useExpensesForm } from '../hooks/useExpensesForm';
import { FormProps } from '@/components/Generics/Interface/IForms';
import { ExpensesDto, IExpensesPost } from '@/shared/interfaces/Expenses/IExpensesPost';


const ExpensesForm: React.FC<FormProps> = ({ formData: initialFormData, isUpdate }) => {
    const { formData, setFormData, handleInputChange, handleSubmit, handleUpdate } = useExpensesForm();

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

    const onSubmitHandler = isUpdate ? handleUpdate : handleSubmit;

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
                <label className="block text-sm font-medium text-gray-600">Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Description</label>
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Amount</label>
                <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Voucher</label>
                <input
                    type="text"
                    name="voucher"
                    value={formData.voucher}
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
