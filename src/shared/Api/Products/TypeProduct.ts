import { ITypeProdPost } from "@/shared/interfaces/Product/TypeProd/ITypeProdPost";
import axios from "axios";
import { url } from "../Common/url";
import { ITypeProdUpdate } from "@/shared/interfaces/Product/TypeProd/ITypeProdUpdate";
import { ITypeProdRemove } from "@/shared/interfaces/Product/TypeProd/ITypeProdRemove";

export const SaveTypeProd = async (formData: ITypeProdPost) => {
    try {
      const formattedData = formData;
      const response = await axios.post(
        `${url}/TypeProd/AddType`,
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
        `${url}/TypeProd/UpdateType`,
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
        `${url}/TypeProd/RemoveType`,
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