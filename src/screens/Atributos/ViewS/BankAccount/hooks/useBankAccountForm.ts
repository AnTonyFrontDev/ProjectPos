import { useState } from 'react';
import { GenericRequest } from '@/shared/RequestsApi/GenericRequest';
import { BankAccountDto, IBankAccountPost } from '@/shared/interfaces/BankAccount/IBankAccountPost';
import { SaveBankAccount, UpdateBankAccount } from '@/shared/Api/BankAccount/BankAccountApi';
import { BankAccountUpdateDto, IBankAccountUpdate } from '@/shared/interfaces/BankAccount/IBankAccountUpdate';
import { IOptionSelect } from '@/components/FormularioV4/Config/interface';
import { getBanks } from '@/shared/Api/Bank/BankApi';

export const useBankAccountForm = () => {
  const [formData, setFormData] = useState<IBankAccountPost>(new BankAccountDto());
  const [bankOptions, setBankOptions] = useState<IOptionSelect[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('BankAccount Data:', formData);
    GenericRequest(formData, SaveBankAccount, "BankAccount data submitted successfully");
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const updateData: IBankAccountUpdate = new BankAccountUpdateDto(formData);
    console.log('BankAccount Data:', updateData);
    GenericRequest(updateData, UpdateBankAccount, "BankAccount data updated successfully");;
  };

  const loadBankOptions = async () => {
    try {
      const paymentTypes = await getBanks(); // Llama a la función para obtener los tipos de pago
      const options: IOptionSelect[] = paymentTypes.map((type : any) => ({
        value: type.id,
        label: type.bankName, 
      }));
      setBankOptions(options);
    } catch (error) {
      console.error('Error al cargar los tipos de pago:', error);
    }
  };


return { formData,
  bankOptions,
  loadBankOptions, 
  setFormData, 
  handleInputChange, 
  handleSubmit, 
  handleUpdate };
};
