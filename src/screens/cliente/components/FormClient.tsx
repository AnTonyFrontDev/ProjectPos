// TuComponente.tsx

import { useClientForm } from "../hooks/useClientForm";

const ClientForm = () => {
    const { formData, handleInputChange, addPhone, handlePhoneInputChange, handleSubmit } = useClientForm();

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
            {/* Campos del formulario cliente */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Nombre:</label>
                <input
                    type="text"
                    name="f_name"
                    value={formData.f_name} 
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Last Name</label>
                <input
                    type="text"
                    name="l_name"
                    value={formData.l_name}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
            </div> 

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Primer Apellido</label>
                <input
                    type="text"
                    name="f_surname"
                    value={formData.f_surname}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Segundo Apellido</label>
                <input
                    type="text"
                    name="l_surname"
                    value={formData.l_surname}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">RNC</label>
                <input
                    type="text"
                    name="rnc"
                    value={formData.rnc}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">DNI</label>
                <input
                    type="text"
                    name="dni"
                    value={formData.dni}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
            </div>

            {/* Sección de teléfonos */}
            {formData.phonesClient.map((phone, index) => (
                <div className="mb-4" key={index}>
                    <label className="text-sm font-medium text-gray-600">Tipo Telefono</label>
                    <input
                        type="text"
                        name={`type-${index}`}
                        value={phone.type}
                        onChange={(e) => handlePhoneInputChange(index, 'type', e.target.value)}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />

                    <label className="block text-sm font-medium text-gray-600">Numero Telefono</label>
                    <input
                        type="text"
                        name={`number-${index}`}
                        value={phone.number}
                        onChange={(e) => handlePhoneInputChange(index, 'number', e.target.value)}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
            ))}

            {/* Botón para agregar más teléfonos */}
            <button type="button" onClick={addPhone} className="bg-gray-300 mx-2 text-gray-700 p-2 rounded-md mb-4">
                Add Phone
            </button>

            {/* Botón de envío */}
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
                Submit
            </button>
        </form>
    );
};

export default ClientForm;
