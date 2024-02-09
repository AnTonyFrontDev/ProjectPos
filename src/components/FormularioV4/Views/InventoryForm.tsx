// InventoryForm.tsx
import React, { useState } from 'react';
import { f_DataFieldsInventory } from '../Config/data';
import { SendInventory } from '../Config/SendForm';
import { useFormDataWithOptionsNew } from '../Config/FormUtils';
import Form from './Form';
import { InventoryDto } from '@/shared/interfaces/Inventory/I_Inventory';


const InventoryForm: React.FC = () => {
  //#region Hooks
  const { sizes, colors, products } = useFormDataWithOptionsNew(['colors', 'products', 'sizes'])

  const [formData, setFormData] = useState<InventoryDto>(new InventoryDto());
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
