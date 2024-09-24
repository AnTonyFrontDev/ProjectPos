import { useState } from 'react';
import { ClientPhoneDto } from '@/shared/interfaces/IClientPhone';
import { ClientUpdateDto, ClientPostDto, IClient } from '@/shared/interfaces/IClient';
import { saveClient, UpdateClient } from '@/shared/Api/CustomersApi';
import { GenericRequest } from '@/shared/RequestsApi/GenericRequest';
import showGenericNotification from '@/util/antd/notification';
import showConfirm from '@/util/antd/confirm';

export const useClientForm = () => {
  const [formData, setFormData] = useState<IClient>(new ClientPostDto());

  const addPhone = () => {
    setFormData((prevClientPost) => ({
      ...prevClientPost,
      phonesClient: [...(prevClientPost.phonesClient ?? []), new ClientPhoneDto()],
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePhoneInputChange = (index: number, field: string, value: string) => {
    setFormData((prevClientPost) => {
      const updatedPhonesClient = (prevClientPost.phonesClient ?? []).map((phone, i) =>
        i === index ? { ...phone, [field]: value } : phone
      );

      return {
        ...prevClientPost,
        phonesClient: updatedPhonesClient,
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    showConfirm({
      title: 'Confirmación',
      content: '¿Estás seguro de que deseas guardar estos datos del cliente?',
      onOk: () => {
        console.log('Client Data:', formData);
        
        GenericRequest(formData, saveClient, "Client data submitted successfully")
          .then(() => {
            showGenericNotification({
              isSuccess: true,
              title: "Éxito",
              message: "Datos del cliente guardados correctamente",
            });
            window.location.reload(); // Recargar la página después del éxito
          })
          .catch((error) => {
            console.error("Error submitting Client data:", error);
            showGenericNotification({
              isSuccess: false,
              title: "Error",
              message: "Hubo un error al guardar los datos del cliente",
            });
          });
      },
    });
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    showConfirm({
      title: 'Confirmación',
      content: '¿Estás seguro de que deseas actualizar estos datos del cliente?',
      onOk: () => {
        const updateData: IClient = new ClientUpdateDto(formData);
        console.log('Client Data:', updateData);
        
        GenericRequest(updateData, UpdateClient, "Client data updated successfully")
          .then(() => {
            showGenericNotification({
              isSuccess: true,
              title: "Éxito",
              message: "Datos del cliente actualizados correctamente",
            });
            window.location.reload(); // Recargar la página después del éxito
          })
          .catch((error) => {
            console.error("Error submitting Client data:", error);
            showGenericNotification({
              isSuccess: false,
              title: "Error",
              message: "Hubo un error al actualizar los datos del cliente",
            });
          });
      },
    });
  };

  return { formData, setFormData, handleInputChange, addPhone, handlePhoneInputChange, handleSubmit, handleUpdate };
};
