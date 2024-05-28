import { useState } from 'react';
import { GenericRequest } from '@/shared/RequestsApi/GenericRequest';
import { PaymentDto, IPaymentPost } from '@/shared/interfaces/payment/IPaymentPost';
import { PaymentUpdateDto, IPaymentUpdate } from '@/shared/interfaces/payment/IPaymentUpdate';
import { SavePayment, UpdatePayment } from '@/shared/Api/Payment/PaymentApi';
import { getPaymentTypes } from '@/shared/Api/Payment/PaymentType/PaymentTypeApi';
import { IOptionSelect } from '@/components/FormularioV4/Config/interface';
import { getBankAccounts } from '@/shared/Api/BankAccount/BankAccountApi';



export const usePaymentForm = () => {
  const [formData, setFormData] = useState<IPaymentPost>(new PaymentDto());
  const [typePaymentOptions, setTypePaymentOptions] = useState<IOptionSelect[]>([]);
  const [bankAccountOptions, setBankAccountOptions] = useState<IOptionSelect[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Payment Data:', formData);
    GenericRequest(formData, SavePayment, "Payment data submitted successfully");
  };
  
  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const updateData: IPaymentUpdate = new PaymentUpdateDto(formData);
    console.log('Payment Data:', updateData);
    GenericRequest(updateData, UpdatePayment, "Payment data updated successfully");
  };

  const loadTypePaymentOptions = async () => {
    try {
      const paymentTypes = await getPaymentTypes(); // Llama a la función para obtener los tipos de pago
      const options: IOptionSelect[] = paymentTypes.map((type : any) => ({
        value: type.id,
        label: type.type, 
      }));
      setTypePaymentOptions(options);
    } catch (error) {
      console.error('Error al cargar los tipos de pago:', error);
    }
  };

  const loadBankAccountOptions = async () => {
    try {
      const paymentTypes = await getBankAccounts(); // Llama a la función para obtener los tipos de pago
      const options: IOptionSelect[] = paymentTypes.map((data : any) => ({
        value: data.id,
        label: `${data.account} - ${data.bankType}` 
      }));
      setBankAccountOptions(options);
    } catch (error) {
      console.error('Error al cargar los tipos de pago:', error);
    }
  };

  return { formData, 
    setFormData, 
    handleInputChange, 
    handleSubmit, 
    handleUpdate, 
    typePaymentOptions,
    bankAccountOptions,
    loadBankAccountOptions, 
    loadTypePaymentOptions };
};
