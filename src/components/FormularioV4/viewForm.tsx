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
const FormSize = lazy(() => import('@/screens/Atributos/ViewS/Size/components/FormSize'));
const FormPaymentType = lazy(() => import('@/screens/Atributos/ViewS/PaymentType/components/FormPaymentType'));
const FormExpenses = lazy(() => import('@/screens/Atributos/ViewS/Expenses/components/FormExpenses'));


// const formComponents: IFormComponents = {
//   Product: 
//   <Suspense fallback={<div>Loading...</div>}><ProductForm /></Suspense>,
//   Types: <Suspense fallback={<div>Loading...</div>}><TypesForm /></Suspense>,
//   Inventory: <Suspense fallback={<div>Loading...</div>}><InventoryForm /></Suspense>,
//   Client: <Suspense fallback={<div>Loading...</div>}><FormClient /></Suspense>,
//   Bank: <Suspense fallback={<div>Loading...</div>}><FormBank /></Suspense>,
//   CSize: <Suspense fallback={<div>Loading...</div>}><FormCSize/></Suspense>,
//   Color: <Suspense fallback={<div>Loading...</div>}><FormColor /></Suspense>,
//   Size: <Suspense fallback={<div>Loading...</div>}><FormSize /></Suspense>,
//   TypePay: <Suspense fallback={<div>Loading...</div>}><FormPaymentType /></Suspense>,
//   Expenses: <Suspense fallback={<div>Loading...</div>}><FormExpenses /></Suspense>,
//   // Agrega más formularios según sea necesario
// };

const formComponents: IFormComponents = {
  Product: ProductForm,
  Types: TypesForm,
  Inventory: InventoryForm,
  Client: FormClient,
  Bank: FormBank,
  CSize: FormCSize, // Solo importa el componente FormCSize aquí
  Color: FormColor,
  Size: FormSize,
  TypePay: FormPaymentType,
  Expenses: FormExpenses,
  // Agrega más formularios según sea necesario
};

const ViewForm: React.FC<IViewFormProps> = ({ usarForm, formData, isUpdate, onSubmit }) => {
  const SelectedForm = formComponents[usarForm];

  return (
    <div>
      {SelectedForm ? (
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            {/* Renderiza el formulario seleccionado con los props necesarios */}
            <SelectedForm formData={formData} isUpdate={isUpdate} onSubmit={onSubmit} />
          </Suspense>
          {/* {selectedForm} */}
        </div>
      ) : (
        <div>Formulario no encontrado</div>
      )}
    </div>
  );
};

export default ViewForm;
