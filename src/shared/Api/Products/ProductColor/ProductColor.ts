import { ITypeProdPost } from "@/shared/interfaces/Product/TypeProd/ITypeProdPost";
import axios from "axios";
import { URL } from "@/shared/Common/url";
import { ITypeProdUpdate } from "@/shared/interfaces/Product/TypeProd/ITypeProdUpdate";
import { ITypeProdRemove } from "@/shared/interfaces/Product/TypeProd/ITypeProdRemove";

// export const getTypes = async (page: number, itemsPerPage: number) => {
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

export const SaveProductColor = async (formData: ITypeProdPost) => {
    try {
      const formattedData = formData;
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
  
  
export const UpdateProductColor = async (formData: ITypeProdUpdate) => {
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

  export const RemoveProductColor = async (formData: ITypeProdRemove) => {
    try {
      const formattedData = formData;
      const response = await axios.delete(
        `${URL}/ProductColor/RemoveProductColor`, {data: formattedData,}
      );
  
      return response.data;
    } catch (error) {
      console.error("Error removing type payment:", error);
      throw error;
    }
  };