import { useEffect, useState } from 'react';
import { ClientPhoneDto } from '@/shared/interfaces/IClientPhone';
import { ClientUpdateDto, ClientPostDto, IClient } from '@/shared/interfaces/IClient';
import { saveClient, UpdateClient } from '@/shared/Api/CustomersApi';
import { GenericRequest } from '@/shared/RequestsApi/GenericRequest';
import showGenericNotification from '@/util/antd/notification';
import showConfirm from '@/util/antd/confirm';

export const useClientForm = () => {
  const [formData, setFormData] = useState<IClient>(new ClientPostDto());
  const [isSuccess, setIsSuccess] = useState(false);

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
        GenericRequest(formData, saveClient, "Client data submitted successfully")
          .then((response: any) => {
            showGenericNotification({ isSuccess: true, title: 'Éxito', message: response.message });
            setIsSuccess(true);
          })
          .catch((error) => {
            const errorMessage = 'Hubo un error al crear el cliente';
            showGenericNotification({ isSuccess: false, title: 'Error', message: errorMessage });
            console.error("Error submitting CategorySize data:", error);
          });
      },
    });
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const updateData: IClient = new ClientUpdateDto(formData);

    showConfirm({
      title: 'Confirmar Actualización',
      content: '¿Estás seguro de que deseas actualizar estos datos del cliente?',
      onOk: () => {
        GenericRequest(updateData, UpdateClient, "Client data updated successfully")
          .then((response: any) => {
            showGenericNotification({ isSuccess: true, title: 'Éxito', message: response.message });
            setIsSuccess(true);
          })
          .catch((error) => {
            const errorMessage = 'Hubo un error al actualizar el cliente';
            showGenericNotification({ isSuccess: false, title: 'Error', message: errorMessage });
            console.error("Error updating Client data:", error);
          });
      },
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

  return { formData, setFormData, handleInputChange, addPhone, handlePhoneInputChange, handleSubmit, handleUpdate };
};
