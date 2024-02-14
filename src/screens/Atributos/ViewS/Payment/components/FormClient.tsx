// import React from 'react';
import { useBankForm } from "../hooks/useBankForm";

const BankForm = () => {
    const { formData, handleInputChange, handleSubmit } = useBankForm();

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
            {/* Campos del formulario del banco */}
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
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
                Submit
            </button>
        </form>
    );
};

export default BankForm;
