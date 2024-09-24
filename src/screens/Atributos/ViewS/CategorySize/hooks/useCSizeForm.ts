import { useState } from 'react';
import { CategorySizeDto, ICategorySize, CategorySizeUpdateDto } from '@/shared/interfaces/ICategorySize';
import { SaveCategorySize, UpdateCategorySize } from '@/shared/Api/CategorySizeApi';
import { GenericRequest } from '@/shared/RequestsApi/GenericRequest';
import showConfirm from '@/util/antd/confirm';
import showGenericNotification from '@/util/antd/notification';


export const useCategorySizeForm = () => {
  const [formData, setFormData] = useState<ICategorySize>(new CategorySizeDto());

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Confirmation before submission
    showConfirm({
      title: "Confirmar Envio",
      content: "¿Está seguro de que desea enviar este categoría de Talla?",
      onOk: () => {
        GenericRequest(formData, SaveCategorySize, "CategorySize data submitted successfully")
          .then(() => {
            showGenericNotification({
              isSuccess: true,
              title: "Success",
              message: "La Categoria de Talla se ha guardado correctamente",
            });
            window.location.reload(); // You may want to replace this with a state update for better UX
          })
          .catch((error) => {
            showGenericNotification({
              isSuccess: false,
              title: "Submission Error",
              message: "Failed to submit CategorySize data.",
            });
            console.error("Error submitting CategorySize data:", error);
          });
      },
      onCancel: () => {
        console.log("Submission cancelled");
      },
    });
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const updateData: ICategorySize = new CategorySizeUpdateDto(formData);

    // Confirmation before update
    showConfirm({
      title: "Confirm Update",
      content: "Are you sure you want to update this category size?",
      onOk: () => {
        GenericRequest(updateData, UpdateCategorySize, "CategorySize data updated successfully")
          .then(() => {
            showGenericNotification({
              isSuccess: true,
              title: "Update Success",
              message: "CategorySize has been updated successfully",
            });
            window.location.reload();
          })
          .catch((error) => {
            showGenericNotification({
              isSuccess: false,
              title: "Update Error",
              message: "Failed to update CategorySize data.",
            });
            console.error("Error updating CategorySize data:", error);
          });
      },
      onCancel: () => {
        console.log("Update cancelled");
      },
    });
  };

  return { formData, setFormData, handleInputChange, handleSubmit, handleUpdate };
};
