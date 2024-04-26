import axios from "axios";
import { URL } from "../../Common/url";
import { IExpensesPost } from "@/shared/interfaces/Expenses/IExpensesPost";
import { IExpensesUpdate } from "@/shared/interfaces/Expenses/IExpensesUpdate";
import { IExpensesRemove } from "@/shared/interfaces/Expenses/IExpensesRemove";

// export const GetExpenses = async (page: number, itemsPerPage: number) => {
export const getExpenses = async () => {
  try { 
    const response = await axios.get(
      // `${URL}/Expenses/GetExpenses?Page=${page}&ItemsPerPage=${itemsPerPage}`
      `${URL}/Expenses/GetExpenses?Page=1&ItemsPerPage=30`
    );

    return response.data.data;
  } catch (error) {
    console.error("Error retrieving expenses:", error);
    throw error;
  }
};

export const SaveExpenses = async (formData: IExpensesPost) => {
    try {
      const formattedData = formData;
      const response = await axios.post(
        `${URL}/Expenses/SaveExpense`,
        formattedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      return response.data;
    } catch (error) {
      console.error("Error saving expenses:", error);
      throw error;
    }
  };

  
export const UpdateExpenses = async (formData: IExpensesUpdate) => {
    try {
      const formattedData = formData;
      const response = await axios.post(
        `${URL}/Expenses/UpdateExpenses`,
        formattedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      return response.data;
    } catch (error) {
      console.error("Error updating expenses:", error);
      throw error;
    }
  };

  export const RemoveExpenses = async (formData: IExpensesRemove) => {
    try {
      const formattedData = formData;
      const response = await axios.post(
        `${URL}/Expenses/RemoveExpense`,
        formattedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      return response.data;
    } catch (error) {
      console.error("Error removing expenses:", error);
      throw error;
    }
  };