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
    console.log('PaymentType Data:', formData);
  
    GenericRequest(formData, SavePaymentType, "PaymentType data submitted successfully")
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error submitting PaymentType data:", error);
      });
  };
  
  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const updateData: IPaymentTypeUpdate = new PaymentTypeUpdateDto(formData);
    console.log('PaymentType Data:', updateData);
    GenericRequest(updateData, UpdatePaymentType, "PaymentType data updated successfully");
    window.location.reload();
  };

  return { formData, setFormData, handleInputChange, handleSubmit, handleUpdate };
};
