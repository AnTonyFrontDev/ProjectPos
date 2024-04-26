import { ITypeProdPost } from "@/shared/interfaces/Product/TypeProd/ITypeProdPost";
import axios from "axios";
import { URL } from "../../../Common/url";
import { ITypeProdUpdate } from "@/shared/interfaces/Product/TypeProd/ITypeProdUpdate";
import { ITypeProdRemove } from "@/shared/interfaces/Product/TypeProd/ITypeProdRemove";

// export const getTypes = async (page: number, itemsPerPage: number) => {
export const getTypes = async () => {
try {
    const response = await axios.get(
      // `${URL}/TypeProd/GetTypes?Page=${page}&ItemsPerPage=${itemsPerPage}`
      `${URL}/TypeProd/GetTypes?Page=1&ItemsPerPage=30`
    );

    return response.data.data;
  } catch (error) {
    console.error("Error retrieving types:", error);
    throw error;
  }
};

export const SaveTypeProd = async (formData: ITypeProdPost) => {
    try {
      const formattedData = formData;
      const response = await axios.post(
        `${URL}/TypeProd/AddType`,
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
  
  
export const UpdateTypeProd = async (formData: ITypeProdUpdate) => {
    try {
      const formattedData = formData;
      const response = await axios.post(
        `${URL}/TypeProd/UpdateType`,
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

  export const RemoveTypeProd = async (formData: ITypeProdRemove) => {
    try {
      const formattedData = formData;
      const response = await axios.post(
        `${URL}/TypeProd/RemoveType`,
        formattedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      return response.data;
    } catch (error) {
      console.error("Error removing type payment:", error);
      throw error;
    }
  };