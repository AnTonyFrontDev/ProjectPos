import { URL } from "@/shared/Common/url";
import { ISupplier } from "@/shared/interfaces/ISupplier";
import axios from "axios";

// Función para obtener todas las PreOrder
export const getSupplier = async (): Promise<ISupplier[]> => {
  try {
    const response = await axios.get(
      `${URL}/Supplier/GetAll?Page=1&ItemsPerPage=30`);
    console.log("Response:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching PreOrders:', error);
    throw error;
  }
};

// Función para obtener todas las PreOrder
export const getSupplierPaginated = async (page: number, items: number) => {
  try {
    return await axios.get(
      `${URL}/Supplier/GetAll?Page=${page}&ItemsPerPage=${items}`);
  } catch (error) {
    console.error('Error fetching PreOrders:', error);
  }
};


export const getSupplierById = async (id: number) => {
  try {
    const response = await axios.get(
      `${URL}/Supplier/GetById?id=${id}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching PreOrder with ID ${id}:`, error);
    throw error;
  }
};


export const addSupplier = async (formData: ISupplier) => {
  try {
    const response = await axios.post(
      `${URL}/Supplier/Add`, formData, {
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

export const UpdateSupplier = async (formData: ISupplier) => {
  try {
    const formattedData = formData;
    const response = await axios.put(
      `${URL}/Supplier/Update`,
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

export const RemoveSupplier = async (formData: ISupplier) => {
  try {
    const formattedData = formData;
    const response = await axios.delete(
      `${URL}/Supplier/Remove`,
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