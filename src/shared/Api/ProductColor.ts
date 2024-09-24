import axios from "axios";
import { URL } from "@/shared/Common/url";
import { IProductColor } from '../interfaces/IProductColor';

export const getProductColor = async () => {
  try {
    const response = await axios.get(
      `${URL}/ProductColor/GetProductsColor?Page=1&ItemsPerPage=30`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error retrieving types:", error);
    throw error;
  }
};

export const SaveProductColor = async (formData: IProductColor) => {
  try {
    const formattedData = formData;
    console.log(formData)
    const response = await axios.post(
      `${URL}/ProductColor/AddProductColor`,
      formattedData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error saving type product:", error);
    throw error;
  }
};


export const RemoveProductColor = async (formData: any) => {
  try {
    const formattedData = formData.id;
    const response = await axios.delete(
      `${URL}/ProductColor/RemoveProductColor?id=${formattedData}`
    );

    return response.data;
  } catch (error) {
    console.error("Error removing type payment:", error);
    throw error;
  }
};

export const UpdateProductColor = async (formData: IProductColor) => {
  try {
    const formattedData = formData;
    const response = await axios.put(
      `${URL}/ProductColor/UpdateProductColor`,
      formattedData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating type payment:", error);
    throw error;
  }
};