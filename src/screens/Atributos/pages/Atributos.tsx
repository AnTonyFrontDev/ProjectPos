// import React from 'react';
import { Link } from 'react-router-dom';

const Atributos = () => {
  return (
    <div className="flex justify-center bg-gray-100">
      <div className="bg-white p-8 w-screen rounded-lg shadow-md">
        <h1 className="text-4xl text-center font-bold mb-8">Menú de Atributos</h1>
        <div className="grid grid-cols-2 gap-8">
          <Link
            to="/atributos/Payment"
            className="text-blue-500 hover:underline block p-6 bg-blue-100 rounded-md shadow-md"
          >
            Payment
          </Link>
          <Link
            to="/atributos/PaymentType"
            className="text-green-500 hover:underline block p-6 bg-green-100 rounded-md shadow-md"
          >
            PaymentType
          </Link>
          <Link
            to="/atributos/Color"
            className="text-red-500 hover:underline block p-6 bg-red-100 rounded-md shadow-md"
          >
            Color
          </Link>
          <Link
            to="/atributos/Bank"
            className="text-yellow-500 hover:underline block p-6 bg-yellow-100 rounded-md shadow-md"
          >
            Bank
          </Link>
          <Link
            to="/atributos/Size"
            className="text-indigo-500 hover:underline block p-6 bg-indigo-100 rounded-md shadow-md"
          >
            Size
          </Link>
          <Link
            to="/atributos/CategorySize"
            className="text-purple-500 hover:underline block p-6 bg-purple-100 rounded-md shadow-md"
          >
            CategorySize
          </Link>
          <Link
            to="/atributos/TypeProd"
            className="text-pink-500 hover:underline block p-6 bg-pink-100 rounded-md shadow-md"
          >
            TypeProd
          </Link>
          <Link
            to="/atributos/Expenses"
            className="text-orange-500 hover:underline block p-6 bg-orange-100 rounded-md shadow-md"
          >
            Expenses
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Atributos;
