import { useState } from 'react';
import { GenericRequest } from '@/shared/RequestsApi/GenericRequest';
import { PaymentDto, PaymentUpdateDto, IPaymentPostPut } from '@/shared/interfaces/IPayment';
import { SavePayment, UpdatePayment } from '@/shared/Api/PaymentApi';
import { getPaymentTypes } from '@/shared/Api/PaymentTypeApi';
import { IOptionSelect } from '@/components/FormularioV4/Config/interface';
import { getBankAccounts } from '@/shared/Api/BankAccountApi';
import {getPreOrdersPending} from '@/shared/Api/PreOrderApi';



export const usePaymentForm = () => {
  const [formData, setFormData] = useState<IPaymentPostPut>(new PaymentDto());
  const [typePaymentOptions, setTypePaymentOptions] = useState<IOptionSelect[]>([]);
  const [bankAccountOptions, setBankAccountOptions] = useState<IOptionSelect[]>([]);
  const [preOrderOptions, setPreOrderOptions] = useState<IOptionSelect[]>([]);
  const [preOrderPending, setPreOrderPending] = useState<any[]>([]);
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    GenericRequest(formData, SavePayment, "Payment data submitted successfully")
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error submitting Payment data:", error);
      });
  };

  const handleSubmitCredit = (e: React.FormEvent) => {
    e.preventDefault();
  
    GenericRequest(formData, SavePayment, "Payment data submitted successfully")
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error submitting Payment data:", error);
      });
  };
  
  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const updateData: IPaymentPostPut = new PaymentUpdateDto(formData);
    GenericRequest(updateData, UpdatePayment, "Payment data updated successfully");
  };

  const loadTypePaymentOptions = async () => {
    try {
      const paymentTypes = await getPaymentTypes(); 
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
      const paymentTypes = await getBankAccounts(); 
      const options: IOptionSelect[] = paymentTypes.map((data : any) => ({
        value: data.id,
        label: `${data.account} - ${data.bankType}` 
      }));
      setBankAccountOptions(options);
    } catch (error) {
      console.error('Error al cargar los tipos de pago:', error);
    }
  };

  const loadPreOrderOptions = async () => {
    try {
      const preOrder = await getPreOrdersPending(); // Llama a la función para obtener los tipos de pago
      console.log('preOrder:', preOrder);
      const options: IOptionSelect[] = preOrder.map((data : any) => ({
        value: data.id,
        label: `${data.id} - ${data.client.f_name}${data.client.l_name} ${data.client.f_surname} ${data.client.l_surname} - ${data.amountBase}`
      }));
      // setMaxAmount(preOrder[0].amountBase);
      setPreOrderPending(preOrder);
      setPreOrderOptions(options);
    } catch (error) {
      console.error('Error al cargar los pedidos:', error);
    }
  };
  

  return { formData,
    setFormData, 
    handleInputChange, 
    handleSubmit,
    handleSubmitCredit, 
    handleUpdate, 
    typePaymentOptions,
    bankAccountOptions,
    preOrderOptions,
    preOrderPending,
    loadPreOrderOptions, 
    loadBankAccountOptions, 
    loadTypePaymentOptions };
};
