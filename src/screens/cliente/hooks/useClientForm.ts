import { useState } from 'react';
import { ClientPhoneDto } from '@/shared/interfaces/Client/IClientPhone';
import { ClientPostDto, IClientPost } from '@/shared/interfaces/Client/IClientPost';
import { saveClient, UpdateClient } from '@/shared/Api/Customers/CustomersApi';
import { GenericRequest } from '@/shared/RequestsApi/GenericRequest';
import { ClientUpdateDto, IClientUpdate } from '@/shared/interfaces/Client/IClientUpdate';

export const useClientForm = () => {
  const [formData, setFormData] = useState<IClientPost | IClientUpdate>(new ClientPostDto());

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
    console.log('Client Data:', formData);
  
    GenericRequest(formData, saveClient, "Client data submitted successfully")
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error submitting Client data:", error);
      });
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const updateData: IClientUpdate = new ClientUpdateDto(formData);
    console.log('Client Data:', updateData);
    GenericRequest(updateData, UpdateClient, "Client data updated successfully")
    .then(() => {
      window.location.reload();
    })
    .catch((error) => {
      console.error("Error submitting Client data:", error);
    });
  };

  return { formData, setFormData, handleInputChange, addPhone, handlePhoneInputChange, handleSubmit, handleUpdate };
};