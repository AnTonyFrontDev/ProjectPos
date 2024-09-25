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
            showGenericNotification({ isSuccess: true, title: 'Éxito', message: response.message });
            setIsSuccess(true);
          })
          .catch((error) => {
            const errorMessage = 'Hubo un error al crear el suplidor'; 
            showGenericNotification({ isSuccess: false, title: 'Error', message: errorMessage });
            console.error("Error updating supplier data:", error);
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
            showGenericNotification({ isSuccess: true, title: 'Éxito', message: response.message });
            setIsSuccess(true);
          })
          .catch((error) => {
            const errorMessage = 'Hubo un error al actualizar el suplidor'; 
            showGenericNotification({ isSuccess: false, title: 'Error', message: errorMessage });
            console.error("Error updating supplier data:", error);
          });
      }
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      setIsSuccess(false);
    }
  }, [isSuccess]);

  return { formData, setFormData, handleInputChange, handleSubmit, handleUpdate };
};
