import { ICategorySizePost } from "@/shared/interfaces/size/CategorySize/ICategorySizePost";
import { ICategorySizeRemove } from "@/shared/interfaces/size/CategorySize/ICategorySizeRemove";
import { ICategorySizeUpdate } from "@/shared/interfaces/size/CategorySize/ICategorySizeUpdate";
import axios from "axios";

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
      const response = await axios.post(
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
      const response = await axios.post(
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
  