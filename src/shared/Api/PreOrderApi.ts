import { URL } from "@/shared/Common/url";
import { IPreOrder, IPreOrderGet } from "@/shared/interfaces/IPreOrder";
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

// Función para obtener una PreOrder por su ID
export const GetPreOrderInprogressById = async (preorderId : number ) => {
  try {
    const response = await axios.get(
      `${URL}/preorder/PreOrder/GetPreOrderInprogressById?id=${preorderId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching PreOrder with ID ${preorderId}:`, error);
    throw error;
  }
};

// Función para obtener todas las PreOrder
export const getPreOrdersPending = async () : Promise<IPreOrder[]> => {
  try {
    const response = await axios.get(
        `${URL}/preorder/PreOrder/GetPreOrdersPending`);
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


// Función para agregar una nueva PreOrder
export const addPreOrder = async (formData : IPreOrder) => {
  try {
    const response = await axios.post(`${URL}/preorder/PreOrder/AddPreOrder`, formData, {
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
          `${URL}/ReportsBalance/GetAccountsReceivable`
      );

      return response.data.data;
  } catch (error) {
      console.error("Error retrieving expenses:", error);
      throw error;
  }
};

export const RemovePreOrder = async (formData: any) => {
  try {
    const formattedData = formData;
    const response = await axios.delete(
      `${URL}/preorder/PreOrder/RemovePreOrder?id=${formData}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        data: formattedData,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating payment:", error);
    throw error;
  }
};
