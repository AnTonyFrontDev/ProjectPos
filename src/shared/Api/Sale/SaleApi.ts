import { URL } from "@/shared/Common/url";
import { ISale } from "@/shared/interfaces/Sale/ISale";
import { ISalePost } from "@/shared/interfaces/Sale/ISalePost";
import { ISaleRemove } from "@/shared/interfaces/Sale/ISaleRemove";
import { ISaleUpdate } from "@/shared/interfaces/Sale/ISaleUpdate";
import axios from "axios";

// Función para obtener todas las PreOrder
export const getSales = async () : Promise<ISale[]> => {
  try {
    const response = await axios.get(
      `${URL}/Sale/GetSales?Page=1&ItemsPerPage=30`);
    console.log("Response:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching PreOrders:', error);
    throw error;
  }
};

// Función para obtener una PreOrder por su ID
export const getSaleById = async (saleId : number ) => {
  try {
    const response = await axios.get(
        `${URL}/Sale/GetSale?id=${saleId}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching PreOrder with ID ${saleId}:`,  error);
    throw error;
  }
};

// Función para agregar una nueva PreOrder
export const addSale = async (formData : ISalePost) => {
  try {
    const response = await axios.post(
        `${URL}/Sale`, formData, {
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

export const UpdateSale = async (formData: ISaleUpdate) => {
    try {
      const formattedData = formData;
      const response = await axios.put(
        `${URL}/Sale/UpdateSale`,
        formattedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      return response.data;
    } catch (error) {
      console.error("Error updating payment:", error);
      throw error;
    }
  };
  
  export const RemoveSale = async (formData: ISaleRemove) => {
    try {
      const formattedData = formData;
      const response = await axios.delete(
        `${URL}/Sale/RemoveSale`,
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