import { useEffect, useState } from 'react';
import { usePaymentForm } from "../hooks/usePaymentForm";
import { FormProps } from '@/components/Generics/Interface/IForms';
import { IPaymentPostPut, PaymentDto } from '@/shared/interfaces/IPayment';
import Select from 'react-select';
import { TableSelectsClasses } from '@/shared/Common/stylesConst/cssComponent';
import showAlert from '@/util/antd/alert';

const PaymentForm: React.FC<FormProps> = ({ formData: initialFormData, isUpdate }) => {
    const {
        formData,
        typePaymentOptions,
        bankAccountOptions,
        preOrderOptions,
        preOrderPending,
        loadPreOrderOptions,
        loadBankAccountOptions,
        setFormData,
        handleInputChange,
        handleSubmit,
        handleUpdate,
        loadTypePaymentOptions,
        handleSubmitCredit,
    } = usePaymentForm();

    console.log('formDataPending:', preOrderPending);

    const [selectedPaymentType, setSelectedPaymentType] = useState<string | null>(null);
    const [isCreditPayment, setIsCreditPayment] = useState<boolean>(false);
    const [hasNoteCredit, setHasNoteCredit] = useState<boolean>(false);
    const [selectedClient, setSelectedClient] = useState<any>(null); // Store the selected client information
    const [maxAmount, setMaxAmount] = useState(0);
    const [block, setBlock] = useState(Boolean);

    useEffect(() => {
        if (isUpdate && initialFormData) {
            handleSetInitialFormData(initialFormData);
            // console.log(initialFormData);
        }
        loadBankAccountOptions();
        loadPreOrderOptions();
        loadTypePaymentOptions();
    }, [isUpdate, initialFormData]);

    const handleSetInitialFormData = (initialData: IPaymentPostPut) => {
        const initialFormData = new PaymentDto();
        Object.assign(initialFormData, initialData);
        setFormData(initialFormData);
        setSelectedPaymentType(initialData.fkTypePayment.toString());
    };

    const onPaymentTypeChange = (selectedOption: any) => {
        setFormData({ ...formData, fkTypePayment: selectedOption?.value || 0 });
        setSelectedPaymentType(selectedOption?.label || null);
    };

    const onPreOrderChange = (selectedOption: any) => {
        const selectedPreOrder = preOrderPending.find(data => data.id === selectedOption?.value);
        if (selectedPreOrder) {
            const selectedClient = selectedPreOrder.client;
            setHasNoteCredit(selectedClient.hasNoteCredit);
            setSelectedClient(selectedClient);
            //  console.log('selectedClient:', selectedClient);
        }
        setFormData({ ...formData, fkOrder: selectedOption?.value || 0 });
    };

    const onAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const newAmount = parseFloat(value);
        const baseAmount = preOrderPending[0].amountBase || 0; 
        const maxAmount = Math.abs(baseAmount);
        setMaxAmount(maxAmount);
        // If the new amount exceeds the base amount, show an alert
        if (newAmount > maxAmount) {
            showAlert({title: 'error', content:`El monto no puede ser mayor que ${maxAmount}`});
        } else {
            setFormData((prevData) => ({ ...prevData, amount: newAmount }));
        }
    };

    const handleClearForm = () => {
        setFormData(new PaymentDto());
        setSelectedClient(null);       
        setHasNoteCredit(false);       
    };

    useEffect(() => {
        if (formData.fkOrder === 0) {
            setBlock(true);
        } else {
            setBlock(false);
        }
    }, [formData]);

    const onSubmitHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        if (isUpdate) {
            await handleUpdate(event);
        } else if (isCreditPayment) {
            await handleSubmitCredit(event);
        } else {
            await handleSubmit(event);
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className="max-w-md mx-auto mt-8">
            <div className="mb-4">
                <input
                    type="hidden"
                    name="id"
                    value={formData.id}
                    onChange={handleInputChange}
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                    Numero de Pedido:
                </label>
                <Select
                    className={TableSelectsClasses}
                    options={preOrderOptions}
                    value={preOrderOptions.find(
                        (option) => option.value === formData.fkOrder
                    ) || null}
                    onChange={onPreOrderChange}
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                    Tipo de Pago:
                </label>
                <Select
                    className={TableSelectsClasses}
                    options={typePaymentOptions}
                    value={typePaymentOptions.find(
                        (option) => option.value === formData.fkTypePayment
                    )}
                    onChange={onPaymentTypeChange}
                    isDisabled={block}
                />
            </div>

            {hasNoteCredit && (
                <div className="mb-4 flex items-center">
                    <input
                        type="checkbox"
                        id="creditPayment"
                        checked={isCreditPayment}
                        onChange={(e) => setIsCreditPayment(e.target.checked)}
                        className="mr-2"
                        disabled={block}
                    />
                    <label htmlFor="creditPayment" className="text-sm font-medium text-gray-600">
                        Pago a Crédito - {selectedClient?.amountNoteCredit || 0}
                    </label>
                </div>
            )}

            {selectedPaymentType?.toLowerCase() !== 'efectivo' && (
                <>
                    <div className="mb-4">
                        <input
                            type="text"
                            name="accountPayment"
                            value={formData.accountPayment || ''}
                            onChange={handleInputChange}
                            disabled={block}
                            hidden
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">
                            Numero de Doc:
                        </label>
                        <input
                            type="text"
                            name="documentNumber"
                            value={formData.documentNumber || ''}
                            onChange={handleInputChange}
                            disabled={block}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">
                            Cuenta de Banco:
                        </label>
                        <Select
                            className={TableSelectsClasses}
                            options={bankAccountOptions}
                            value={bankAccountOptions.find(
                                (option) => option.value === formData.fkBankAccount
                            )}
                            isDisabled={block}
                            onChange={(selectedOption) =>
                                setFormData({
                                    ...formData,
                                    fkBankAccount: selectedOption?.value || 0,
                                })
                            }
                        />
                    </div>
                </>
            )}

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Cantidad:</label>
                <input
                    type="number"
                    name="amount"
                    value={

                        formData.amount}
                    min={0}
                    max={maxAmount}
                    disabled={block}
                    onChange={onAmountChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
            </div>

            {!isUpdate ? (
                <button type='reset' onClick={handleClearForm} className="bg-gray-500 text-white p-2 mr-2 rounded-md">
                    Limpiar
                </button>
            )
                : null
            }
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
                {isUpdate ? 'Actualizar' : 'Guardar'}
            </button>
        </form>
    );
};

export default PaymentForm;


