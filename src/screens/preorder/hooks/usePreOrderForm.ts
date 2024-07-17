import { useState } from 'react';
import { GenericRequest } from '@/shared/RequestsApi/GenericRequest';
import { ExpensesDto, IExpensesPost } from '@/shared/interfaces/Expenses/IExpensesPost';
import { SaveExpenses, UpdateExpenses } from '@/shared/Api/Expenses/ExpensesApi';
import { ExpensesUpdateDto, IExpensesUpdate } from '@/shared/interfaces/Expenses/IExpensesUpdate';

export const usePreOrderForm = () => {
  const [formData, setFormData] = useState<IExpensesPost>(new ExpensesDto());

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Expenses Data:', formData);
    GenericRequest(formData, SaveExpenses, "Expenses data submitted successfully");
    window.location.reload();
  };
  
const handleSelect = (e : React.ChangeEvent<HTMLSelectElement>) =>{
    e.preventDefault();
    const {name,value} = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value } ));
    console.log(formData)
  }

  //no funciona temporal --
  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const updateData: IExpensesUpdate = new ExpensesUpdateDto(formData as IExpensesUpdate);
    console.log('Expenses Data:', updateData);
    GenericRequest(updateData, UpdateExpenses, "Expenses data updated successfully");
    window.location.reload();
  };

  return { formData, setFormData, handleInputChange, handleSubmit, handleUpdate,handleSelect };
};
