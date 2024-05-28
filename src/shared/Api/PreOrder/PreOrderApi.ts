import { URL } from "@/shared/Common/url";
import { IPreOrder } from "@/shared/interfaces/Preorder/IPreOrder";
import { IPreOrderGet } from "@/shared/interfaces/Preorder/IPreOrderGet";
import axios from "axios";

// Función para obtener todas las PreOrder
export const getPreOrders = async () : Promise<IPreOrderGet[]> => {
  try {
    const response = await axios.get(
      `${URL}/preorder/PreOrder/GetPreOrders?Page=1&ItemsPerPage=30`);
    console.log("Response2:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching PreOrders:', error);
    throw error;
  }
};
// Función para obtener todas las PreOrder
export const GetPreOrdersPaginated = async (pages:number,items:number)  => {
  try {
    return await axios.get(
      `${URL}/preorder/PreOrder/GetPreOrders?Page=${pages}&ItemsPerPage=${items}`);

  } catch (error) {
    console.error('Error fetching PreOrders:', error);
  }
};


// Función para obtener una PreOrder por su ID
export const getPreOrderById = async (preorderId : number ) => {
  try {
    const response = await axios.get(
      `${URL}/preorder/PreOrder/GetPreOrder?id=${preorderId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching PreOrder with ID ${preorderId}:`, error);
    throw error;
  }
};

// Función para agregar una nueva PreOrder
export const addPreOrder = async (formData : IPreOrder) => {
  try {
    const response = await axios.post('https://localhost:7065/api/preorder/PreOrder/AddPreOrder', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding PreOrder:', error);
    throw error;
  }
};

export const GetAccountsReceivable = async ()=>{
  try {
      const response = await axios.get(
          // `${URL}/Expenses/GetExpenses?Page=${page}&ItemsPerPage=${itemsPerPage}`
          `${URL}/ReportsBalance/GetAccountsReceivable`
      );

      return response.data.data;
  } catch (error) {
      console.error("Error retrieving expenses:", error);
      throw error;
  }
};