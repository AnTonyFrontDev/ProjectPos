// InventoryForm.tsx
import React, { useState } from 'react';
import { FormDataClient, FormApi } from '../Config/interface';
import { f_DataFieldsClient } from '../Config/data';
import { SendClient} from '../Config/SendForm';
// import { useFormDataWithOptionsNew } from '../Config/FormUtils';
import { initialFormDataClient } from '../Config/FormConfig';
import Form from './Form';


const ProductForm: React.FC<FormApi> = () => {
    //#region Hooks
    //   const { types } = useFormDataWithTypes(getTypes);
      const initialFormData = initialFormDataClient;
      const [formData, setFormData] = useState<FormDataClient>(initialFormData);
      const handleSubmit = () => {
        SendClient(formData);
      };
      const dataFields = f_DataFieldsClient();
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