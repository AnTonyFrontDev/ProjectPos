import React, { useEffect } from 'react';
import { useSupplierForm } from '../hooks/useSupplierForm';
import { FormProps } from '@/components/Generics/Interface/IForms';
import { ISupplier, SupplierDto } from '@/shared/interfaces/ISupplier';

const SizeForm: React.FC<FormProps> = ({formData: initialFormData, isUpdate}) => {
  const { formData, setFormData, handleInputChange, handleSubmit, handleUpdate } = useSupplierForm();

  useEffect(() => {
    if (isUpdate && initialFormData) {
      handleSetInitialFormData(initialFormData);
    }
  }, [isUpdate, initialFormData]);

  const handleSetInitialFormData = (initialData: ISupplier) => {
    const initialFormData = new SupplierDto;
    Object.assign(initialFormData, initialData)
    setFormData(initialFormData);
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
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Suplidor</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
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

      <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
        {isUpdate ? 'Actualizar' : 'Guardar'}
      </button>
    </form>
  );
};

export default SizeForm;
