import { useEffect, useState } from 'react';
import { ColorPostDto, ColorUpdateDto, IColor } from '@/shared/interfaces/IColor';
import { SaveColor, UpdateColor } from '@/shared/Api/ColorApi';
import { GenericRequest } from '@/shared/RequestsApi/GenericRequest';
import showGenericNotification from '@/util/antd/notification';
import showConfirm from '@/util/antd/confirm';


export const useColorForm = () => {
  const [formData, setFormData] = useState<IColor>(new ColorPostDto());
  const [isSuccess, setIsSuccess] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleColorChange = (color: { color: string }) => {
    setFormData((prevData) => ({ ...prevData, code: color.color }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    showConfirm({
      title: "Confirmar envío",
      content: "¿Está seguro de que desea enviar los datos el Cliente?",
      onOk: () => {
        GenericRequest(formData, SaveColor, "Datos de Color enviados correctamente")
          .then((response: any) => {
            showGenericNotification({ isSuccess: true, title: 'Éxito', message: response.message });
            setIsSuccess(true);
          })
          .catch((error) => {
            const errorMessage = 'Hubo un error al crear la categoría de talla';
            showGenericNotification({ isSuccess: false, title: 'Error', message: errorMessage });
            console.error("Error submitting CategorySize data:", error);
          });
      },
    });
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
  
    const updateData: IColor = new ColorUpdateDto(formData);
  
    showConfirm({
      title: "Confirmar actualización",
      content: "¿Está seguro de que desea actualizar los datos de la categoría de talla?",
      onOk: () => {
        GenericRequest(updateData, UpdateColor, "Datos de cliente actualizados correctamente")
          .then((response: any) => {
            showGenericNotification({ isSuccess: true, title: 'Éxito', message: response.message });
            setIsSuccess(true);
          })
          .catch((error) => {
            const errorMessage = 'Hubo un error al actualizar la categoría de talla'; 
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

  return { formData, setFormData, handleInputChange, handleColorChange, handleSubmit, handleUpdate };
};
