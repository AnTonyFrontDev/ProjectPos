//TypesForm.tsx
import React, { useState} from 'react';
import { FormDataType } from '../Config/interface';
import { f_DataFieldsType } from '../Config/data';
import { SendTypes } from '../Config/SendForm';
import { initialFormDataType } from '../Config/FormConfig';
import Form from './Form';

const TypesForm: React.FC = () => {
//#region Hooks
  const initialFormData = initialFormDataType;
  const [formData, setFormData] = useState<FormDataType>(initialFormData);
  const handleSubmit = () => {
    SendTypes(formData);
  };
  const dataFields = f_DataFieldsType();
//#endregion
  return (
    <Form
      formDataFields={dataFields}
      formData={formData}
      setFormData={setFormData}
      onSubmit={handleSubmit}
    />
  );
};

export default TypesForm;
