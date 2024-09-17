// import React from 'react';
import { useEffect } from "react";

import { useBankForm } from "../hooks/useBankForm";
import { FormProps } from '@/components/Generics/Interface/IForms';
import { BankDto, IBank } from "@/shared/interfaces/IBank";

const BankForm: React.FC<FormProps> = ({ formData: initialFormData, isUpdate }) => {
    const { formData, setFormData, handleInputChange, handleSubmit, handleUpdate } = useBankForm();

    useEffect(() => {
        if (isUpdate && initialFormData) {
            handleSetInitialFormData(initialFormData);
            console.log(initialFormData);
        }
    }, [isUpdate, initialFormData]);

    const handleSetInitialFormData = (initialData: IBank) => {
        const initialFormData = new BankDto;
        Object.assign(initialFormData, initialData)
        console.log(initialFormData)
        setFormData(initialFormData)
    };

    const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
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
                    <label className="block text-sm font-medium text-gray-600">Nombre de Banco</label>
                    <input
                        type="text"
                        name={isUpdate ? "bankName" : "name"}
                        value={isUpdate ? formData.bankName : formData.name}
                        onChange={handleInputChange}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                </div>

                {/* Botón de envío */}

                <button type="submit" className="bg-blue-500 text-white p-2 rounded-md" >
                    {isUpdate ? "Actualizar" : "Guardar"}
                </button>
            </form>
        </>
    );
};

export default BankForm;
