// FormClientUpdate.tsx
import { ADD_TEXT, DNI_TEXT, FIRST_NAME_TEXT, FIRST_SURNAME_TEXT, MIDDLE_NAME_TEXT, PHONE_TEXT, PHONETYPE_TEXT, RNC_TEXT, SECOND_SURNAME_TEXT, SEND_TEXT } from "@/shared/constants/Labels";
import { useClientForm } from "../hooks/useClientForm";

const ClientForm = () => {
    const { formData, handleInputChange, addPhone, handlePhoneInputChange, handleSubmit } = useClientForm();

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
            {/* Campos del formulario cliente */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">{FIRST_NAME_TEXT}</label>
                <input
                    type="text"
                    name="f_name"
                    value={formData.f_name}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">{MIDDLE_NAME_TEXT}</label>
                <input
                    type="text"
                    name="l_name"
                    value={formData.l_name}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">{FIRST_SURNAME_TEXT}</label>
                <input
                    type="text"
                    name="f_surname"
                    value={formData.f_surname}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">{SECOND_SURNAME_TEXT}</label>
                <input
                    type="text"
                    name="l_surname"
                    value={formData.l_surname}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">{RNC_TEXT}</label>
                <input
                    type="text"
                    name="rnc"
                    value={formData.rnc}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">{DNI_TEXT}</label>
                <input
                    type="text"
                    name="dni"
                    value={formData.dni}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
            </div>

            {/* Sección de teléfonos */}
            {formData.phonesClient?.map((phone, index) => (
                <div className="mb-4" key={index}>
                    <label className="text-sm font-medium text-gray-600">{PHONETYPE_TEXT}</label>
                    <input
                        type="text"
                        name={`type-${index}`}
                        value={phone.type}
                        onChange={(e) => handlePhoneInputChange(index, 'type', e.target.value)}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />

                    <label className="block text-sm font-medium text-gray-600">{PHONE_TEXT}</label>
                    <input
                        type="text"
                        name={`number-${index}`}
                        value={phone.number}
                        onChange={(e) => handlePhoneInputChange(index, 'number', e.target.value)}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
            ))}

            <button type="button" onClick={addPhone} className="bg-gray-300 mx-2 text-gray-700 p-2 rounded-md mb-4">
                {ADD_TEXT} {PHONE_TEXT}
            </button>

            <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
                {SEND_TEXT}
            </button>
        </form>
    );
};

export default ClientForm;
