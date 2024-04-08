import { IPreOrder } from "@/shared/interfaces/Preorder/IPreOrder";
import axios from "axios";

// Función para obtener todas las PreOrder
export const getPreOrders = async () => {
  try {
    const response = await axios.get('https://localhost:7065/api/preorder/PreOrder/GetPreOrders?Page=1&ItemsPerPage=11');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching PreOrders:', error);
    throw error;
  }
};

// Función para obtener una PreOrder por su ID
export const getPreOrderById = async (Id : number ) => {
  try {
    const response = await axios.get(`https://localhost:7065/api/preorder/PreOrder/GetPreOrder?id=${Id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching PreOrder with ID ${Id}:`, error);
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