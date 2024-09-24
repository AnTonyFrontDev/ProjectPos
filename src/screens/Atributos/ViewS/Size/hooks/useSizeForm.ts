import { useState } from 'react';
import { SaveSize, UpdateSize } from '@/shared/Api/SizeApi';
import { GenericRequest } from '@/shared/RequestsApi/GenericRequest';
import { SizePostDto, ISize, SizeUpdateDto } from '@/shared/interfaces/ISize';
import showGenericNotification from '@/util/antd/notification';
import { Modal } from 'antd';

export const useSizeForm = () => {
  const [formData, setFormData] = useState<ISize>(new SizePostDto());

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    Modal.confirm({
      title: 'Confirmación',
      content: '¿Estás seguro de que deseas guardar este tamaño?',
      onOk: async () => {
        try {
          await GenericRequest(formData, SaveSize, "Datos de tamaño enviados correctamente");
          showGenericNotification({
            isSuccess: true,
            title: "Éxito",
            message: "Tamaño guardado correctamente",
          });
          window.location.reload();  // Recargar la página después del éxito
        } catch (error) {
          console.error("Error enviando datos de tamaño:", error);
          showGenericNotification({
            isSuccess: false,
            title: "Error",
            message: "Hubo un error al guardar el tamaño",
          });
        }
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

    Modal.confirm({
      title: 'Confirmación',
      content: '¿Estás seguro de que deseas actualizar este tamaño?',
      onOk: async () => {
        try {
          const updateData: ISize = new SizeUpdateDto(formData as ISize);
          await GenericRequest(updateData, UpdateSize, "Datos de tamaño actualizados correctamente");
          showGenericNotification({
            isSuccess: true,
            title: "Éxito",
            message: "Tamaño actualizado correctamente",
          });
          window.location.reload();  // Recargar la página después del éxito
        } catch (error) {
          console.error("Error actualizando datos de tamaño:", error);
          showGenericNotification({
            isSuccess: false,
            title: "Error",
            message: "Hubo un error al actualizar el tamaño",
          });
        }
      },
    });
  };

  return { formData, setFormData, handleInputChange, handleSubmit, handleUpdate, handleSelect };
};
