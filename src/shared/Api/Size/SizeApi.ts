import { URL } from "@/shared/Common/url";
import { ISizeRemove } from "@/shared/interfaces/size/ISizeDelete";
import { ISizePost } from "@/shared/interfaces/size/ISizePost";
import { ISizeUpdate } from "@/shared/interfaces/size/ISizeUpdate";
import axios from "axios";

export const getSizes = async () => {
  try {
      const response = await axios.get('https://localhost:7065/api/Size/GetSizes?Page=1&ItemsPerPage=30');
      console.log(response.data.data);
      return response.data.data;
  } catch (error) {
      console.error('Error fetching sizes:', error);
      throw error;
  }
};
export const GetSizesPaginated = async (page:number,itemsPerPage:number) => {
    try {
        return await axios.get(`https://localhost:7065/api/Size/GetSizes?Page=${page}&ItemsPerPage=${itemsPerPage}`);
    } catch (error) {
        console.error('Error fetching sizes:', error);
    }
};

export const getSizeByProdId = async (prodId : number)  => {
  try {
    const response = await axios.get(
      `${URL}/Size/GetSizesAsociatedByProId?prodId=${prodId}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching Size with ID ${prodId}:`, error);
    throw error;
  }
};

export const SaveSize = async (formData: ISizePost) => {
  try {
    const formattedData = formData;
    const response = await axios.post(
      "https://localhost:7065/api/Size/SaveSize",
      formattedData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

        return response.data;
  } catch (error) {
    console.error("Error saving size:", error);
    throw error;
  }
};

export const UpdateSize = async (formData: ISizeUpdate) => {
    try {
      const formattedData = formData;
      const response = await axios.post(
        `${URL}/api/Size/UpdateSize`,
        formattedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      return response.data;
    } catch (error) {
      console.error("Error saving size:", error);
      throw error;
    }
  };

  export const RemoveSize = async (formData: ISizeRemove) => {
    try {
      const formattedData = formData.id;
      const response = await axios.delete(
        `${URL}/Size/RemoveSize`,
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
  