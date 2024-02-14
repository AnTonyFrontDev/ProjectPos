import { IProductPost } from "@/shared/interfaces/Product/IProductPost";
import { IProductRemove } from "@/shared/interfaces/Product/IProductRemove";
import { IProductUpdate } from "@/shared/interfaces/Product/IProductUpdate";
import axios from "axios";

export const getProductById = async (productId: number) => {
  try {
    const response = await axios.get(`https://localhost:7065/api/Product/GetProduct?id=${productId}`);
    console.log(response.data.data);
    return response.data.data[0];
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw error;
  }
};


export const SaveProduct = async (formData: IProductPost) => {
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

export const UpdateProduct = async (formData: IProductUpdate) => {
  try {
    const formattedData = formData;
    const response = await axios.post(
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

export const RemoveProduct = async (formData: IProductRemove) => {
  try {
    const formattedData = formData;
    const response = await axios.post(
      "https://localhost:7065/api/Product/RemoveProduct",
      formattedData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error removing Product:", error);
    throw error;
  }
};
