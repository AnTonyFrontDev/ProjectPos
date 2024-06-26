import { ICategorySizePost } from "@/shared/interfaces/size/CategorySize/ICategorySizePost";
import { ICategorySizeRemove } from "@/shared/interfaces/size/CategorySize/ICategorySizeRemove";
import { ICategorySizeUpdate } from "@/shared/interfaces/size/CategorySize/ICategorySizeUpdate";
import axios from "axios";

export const getCategorySizes = async () => {
  try {
    const response = await axios.get('https://localhost:7065/api/CategorySize/GetCategoriesSize?Page=1&ItemsPerPage=10');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching category sizes:', error);
    throw error;
  }
};
export const GetCategorySizesPaginated = async (page:number,itemsPerPage:number) => {
  try {
    return await axios.get(`https://localhost:7065/api/CategorySize/GetCategoriesSize?Page=${page}&ItemsPerPage=${itemsPerPage}`);
  } catch (error) {
    console.error('Error fetching category sizes:', error);
  }
};


export const getCategorySizeById = async (categorySizeId : number) => {
  try {
    const response = await axios.get(`https://localhost:7065/api/CategorySize/GetCategorySize?id=${categorySizeId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching category size with ID ${categorySizeId}:`, error);
    throw error;
  }
};

export const SaveCategorySize = async (formData: ICategorySizePost) => {
  try {
    const formattedData = formData;
    const response = await axios.post(
      "https://localhost:7065/api/CategorySize/AddCategorySize",
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

export const UpdateCategorySize = async (formData: ICategorySizeUpdate) => {
    try {
      const formattedData = formData;
      const response = await axios.put(
        "https://localhost:7065/api/CategorySize/UpdateCategorySize",
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
  
  export const RemoveCategorySize = async (formData: ICategorySizeRemove) => {
    try {
      const formattedData = formData;
      const response = await axios.delete(
        "https://localhost:7065/api/CategorySize/RemoveCategorySize",
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
  