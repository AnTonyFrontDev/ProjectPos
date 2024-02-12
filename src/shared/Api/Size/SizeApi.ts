import { ISizePost } from "@/shared/interfaces/size/ISizePost";
import { ISizeUpdate } from "@/shared/interfaces/size/ISizeUpdate";
import axios from "axios";

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
        "https://localhost:7065/api/Size/UpdateSize",
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
  