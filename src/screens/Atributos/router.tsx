import { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';

const Atributos = lazy(() => import('./pages/Atributos'));
const Bank = lazy(() => import('./pages/Bank'));
const BankAccount = lazy(() => import('./pages/BankAccount'));
const Color = lazy(() => import('./pages/Color'));
const Size = lazy(() => import('./pages/Size'));
const Payment = lazy(() => import('./pages/Payment'));
const NoteCredit = lazy(() => import('./pages/NoteCredit'));
const PaymentType = lazy(() => import('./pages/PaymentType'));
const TypeProd = lazy(() => import('./pages/TypeProd'));
const CategorySize = lazy(() => import('./pages/CategorySize'));
const Expenses = lazy(() => import('./pages/Expenses'));
// const PaymentExpenses = lazy(() => import('./pages/PaymentExpenses'));

const PayableAccounts = lazy(() => import('./pages/PayableAccounts'));
const AccountsReceivable = lazy(() => import('./pages/AccountsReceivable'));
const router: RouteObject[] = [
  {
    path: '/atributos',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Atributos />
      </Suspense>
    ),
  },
  {
    path: '/atributos/Bank',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Bank />
      </Suspense>
    ),
  },
  {
    path: '/atributos/BankAccount',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <BankAccount />
      </Suspense>
    ),
  },
  {
    path: '/atributos/Color',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Color />
      </Suspense>
    ),
  },
  {
    path: '/atributos/Size',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Size />
      </Suspense>
    ),
  },
  {
    path: '/atributos/Payment',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Payment />
      </Suspense>
    ),
  },
  {
    path: '/atributos/Payment/:paymentId',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Payment />
      </Suspense>
    ),
  },
  {
    path: '/atributos/NoteCredit',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <NoteCredit />
      </Suspense>
    ),
  },
  {
    path: '/atributos/NoteCredit/:notecreditId',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <NoteCredit />
      </Suspense>
    ),
  },
  {
    path: '/atributos/PaymentType',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <PaymentType />
      </Suspense>
    ),
  },
  {
    path: '/atributos/TypeProd',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <TypeProd />
      </Suspense>
    ),
  },
  {
    path: '/atributos/CategorySize',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <CategorySize />
      </Suspense>
    ),
  },
  {
    path: '/atributos/Expenses',
    element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Expenses />
        </Suspense>
    ),
  },
  {
    path: '/atributos/CuentasPagar',
    element: (
        <Suspense fallback={<div>Loading...</div>}>
          <PayableAccounts />
        </Suspense>
    ),
  },
  {
    path: '/atributos/CuentasPorCobrar',
    element: (
        <Suspense fallback={<div>Loading...</div>}>
          <AccountsReceivable />
        </Suspense>
    ),
  },
  {
    path: '/atributos/CuentasPorCobrar/:accountId',
    element: (
        <Suspense fallback={<div>Loading...</div>}>
          <AccountsReceivable />
        </Suspense>
    ),
  },
  // {
  //   path: '/atributos/PagoGastos',
  //   element: (
  //       <Suspense fallback={<div>Loading...</div>}>
  //         <PaymentExpenses />
  //       </Suspense>
  //   ),
  // },
];

export default router;
