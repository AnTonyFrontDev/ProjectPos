import React from 'react';
import ProductForm from './Views/ProductForm';
import TypesForm from './Views/TypesForm';
import InventoryForm from './Views/InventoryForm';
import ClientForm from './Views/ClientForm';

import { getTypes, saveProduct, addType } from '../../shared/Api/ProductsApi';
import { ViewFormProps, FormComponents } from './Config/interface';

const formComponents : FormComponents = {
  Product: <ProductForm getTypes={getTypes} saveProduct={saveProduct} />,
  Types: <TypesForm getTypes={getTypes} addType={addType} />,
  Inventory: <InventoryForm />,
  Client: <ClientForm />,
  // Agrega más formularios según sea necesario
};


const ViewForm: React.FC<ViewFormProps> = ({ usarForm }) => {
  const selectedForm = formComponents[usarForm];

  return (
    <div>
      {selectedForm ? (
        <div>
          {/* <h1>{usarForm} Form</h1> */}
          {selectedForm}
        </div>
      ) : (
        <div>Formulario no encontrado</div>
      )}
    </div>
  );
};

export default ViewForm;
