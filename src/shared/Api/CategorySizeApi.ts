import { ICategorySize } from "@/shared/interfaces/ICategorySize";
import axios from "axios";
import { URL } from "../Common/url";
import { IResponse } from "../interfaces/IResponse";

export const getCategorySizes = async () => {
  try {
    const response = await axios.get(`${URL}/CategorySize/GetCategoriesSize?Page=1&ItemsPerPage=10`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching category sizes:', error);
    throw error;
  }
};
export const GetCategorySizesPaginated = async (page:number,itemsPerPage:number) => {
  try {
    return await axios.get(`${URL}/CategorySize/GetCategoriesSize?Page=${page}&ItemsPerPage=${itemsPerPage}`);
  } catch (error) {
    console.error('Error fetching category sizes:', error);
  }
};


export const getCategorySizeById = async (id : number) => {
  try {
    const response = await axios.get(`${URL}/CategorySize/GetCategorySize?id=${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching category size with ID ${id}:`, error);
    throw error;
  }
};

export const SaveCategorySize = async (formData: ICategorySize) => {
  try {
    const formattedData = formData;
    const response : IResponse<ICategorySize> = await axios.post(
      `${URL}/CategorySize/AddCategorySize`,
      formattedData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error saving category size:", error);
    throw error;
  }
};

export const UpdateCategorySize = async (formData: ICategorySize) => {
    try {
      const formattedData = formData;
      const response = await axios.put(
        `${URL}/CategorySize/UpdateCategorySize`,
        formattedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      return response.data;
    } catch (error) {
      console.error("Error updating category size:", error);
      throw error;
    }
  };
  
  export const RemoveCategorySize = async (formData: ICategorySize) => {
    try {
      const formattedData = formData;
      const response = await axios.delete(
        `${URL}/CategorySize/RemoveCategorySize`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          data: formattedData,
        }
      );
  
      return response.data;
    } catch (error) {
      console.error("Error updating category size:", error);
      throw error;
    }
  };
  