import { useState } from 'react';
import { GenericRequest } from '@/shared/RequestsApi/GenericRequest';
import { SaveBank, UpdateBank } from '@/shared/Api/BankApi';
import { BankDto, IBank, BankUpdateDto } from '@/shared/interfaces/IBank';

export const useBankForm = () => {
  const [formData, setFormData] = useState<IBank>(new BankDto());

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log('Bank Data:', formData);
    GenericRequest(formData, SaveBank, "Bank data submitted successfully")
    .then(() => {
      window.location.reload();
    })
    .catch((error) => {
      console.error("Error submitting Bank data:", error);
    });
  };
  
  const handleUpdate = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const updateData: IBank = new BankUpdateDto(formData);
    console.log('Bank Data:', updateData);
    GenericRequest(updateData, UpdateBank, "Bank data updated successfully");
  };

return { formData, setFormData, handleInputChange, handleSubmit, handleUpdate };
};
