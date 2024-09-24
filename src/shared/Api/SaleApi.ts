import { URL } from "@/shared/Common/url";
import { ISale } from "@/shared/interfaces/ISale";
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

// Función para obtener todas las PreOrder
export const getSalesPaginated = async (page:number,items:number) => {
  try {
    return await axios.get(
        `${URL}/Sale/GetSales?Page=${page}&ItemsPerPage=${items}`);
  } catch (error) {
    console.error('Error fetching PreOrders:', error);
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
export const addSale = async (formData : ISale) => {
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

export const UpdateSale = async (formData: ISale) => {
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
  
  export const RemoveSale = async (formData: ISale) => {
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