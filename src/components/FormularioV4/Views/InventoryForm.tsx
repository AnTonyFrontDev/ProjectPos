// InventoryForm.tsx
import React, { useState } from 'react';
import { FormDataInventory, FormApi } from '../Config/interface';
import { f_DataFieldsInventory } from '../Config/data';
import { SendInventory } from '../Config/SendForm';
import { useFormDataWithOptionsNew } from '../Config/FormUtils';
import { initialFormDataInventory } from '../Config/FormConfig';
import Form from './Form';


const InventoryForm: React.FC<FormApi> = () => {
  //#region Hooks
  const { sizes, colors, products } = useFormDataWithOptionsNew(['colors', 'products', 'sizes'])


  const initialFormData = initialFormDataInventory;
  const [formData, setFormData] = useState<FormDataInventory>(initialFormData);
  const handleSubmit = () => {
    SendInventory(formData);
  };
  const dataFields = f_DataFieldsInventory(sizes, colors, products);
  //#endregion

  return (
    <Form
      formDataFields={dataFields}
      formData={formData}
      setFormData={setFormData}
      // optionsSelectDisabled={selectDisabled}
      onSubmit={handleSubmit}
    />
  );
};

export default InventoryForm;
