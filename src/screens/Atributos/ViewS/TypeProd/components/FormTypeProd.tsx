import { useEffect } from 'react';
import { useTypeProdForm } from "../hooks/useTypeProdForm";
import { FormProps } from '@/components/Generics/Interface/IForms';
import { TypeProdDto, ITypeProd } from '@/shared/interfaces/ITypeProd';

const TypeProdForm: React.FC<FormProps> = ({ formData: initialFormData, isUpdate }) => {
  const { formData, setFormData, handleInputChange, handleSubmit, handleUpdate } = useTypeProdForm();

  useEffect(() => {
    if (isUpdate && initialFormData) {
      handleSetInitialFormData(initialFormData);
    }
  }, [isUpdate, initialFormData]);

  const handleSetInitialFormData = (initialData: ITypeProd) => {
    const initialFormData = new TypeProdDto();
    Object.assign(initialFormData, initialData);
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
        <input
          type="hidden"
          name="id"
          value={formData.id}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Tipo Producto</label>
        <input
          type="text"
          name={!isUpdate ? "typeProd" : "type"}
          value={!isUpdate ? formData.typeProd : formData.type}
          onChange={handleInputChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
        {isUpdate ? "Actualizar" : "Guardar"}
      </button>
    </form>
  );
};

export default TypeProdForm;
