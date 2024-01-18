//ProjectForm.tsx
import React, { useState} from 'react';
import { FormDataProducto, FormApi } from '../Config/interface';
import { f_DataFieldsProduct } from '../Config/data';
import { SendProduct } from '../Config/SendForm';
import { useFormDataWithTypes } from '../Config/FormUtils';
import { initialFormDataProducto } from '../Config/FormConfig';
import Form from './Form';

const ProductForm: React.FC<FormApi> = ({ getTypes = async () => [] }) => {
//#region Hooks
  const { types } = useFormDataWithTypes(getTypes);
  const initialFormData = initialFormDataProducto;
  const [formData, setFormData] = useState<FormDataProducto>(initialFormData);
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
