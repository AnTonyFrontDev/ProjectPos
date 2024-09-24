import { IProduct } from "@/shared/interfaces/IProduct";
import axios from "axios";

export const getProductById = async (productId: number) => {
  try {
    const response = await axios.get(`https://localhost:7065/api/Product/GetProduct?id=${productId}`);
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw error;
  }
};


export const SaveProduct = async (formData: IProduct) => {
  try {
    const formattedData = formData;
    const response = await axios.post(
      "https://localhost:7065/api/Product/SaveProduct",
      formattedData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error saving Product:", error);
    throw error;
  }
};

export const UpdateProduct = async (formData: IProduct) => {
  try {
    const formattedData = formData;
    const response = await axios.put(
      "https://localhost:7065/api/Product/UpdateProduct",
      formattedData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error saving Product:", error);
    throw error;
  }
};

export const RemoveProduct = async (formData: IProduct) => {
  try {
    const formattedData = formData;
    const response = await axios.delete(
      "https://localhost:7065/api/Product/RemoveProduct",
      {
        headers: {
          "Content-Type": "application/json",
          },
        data: formattedData,
          }
    );

    return response.data;
  } catch (error) {
    console.error("Error removing Product:", error);
    throw error;
  }
};
