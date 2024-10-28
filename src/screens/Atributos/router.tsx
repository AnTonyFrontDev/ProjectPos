import { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import CuentasPorCobrar from "@/screens/Atributos/Menus/CuentasPorCobrar.tsx";
import CuentasPorPagar from "@/screens/Atributos/Menus/CuentasPorPagar.tsx";
const Atributos = lazy(() => import('./pages/Atributos'));
const Bank = lazy(() => import('./pages/Bank'));
const BankAccount = lazy(() => import('./pages/BankAccount'));
const Color = lazy(() => import('./pages/Color'));
const Size = lazy(() => import('./pages/Size'));
const Supplier = lazy(() => import('./pages/Supplier'));
const Payment = lazy(() => import('./pages/Payment'));
const NoteCredit = lazy(() => import('./pages/NoteCredit'));
const PaymentType = lazy(() => import('./pages/PaymentType'));
const TypeProd = lazy(() => import('./pages/TypeProd'));
const CategorySize = lazy(() => import('./pages/CategorySize'));
const Expenses = lazy(() => import('./pages/Expenses'));
const ExpensesBuy = lazy(() => import('./pages/ExpensesBuy'));
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
    path: '/atributos/Supplier',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Supplier />
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
    path: '/atributos/ExpensesBuy',
    element: (
        <Suspense fallback={<div>Loading...</div>}>
          <ExpensesBuy/>
        </Suspense>
    ),
  },
  {
    path: '/atributos/CuentasPagar',
    element: (
        <Suspense fallback={<div>Loading...</div>}>
          {/*<PayableAccounts />*/}
          <CuentasPorCobrar/>
        </Suspense>
    ),
  },
  {
    path: '/atributos/CuentasPagar/detalle',
    element: (
        <Suspense fallback={<div>Loading...</div>}>
          <PayableAccounts />
          {/*<CuentasPorCobrar/>*/}
        </Suspense>
    ),
  },
  {
    path: '/atributos/CuentasPorCobrar',
    element: (
        <Suspense fallback={<div>Loading...</div>}>
          <CuentasPorPagar/>
          {/*<AccountsReceivable />*/}
        </Suspense>
    ),
  },
  {
    path: '/atributos/CuentasPorCobrar/detalle',
    element: (
        <Suspense fallback={<div>Loading...</div>}>
          {/*<CuentasPorPagar/>*/}
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
