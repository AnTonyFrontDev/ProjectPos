import { useEffect, useState } from 'react';
import { useExpensesForm } from '../hooks/usePayAccountForm';
import { FormProps } from '@/components/Generics/Interface/IForms';
import { ExpensesDto, IExpensesPost } from '@/shared/interfaces/Expenses/IExpensesPost';
import { getPaymentTypes } from '@/shared/Api/Payment/PaymentType/PaymentTypeApi';
import { IPaymentTypeColumns } from '@/shared/interfaces/payment/paymentType/IPaymentTypeColums';

const ExpensesForm: React.FC<FormProps> = ({ formData: initialFormData, isUpdate }) => {
    const { formData, setFormData, handleInputChange, handleSubmit, handleUpdate } = useExpensesForm();
    //estado para los tipos de pagos
    const [typePayments, setTypePayments] = useState<IPaymentTypeColumns[]>()

    useEffect(() => {
        const fetchData = async () => {
            try {
                //cargando los tipos de pagos    
                const typePayments = await getPaymentTypes()
                //asignandole al estado
                setTypePayments(typePayments)
            } catch (error) {
                console.error('Error al obtener detalle de la preorden:', error);
            }

        };

        fetchData();
    }, []);

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

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Número de documento</label>
                <input
                    type="text"
                    name="documentNumber"
                    value={formData.documentNumber}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
            </div>

            {/* <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Category</label>
                <select
                    name="fkCategory"
                    value={formData.documentNumber}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                >
                    <option value="">Select category</option>
                    {typePayments.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.type}
                        </option>
                    ))}
                </select>
            </div> */}



            {/* Botón de envío */}
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
                {isUpdate ? "Update" : "Submit"}
            </button>
        </form>
    );
};

export default ExpensesForm;
