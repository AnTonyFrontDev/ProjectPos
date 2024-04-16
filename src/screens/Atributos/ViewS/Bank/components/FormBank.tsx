// import React from 'react';
import { useEffect } from "react";

import { useBankForm } from "../hooks/useBankForm";
import { FormProps } from '@/components/Generics/Interface/IForms';
import { BankDto, IBankPost } from '@/shared/interfaces/Bank/IBankPost';
import ConfirmationModal from '@/components/Generics/Modal/ConfirmModal';


const BankForm: React.FC<FormProps> = ({ formData: initialFormData, isUpdate }) => {
    const { formData, setFormData, isConfirmationVisible, handleConfirmationClose, handleInputChange, handleSubmit, handleUpdate } = useBankForm();

    useEffect(() => {
        if (isUpdate && initialFormData) {
            handleSetInitialFormData(initialFormData);
            console.log(initialFormData);
        }
    }, [isUpdate, initialFormData]);

    const handleSetInitialFormData = (initialData: IBankPost) => {
        const initialFormData = new BankDto;
        Object.assign(initialFormData, initialData)
        setFormData(initialFormData)
    };

    const onSubmitHandler = isUpdate ? handleUpdate : handleSubmit;
    console.log(formData)
    return (
        <>
            <form onSubmit={onSubmitHandler} className="max-w-md mx-auto mt-8">
                {/* Campos del formulario del banco */}
                <div className="mb-4">
                    <input
                        type="text"
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

                {/* Botón de envío */}

                <button type="submit" className="bg-blue-500 text-white p-2 rounded-md" >
                    {isUpdate ? "Update" : "Submit"}
                </button>
            </form>
            <ConfirmationModal
                visible={isConfirmationVisible}
                message="Bank data updated successfully"
                okLink="/atributos/Bank"
                onConfirm={handleConfirmationClose}
                onCancel={handleConfirmationClose}
            />

        </>
    );
};

export default BankForm;
