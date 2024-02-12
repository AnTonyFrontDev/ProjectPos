import { IBankPost } from "@/shared/interfaces/Bank/IBankPost";
import { IBankRemove } from "@/shared/interfaces/Bank/IBankRemove";
import { IBankUpdate } from "@/shared/interfaces/Bank/IBankUpdate";
import axios from "axios";

export const SaveBank = async (formData: IBankPost) => {
  try {
    const formattedData = formData;
    const response = await axios.post(
      "https://localhost:7065/api/Bank/SaveBank",
      formattedData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error saving Bank:", error);
    throw error;
  }
};

export const UpdateBank = async (formData: IBankUpdate) => {
    try {
      const formattedData = formData;
      const response = await axios.post(
        "https://localhost:7065/api/Bank/UpdateBank",
        formattedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      return response.data;
    } catch (error) {
      console.error("Error updating bank:", error);
      throw error;
    }
  };
  
  
export const RemoveBank = async (formData: IBankRemove) => {
    try {
      const formattedData = formData;
      const response = await axios.post(
        "https://localhost:7065/api/Bank/RemoveBank",
        formattedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      return response.data;
    } catch (error) {
      console.error("Error updating bank:", error);
      throw error;
    }
  };
  