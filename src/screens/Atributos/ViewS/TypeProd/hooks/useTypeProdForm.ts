import { useState } from 'react';
import { GenericRequest } from '@/shared/RequestsApi/GenericRequest';
import { TypeProdDto, ITypeProd, TypeProdUpdateDto } from '@/shared/interfaces/ITypeProd';
import { SaveTypeProd, UpdateTypeProd } from '@/shared/Api/TypeProduct';
import showConfirm from '@/util/antd/confirm';
import showGenericNotification from '@/util/antd/notification';


export const useTypeProdForm = () => {
  const [formData, setFormData] = useState<ITypeProd>(new TypeProdDto());

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showConfirm({
      title: 'Confirmar Envio',
      content: 'Are you sure you want to save this type product?',
      onOk: () => {
        GenericRequest(formData, SaveTypeProd, "TypeProd data submitted successfully")
          .then(() => {
            showGenericNotification({
              isSuccess: true,
              title: 'Success',
              message: 'Type Product saved successfully!',
            });
            window.location.reload();
            // Optional: Trigger a table reload via a callback instead of reloading the page
            //handleReloadTable();
          })
          .catch((error) => {
            showGenericNotification({
              isSuccess: false,
              title: 'Error',
              message: 'Failed to save Type Product.',
            });
            console.error("Error submitting TypeProd data:", error);
          });
      },
    });
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const updateData: ITypeProd = new TypeProdUpdateDto(formData);

    showConfirm({
      title: 'Confirm Update',
      content: 'Are you sure you want to update this type product?',
      onOk: () => {
        GenericRequest(updateData, UpdateTypeProd, "TypeProd data updated successfully")
          .then(() => {
            showGenericNotification({
              isSuccess: true,
              title: 'Success',
              message: 'Type Product updated successfully!',
            });
            window.location.reload();
          })
          .catch((error) => {
            showGenericNotification({
              isSuccess: false,
              title: 'Error',
              message: 'Failed to update Type Product.',
            });
            console.error("Error updating TypeProd data:", error);
          });
      },
    });
  };

  return { formData, setFormData, handleInputChange, handleSubmit, handleUpdate };
};
