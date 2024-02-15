import React from 'react';
import { IViewFormProps, IFormComponents } from './Config/interface';
import { lazy, Suspense } from 'react';

// Utiliza React.lazy para cargar los componentes de forma perezosa
const ProductForm = lazy(() => import('./Views/ProductForm'));
const TypesForm = lazy(() => import('./Views/TypesForm'));
const InventoryForm = lazy(() => import('@/screens/inventory/components/InventoryForm'));
const FormClient = lazy(() => import('@/screens/cliente/components/FormClient'));
const FormBank = lazy(() => import('@/screens/Atributos/ViewS/Bank/components/FormBank'));
const FormCSize = lazy(() => import('@/screens/Atributos/ViewS/CategorySize/components/FormCSize'));
const FormColor = lazy(() => import('@/screens/Atributos/ViewS/Color/components/FormColor'));


const formComponents: IFormComponents = {
  Product: 
  <Suspense fallback={<div>Loading...</div>}><ProductForm /></Suspense>,
  Types: <Suspense fallback={<div>Loading...</div>}><TypesForm /></Suspense>,
  Inventory: <Suspense fallback={<div>Loading...</div>}><InventoryForm /></Suspense>,
  Client: <Suspense fallback={<div>Loading...</div>}><FormClient /></Suspense>,
  Bank: <Suspense fallback={<div>Loading...</div>}><FormBank /></Suspense>,
  CSize: <Suspense fallback={<div>Loading...</div>}><FormCSize /></Suspense>,
  Color: <Suspense fallback={<div>Loading...</div>}><FormColor /></Suspense>,
  // Agrega más formularios según sea necesario
};

const ViewForm: React.FC<IViewFormProps> = ({ usarForm }) => {
  const selectedForm = formComponents[usarForm];

  return (
    <div>
      {selectedForm ? (
        <div>
          {selectedForm}
        </div>
      ) : (
        <div>Formulario no encontrado</div>
      )}
    </div>
  );
};

export default ViewForm;
