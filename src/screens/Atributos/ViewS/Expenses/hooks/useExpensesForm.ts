import { useState } from 'react';
import { GenericRequest } from '@/shared/RequestsApi/GenericRequest';
import { ExpensesDto, IExpensesPost } from '@/shared/interfaces/Expenses/IExpensesPost';
import { SaveExpenses, UpdateExpenses } from '@/shared/Api/Expenses/ExpensesApi';
import { ExpensesUpdateDto, IExpensesUpdate } from '@/shared/interfaces/Expenses/IExpensesUpdate';

export const useExpensesForm = () => {
  const [formData, setFormData] = useState<IExpensesPost>(new ExpensesDto());

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Expenses Data:', formData);
    GenericRequest(formData, SaveExpenses, "Expenses data submitted successfully");
  };
  
  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const updateData: IExpensesUpdate = new ExpensesUpdateDto(formData);
    console.log('Expenses Data:', updateData);
    GenericRequest(updateData, UpdateExpenses, "Expenses data updated successfully");
  };

  return { formData, setFormData, handleInputChange, handleSubmit, handleUpdate };
};
