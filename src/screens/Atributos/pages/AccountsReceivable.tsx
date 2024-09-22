// import React from 'react';
import { useParams } from 'react-router-dom';
import BackButton from "@/components/Generics/BackButton";
import { View } from '../ViewS/AccountsReceivable';
import Detail from "../ViewS/AccountsReceivable/ViewDetail";

const PayableAccounts = () => {
  const { accountId } = useParams<{ accountId?: string }>();

  const numericId = accountId ? Number(accountId) : undefined;
  const isValidId = !isNaN(numericId as number);

  return (
    <div>
      <div className="flex items-center space-x-4 mb-4">
        <BackButton />
        <h2 className="text-2xl font-semibold text-gray-800">
          Cuentas por Cobrar
        </h2>
      </div>
      {isValidId ? <Detail /> : <View />}
    </div>
  );
};

export default PayableAccounts;
