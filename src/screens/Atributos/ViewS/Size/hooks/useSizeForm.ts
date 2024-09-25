import { useEffect, useState } from 'react';
import { SaveSize, UpdateSize } from '@/shared/Api/SizeApi';
import { GenericRequest } from '@/shared/RequestsApi/GenericRequest';
import { SizePostDto, ISize, SizeUpdateDto } from '@/shared/interfaces/ISize';
import showGenericNotification from '@/util/antd/notification';
import showConfirm from '@/util/antd/confirm';

export const useSizeForm = () => {
  const [formData, setFormData] = useState<ISize>(new SizePostDto());
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    showConfirm({
      title: "Confirmar envío",
      content: "¿Está seguro de que desea enviar los datos de la categoría de talla?",
      onOk: () => {
        GenericRequest(formData, SaveSize, "Datos de categoría de talla enviados correctamente")
          .then((response: any) => {
            showGenericNotification({ isSuccess: true, title: 'Éxito', message: response.message });
            setIsSuccess(true);
          })
          .catch((error) => {
            const errorMessage = 'Hubo un error al crear la talla'; 
            showGenericNotification({ isSuccess: false, title: 'Error', message: errorMessage });
            console.error("Error submitting CategorySize data:", error);
          });
      },
    });
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const updateData: ISize = new SizeUpdateDto(formData);

    showConfirm({
      title: "Confirmar actualización",
      content: "¿Está seguro de que desea actualizar los datos de la categoría de talla?",
      onOk: () => {
        GenericRequest(updateData, UpdateSize, "Datos de categoría de talla actualizados correctamente")
          .then((response: any) => {
            showGenericNotification({ isSuccess: true, title: 'Éxito', message: response.message });
            setIsSuccess(true);
          })
          .catch((error) => {
            const errorMessage = 'Hubo un error al actualizar las tallas'; 
            showGenericNotification({ isSuccess: false, title: 'Error', message: errorMessage });
            console.error("Error updating CategorySize data:", error);
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

  return { formData, setFormData, handleInputChange, handleSubmit, handleUpdate, handleSelect };
};
