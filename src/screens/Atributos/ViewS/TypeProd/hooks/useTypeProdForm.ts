import { useState, useEffect } from 'react';
import { GenericRequest } from '@/shared/RequestsApi/GenericRequest';
import { TypeProdDto, ITypeProd, TypeProdUpdateDto } from '@/shared/interfaces/ITypeProd';
import { SaveTypeProd, UpdateTypeProd } from '@/shared/Api/TypeProduct';
import showConfirm from '@/util/antd/confirm';
import showGenericNotification from '@/util/antd/notification';

export const useTypeProdForm = () => {
  const [formData, setFormData] = useState<ITypeProd>(new TypeProdDto());
  const [isSuccess, setIsSuccess] = useState(false); // Para manejar el estado de éxito

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showConfirm({
      title: 'Confirmar Envío',
      content: '¿Está seguro de que desea guardar este tipo de producto?',
      onOk: () => {
        GenericRequest(formData, SaveTypeProd, "Datos del tipo de producto enviados correctamente")
          .then((response: any) => {
            const message = response.message; 
            showGenericNotification({
              isSuccess: true,
              title: 'Éxito',
              message: message, 
            });
            setIsSuccess(true); 
          })
          .catch((error) => {
            console.error("Error enviando los datos del tipo de producto:", error);
            const errorMessage = error?.message || 'Falló al guardar el tipo de producto'; // Mensaje de error seguro
            showGenericNotification({
              isSuccess: false,
              title: 'Error',
              message: errorMessage,
            });
          });
      },
    });
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const updateData: ITypeProd = new TypeProdUpdateDto(formData);

    showConfirm({
      title: 'Confirmar Actualización',
      content: '¿Está seguro de que desea actualizar este tipo de producto?',
      onOk: () => {
        GenericRequest(updateData, UpdateTypeProd, "Datos del tipo de producto actualizados correctamente")
          .then((response: any) => {
            const message = response.message; 
            showGenericNotification({
              isSuccess: true,
              title: 'Éxito',
              message: message, 
            });
            setIsSuccess(true); 
          })
          .catch((error) => {
            console.error("Error actualizando los datos del tipo de producto:", error);
            const errorMessage = error?.message || 'Falló al actualizar el tipo de producto'; // Mensaje de error seguro
            showGenericNotification({
              isSuccess: false,
              title: 'Error',
              message: errorMessage,
            });
          });
      },
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
