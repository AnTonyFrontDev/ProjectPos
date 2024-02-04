//ProjectForm.tsx
import React, { useState} from 'react';
import { f_DataFieldsProduct } from '../Config/data';
import { SendProduct } from '../Config/SendForm';
import { useFormDataWithOptionsNew } from '../Config/FormUtils';
import Form from './Form';
import { ProductDto } from '@/shared/interfaces/Product/IProduct';

const ProductForm: React.FC = () => {
//#region Hooks
  const { types } = useFormDataWithOptionsNew(['types']);

  const [formData, setFormData] = useState<ProductDto>(new ProductDto());
  const handleSubmit = () => {
    SendProduct(formData);
  };
  const dataFields = f_DataFieldsProduct(types);
//#endregion
  return (
    <Form
      formDataFields={dataFields}
      formData={formData}
      setFormData={setFormData}
      // optionsSelectDisabled={typeSelectDisabled}
      onSubmit={handleSubmit}
    />
  );
};

export default ProductForm;
