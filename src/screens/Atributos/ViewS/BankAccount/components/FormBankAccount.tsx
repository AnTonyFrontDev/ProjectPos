// import React from 'react';
import { useEffect } from "react";

import { useBankAccountForm } from "../hooks/useBankAccountForm";
import { FormProps } from '@/components/Generics/Interface/IForms';
import { BankAccountDto, IBankAccountPost } from "@/shared/interfaces/BankAccount/IBankAccountPost";
import Select from 'react-select';
import { TableSelectsClasses } from '@/shared/Common/cssComponent';

const BankAccountForm: React.FC<FormProps> = ({ formData: initialFormData, isUpdate
}) => {
    const { formData,
        bankOptions,
        setFormData,
        handleInputChange,
        handleSubmit,
        handleUpdate,
        loadBankOptions
    } = useBankAccountForm();

    useEffect(() => {
        if (isUpdate && initialFormData) {
            handleSetInitialFormData(initialFormData);
            console.log(initialFormData);
        }
        loadBankOptions();
    }, [isUpdate, initialFormData]);

    const handleSetInitialFormData = (initialData: IBankAccountPost) => {
        const initialFormData = new BankAccountDto;
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
    };
    return (
        <>
            <form onSubmit={onSubmitHandler} className="max-w-md mx-auto mt-8">
                {/* Campos del formulario del banco */}
                <div className="mb-4">
                    <input
                        type="hidden"
                        name="id"
                        value={formData.id}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">Numero de cuenta</label>
                    <input
                        type="text"
                        name="bankAccount"
                        value={formData.bankAccount}
                        onChange={handleInputChange}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">Banco</label>
                    <Select
                        className={TableSelectsClasses}
                        options={bankOptions}
                        value={bankOptions.find((option) => option.value === formData.fkBank)}
                        onChange={(selectedOption) => setFormData({ ...formData, fkBank: selectedOption?.value || 0 })}
                    />
                </div>
                <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Balance</label>
                <input
                    type="number"
                    name="balance"
                    value={formData.balance}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
            </div>

                {/* Botón de envío */}

                <button type="submit" className="bg-blue-500 text-white p-2 rounded-md" >
                    {isUpdate ? "Update" : "Submit"}
                </button>
            </form>
        </>
    );
};

export default BankAccountForm;
