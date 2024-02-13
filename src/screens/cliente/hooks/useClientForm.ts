import { useState } from 'react';
import { ClientPhoneDto } from '../../../shared/interfaces/Client/IClientPhone';
import { ClientPostDto, IClientPost } from '../../../shared/interfaces/Client/IClientPost';
import { saveClient } from '@/shared/Api/Customers/CustomersApi';
import { GenericRequest } from '@/shared/RequestsApi/GenericRequest';

export const useClientForm = () => {
  const [formData, setFormData] = useState<IClientPost>(new ClientPostDto());

  const addPhone = () => {
    setFormData((prevClientPost) => ({
      ...prevClientPost,
      phonesClient: [...prevClientPost.phonesClient, { ...new ClientPhoneDto() }],
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePhoneInputChange = (index: number, field: string, value: string) => {
    setFormData((prevClientPost) => {
      const updatedPhonesClient = prevClientPost.phonesClient.map((phone, i) =>
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
    // Additional actions before sending the client data to the database
    console.log('Client Data:', formData);
    GenericRequest(formData, saveClient, "Client data submitted successfully");
  };

  return { formData, handleInputChange, addPhone, handlePhoneInputChange, handleSubmit };
};