import { useState } from 'react';
import { PaymentTypePostDto, IPaymentTypePost } from '@/shared/interfaces/payment/paymentType/IPaymentTypePost';
import { GenericRequest } from '@/shared/RequestsApi/GenericRequest';
import { SavePaymentType } from '@/shared/Api/Payment/PaymentType/PaymentTypeApi';

export const usePaymentTypeForm = () => {
  const [formData, setFormData] = useState<IPaymentTypePost>(new PaymentTypePostDto());

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Acciones adicionales antes de enviar los datos del tipo de pago a la base de datos
    console.log('Payment Type Data:', formData);
    GenericRequest(formData, SavePaymentType, "Payment Type data submitted successfully");
  };

  return { formData, handleInputChange, handleSubmit };
};
