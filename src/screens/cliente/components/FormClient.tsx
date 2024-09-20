// TuComponente.tsx

import { FormProps } from "@/components/Generics/Interface/IForms";
import { useClientForm } from "../hooks/useClientForm";
import { useEffect } from "react";
import { ClientPostDto, IClient } from '@/shared/interfaces/IClient';

const ClientForm: React.FC<FormProps> = ({ formData: initialFormData, isUpdate }) => {
    const { formData, setFormData, handleInputChange, addPhone, handlePhoneInputChange, handleSubmit, handleUpdate } = useClientForm();

    useEffect(() => {
        if (isUpdate && initialFormData) {
            handleSetInitialFormData(initialFormData);
            console.log(initialFormData);
        }
    }, [isUpdate, initialFormData]);

    const handleSetInitialFormData = (initialData: IClient) => {
        const initialFormData = new ClientPostDto;
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
        <form onSubmit={onSubmitHandler} className="max-w-md mx-auto mt-8">
            {/* Campos del formulario cliente */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Primer Nombre:</label>
                <input
                    type="text"
                    name="f_name"
                    value={formData.f_name}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    required
                    onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity('Este campo es obligatorio')}
                    onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')} 
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Segundo Nombre</label>
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
            {isUpdate ? (
                formData.phones?.map((phone: any, index: any) => (
                    <div className="mb-4" key={index}>
                        <label className="block text-sm font-medium text-gray-600">Número Teléfono</label>
                        <input
                            type="text"
                            name={`number-${index}`}
                            value={phone.number}
                            disabled={true}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        />
                        <label className="text-sm font-medium text-gray-600">Tipo Teléfono</label>
                        <input
                            type="text"
                            name={`type-${index}`}
                            value={phone.type}
                            disabled={true}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        />
                    </div>
                ))
            ) : (
                formData.phonesClient?.map((phone, index) => (
                    <div className="mb-4" key={index}>
                        <label className="block text-sm font-medium text-gray-600">Número Teléfono</label>
                        <input
                            type="text"
                            name={`number-${index}`}
                            value={phone.number}
                            onChange={(e) => handlePhoneInputChange(index, 'number', e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        />
                        <label className="text-sm font-medium text-gray-600">Tipo Teléfono</label>
                        <input
                            type="text"
                            name={`type-${index}`}
                            value={phone.type}
                            onChange={(e) => handlePhoneInputChange(index, 'type', e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        />
                    </div>
                ))
            )}
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
