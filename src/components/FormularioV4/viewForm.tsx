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

const formComponents: IFormComponents = {
  Product: ProductForm,
  Types: TypesForm,
  Inventory: InventoryForm,
  Client: FormClient,
  Bank: FormBank,
  CSize: FormCSize,
  Color: FormColor,
  Size: FormSize,
  TypePay: FormPaymentType,
  Expenses: FormExpenses,
  // Agrega más formularios según sea necesario
};

const ViewForm: React.FC<IViewFormProps> = ({ usarForm, formData, isUpdate }) => {
  const SelectedForm = formComponents[usarForm];

  return (
    <div>
      {SelectedForm ? (
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            {/* Renderiza el formulario seleccionado con los props necesarios */}
            <SelectedForm formData={formData} isUpdate={isUpdate} />
          </Suspense>
        </div>
      ) : (
        <div>Formulario no encontrado</div>
      )}
    </div>
  );
};

export default ViewForm;
