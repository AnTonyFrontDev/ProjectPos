import { useEffect, useState } from 'react';
import { GenericRequest } from '@/shared/RequestsApi/GenericRequest';
import { ISupplier, SupplierDto, SupplierUpdateDto } from '@/shared/interfaces/ISupplier';
import { addSupplier, UpdateSupplier } from '@/shared/Api/SupplierApi';
import showConfirm from '@/util/antd/confirm';
import showGenericNotification from '@/util/antd/notification';

export const useSupplierForm = () => {
  const [formData, setFormData] = useState<ISupplier>(new SupplierDto());
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    showConfirm({
      title: "Confirmar envío",
      content: "¿Está seguro de que desea enviar los datos del suplidor?",
      onOk: () => {
        GenericRequest(formData, addSupplier, "Datos de suplidor enviados correctamente")
          .then((response: any) => {
            const { message } = response.message; // Extraer el message de la respuesta
            showGenericNotification({ isSuccess: true, title: 'Éxito', message: message});
            setIsSuccess(true);
          })
          .catch((error) => {
            console.error("Error submitting supplier data:", error);
            showGenericNotification({ isSuccess: false, title: 'Error', message: 'Hubo un error al agregar el suplidor' });
          });
      },
    });
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
  
    const updateData: ISupplier = new SupplierUpdateDto(formData as ISupplier);
  
    showConfirm({
      title: "Confirmar actualización",
      content: "¿Está seguro de que desea actualizar los datos del suplidor?",
      onOk: () => {
        GenericRequest(updateData, UpdateSupplier, "Datos de suplidor actualizados correctamente")
          .then((response: any) => {
            const message = response.message;
            showGenericNotification({ isSuccess: true, title: 'Éxito', message });
            setIsSuccess(true);
          })
          .catch((error) => {
            console.error("Error updating supplier data:", error);
            const errorMessage = error?.message || 'Hubo un error al actualizar el suplidor'; // Safely access the error message
            showGenericNotification({ isSuccess: false, title: 'Error', message: errorMessage });
          });
      }
    });
  };

  useEffect(() => {
    if (isSuccess) {
      window.location.reload();
      setIsSuccess(false);
    }
  }, [isSuccess]);

  return { formData, setFormData, handleInputChange, handleSubmit, handleUpdate };
};
