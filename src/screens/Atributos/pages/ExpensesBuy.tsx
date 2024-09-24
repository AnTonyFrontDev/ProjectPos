// import React from 'react';
import BackButton from "@/components/Generics/BackButton";
import { View } from "../ViewS/ExpensesBuy";

const ExpensesBuy = () => {
  return (
    <div>
      <div className="flex items-center space-x-4 mb-4">
        <BackButton />
        <h2 className="text-2xl font-semibold text-gray-800">
          Gastos de Compras
        </h2>
      </div>
      <View />
    </div>
  );
}

export default ExpensesBuy;
