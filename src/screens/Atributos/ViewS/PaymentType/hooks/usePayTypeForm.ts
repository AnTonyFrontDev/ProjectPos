import { useState } from 'react';
import { GenericRequest } from '@/shared/RequestsApi/GenericRequest';
import { PaymentTypeUpdateDto, IPaymentTypeUpdate } from '@/shared/interfaces/payment/paymentType/IPaymentTypeUpdate';
import { SavePaymentType, UpdatePaymentType } from '@/shared/Api/Payment/PaymentType/PaymentTypeApi';
import { IPaymentTypePost, PaymentTypePostDto } from '@/shared/interfaces/payment/paymentType/IPaymentTypePost';

export const usePaymentTypeForm = () => {
  const [formData, setFormData] = useState<IPaymentTypePost>(new PaymentTypePostDto());

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('CategorySize Data:', formData);
    GenericRequest(formData, SavePaymentType, "CategorySize data submitted successfully");
  };
  
  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const updateData: IPaymentTypeUpdate = new PaymentTypeUpdateDto(formData);
    console.log('CategorySize Data:', updateData);
    GenericRequest(updateData, UpdatePaymentType, "CategorySize data updated successfully");
  };

  return { formData, setFormData, handleInputChange, handleSubmit, handleUpdate };
};
