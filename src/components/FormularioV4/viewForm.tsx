import React from 'react';
import { IViewFormProps, IFormComponents } from './Config/interface';
import { lazy, Suspense } from 'react';

// Utiliza React.lazy para cargar los componentes de forma perezosa
const ProductForm = lazy(() => import('@/screens/producto/components/FormProduct'));
// const TypesForm = lazy(() => import('./Views/TypesForm'));
const TypesForm = lazy(() => import('@/screens/Atributos/ViewS/TypeProd/components/FormTypeProd'));
const FormClient = lazy(() => import('@/screens/cliente/components/FormClient'));
const FormBank = lazy(() => import('@/screens/Atributos/ViewS/Bank/components/FormBank'));
const FormBankAccount = lazy(() => import('@/screens/Atributos/ViewS/BankAccount/components/FormBankAccount'));
const FormCSize = lazy(() => import('@/screens/Atributos/ViewS/CategorySize/components/FormCSize'));
const FormColor = lazy(() => import('@/screens/Atributos/ViewS/Color/components/FormColor'));
const FormSize = lazy(() => import('@/screens/Atributos/ViewS/Size/components/FormSize'));
const FormPaymentType = lazy(() => import('@/screens/Atributos/ViewS/PaymentType/components/FormPaymentType'));
const FormPayment = lazy(() => import('@/screens/Atributos/ViewS/Payment/components/FormPayment'));
const FormExpenses = lazy(() => import('@/screens/Atributos/ViewS/Expenses/components/FormExpenses'));
const FormPaymentExpenses = lazy(() => import('@/screens/Atributos/ViewS/PaymentExpenses/components/PaymentExpensesForm.tsx'));

const formComponents: IFormComponents = {
  Product: ProductForm,
  Types: TypesForm,
  Client: FormClient,
  Bank: FormBank,
  BankAccount: FormBankAccount,
  CSize: FormCSize,
  Color: FormColor,
  Size: FormSize,
  TypePay: FormPaymentType,
  Payment: FormPayment,
  Expenses: FormExpenses,
  PaymentExpenses:FormPaymentExpenses
};

const ViewForm: React.FC<IViewFormProps> = ({ usarForm, formData, isUpdate }) => {
  const SelectedForm = formComponents[usarForm];

  return (
    <div>
      {SelectedForm ? (
        <div>
          <Suspense fallback={<div>Loading...</div>}>
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
