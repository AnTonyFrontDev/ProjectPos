// import React from 'react';
import { useCategorySizeForm } from "../hooks/useCSizeForm";

const CategorySizeForm = () => {
    const { formData, handleInputChange, handleSubmit } = useCategorySizeForm();

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
            {/* Campos del formulario de CategorySize */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Category</label>
                <input
                    type="text"
                    name="category"
                    value={formData.category}
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

export default CategorySizeForm;
