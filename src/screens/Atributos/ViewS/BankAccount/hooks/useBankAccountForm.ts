import { useState } from 'react';
import { GenericRequest } from '@/shared/RequestsApi/GenericRequest';
import { BankAccountUpdateDto, BankAccountDto, IBankAccount} from '@/shared/interfaces/IBankAccount';
import { SaveBankAccount, UpdateBankAccount } from '@/shared/Api/BankAccountApi';
import { IOptionSelect } from '@/components/FormularioV4/Config/interface';
import { getBanks } from '@/shared/Api/BankApi';

export const useBankAccountForm = () => {
  const [formData, setFormData] = useState<IBankAccount>(new BankAccountDto());
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
    const updateData: IBankAccount = new BankAccountUpdateDto(formData);
    console.log('BankAccount Data:', updateData);
    GenericRequest(updateData, UpdateBankAccount, "BankAccount data updated successfully");;
  };

  const loadBankOptions = async () => {
    try {
      const banks = await getBanks();  
      const options: IOptionSelect[] = banks.data.map((bank : any) => ({
        value: bank.id,
        label: bank.bankName, 
      }));
      setBankOptions(options);
    } catch (error) {
      console.error('Error al cargar los tipos banco:', error);
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
