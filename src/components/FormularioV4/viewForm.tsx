import React from 'react';
import ProductForm from './Views/ProductForm';
import TypesForm from './Views/TypesForm';
import InventoryForm from './Views/InventoryForm';
// import ClientForm from './Views/ClientForm';
import FormClient from '@/screens/cliente/components/FormClient'
import { IViewFormProps, IFormComponents } from './Config/interface';

const formComponents : IFormComponents = {
  Product: <ProductForm/>,
  Types: <TypesForm/>,
  Inventory: <InventoryForm />,
  // Client: <ClientForm />,
  Client: <FormClient />,
  // Agrega más formularios según sea necesario
};

const ViewForm: React.FC<IViewFormProps> = ({ usarForm }) => {
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
