import { useEffect, useState } from 'react';
import { GenericRequest } from '@/shared/RequestsApi/GenericRequest';
import { ICategorySize, CategorySizeDto, CategorySizeUpdateDto } from '@/shared/interfaces/ICategorySize';
import { SaveCategorySize, UpdateCategorySize } from '@/shared/Api/CategorySizeApi';
import showConfirm from '@/util/antd/confirm';
import showGenericNotification from '@/util/antd/notification';

export const useCategorySizeForm = () => {
  const [formData, setFormData] = useState<ICategorySize>(new CategorySizeDto());
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    showConfirm({
      title: "Confirmar envío",
      content: "¿Está seguro de que desea enviar los datos de la categoría de talla?",
      onOk: () => {
        GenericRequest(formData, SaveCategorySize, "Datos de categoría de talla enviados correctamente")
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
  
    const updateData: ICategorySize = new CategorySizeUpdateDto(formData);
  
    showConfirm({
      title: "Confirmar actualización",
      content: "¿Está seguro de que desea actualizar los datos de la categoría de talla?",
      onOk: () => {
        GenericRequest(updateData, UpdateCategorySize, "Datos de categoría de talla actualizados correctamente")
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

  return { formData, setFormData, handleInputChange, handleSubmit, handleUpdate };
};
