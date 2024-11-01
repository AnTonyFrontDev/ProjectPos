import { useState } from 'react';
import { GenericRequest } from '@/shared/RequestsApi/GenericRequest';
import {
  getExpensesPending,
  SavePaymentExpenses,
  UpdatePaymentExpenses
} from '@/shared/Api/ExpensesApi';
import { PaymentExpensesDtoAdd, IPaymentExpenses, PaymentExpensesDtoUpdate, IPaymentExpenseSave } from '@/shared/interfaces/IPaymentExpense';

import { IOptionSelect } from '@/components/FormularioV4/Config/interface';
import { getBankAccounts } from '@/shared/Api/BankAccountApi';
import { getPaymentTypes } from '@/shared/Api/PaymentTypeApi';

export const usePayAccountForm = () => {
  const [formData, setFormData] = useState<IPaymentExpenseSave>(new PaymentExpensesDtoAdd());
  const [typePaymentOptions, setTypePaymentOptions] = useState<IOptionSelect[]>([]);
  const [bankAccountOptions, setBankAccountOptions] = useState<IOptionSelect[]>([]);
  const [expenseOptions, setExpenseOptions] = useState<IOptionSelect[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    GenericRequest(formData, SavePaymentExpenses, "PaymentExpenses data submitted successfully");
    window.location.reload();
  };

  //no funciona temporal --
  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const updateData: IPaymentExpenses = new PaymentExpensesDtoUpdate(formData as IPaymentExpenseSave);
    GenericRequest(updateData, UpdatePaymentExpenses, "PaymentExpenses data updated successfully");
    window.location.reload();
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

  const loadExpenseOptions = async () => {
    try {
      const preOrder = await getExpensesPending(); // Llama a la función para obtener los tipos de pago
      const options: IOptionSelect[] = preOrder.map((data : any) => ({
        value: data.id,
        label: `${data.id} - ${data.description} - ${data.documentNumber} - ${data.amountPending}`
      }));
      setExpenseOptions(options);
    } catch (error) {
      console.error('Error al cargar los pedidos:', error);
    }
  };

  return { formData, setFormData, handleInputChange, handleSubmit, handleUpdate,    typePaymentOptions,
    bankAccountOptions,
    expenseOptions, loadExpenseOptions, 
    loadBankAccountOptions, 
    loadTypePaymentOptions };
};
