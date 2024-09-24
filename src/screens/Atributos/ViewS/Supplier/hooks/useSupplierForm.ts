// useSupplierForm.ts
import { useState } from 'react';
import { GenericRequest } from '@/shared/RequestsApi/GenericRequest';
import { ISupplier, SupplierDto, SupplierUpdateDto } from '@/shared/interfaces/ISupplier';
import { addSupplier, UpdateSupplier } from '@/shared/Api/SupplierApi';

export const useSupplierForm = () => {
  const [formData, setFormData] = useState<ISupplier>(new SupplierDto());

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Size Data:', formData);
  
    GenericRequest(formData, addSupplier, "Datos de Supplidor enviados correctamente")
      .then(() => {
        // window.location.reload();
      })
      .catch((error) => {
        console.error("Error submitting size data:", error);
      });
  };
  
  //no funciona temporal --
  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const updateData: ISupplier = new SupplierUpdateDto(formData as ISupplier);
    console.log('Expenses Data:', updateData);
    GenericRequest(updateData, UpdateSupplier, "Expenses data updated successfully");
    window.location.reload();
  };

  return { formData, setFormData, handleInputChange, handleSubmit, handleUpdate };
};

