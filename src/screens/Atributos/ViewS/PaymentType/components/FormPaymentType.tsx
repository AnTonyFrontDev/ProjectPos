// import React from 'react';
import { usePaymentTypeForm } from "../hooks/usePayTypeForm";

const PaymentTypeForm = () => {
    const { formData, handleInputChange, handleSubmit } = usePaymentTypeForm();

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
            {/* Campos del formulario del tipo de pago */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Type</label>
                <input
                    type="text"
                    name="type"
                    value={formData.type}
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

export default PaymentTypeForm;
