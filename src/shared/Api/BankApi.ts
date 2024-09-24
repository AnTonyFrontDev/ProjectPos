import { IBank } from "@/shared/interfaces/IBank";
import axios from "axios";
import { URL } from "../Common/url";

export const getBanks = async () => {
  try {
    const response = await axios.get(`${URL}/Bank/GetBanks?Page=1&ItemsPerPage=20`);
    
    return response;
  } catch (error) {
    console.error('Error fetching banks:', error);
    throw error;
  }
};

export const GetBanksPaginated = async (page:number,itemsPerPage:number) =>{
  try {
    const response = await axios.get(`${URL}/Bank/GetBanks?Page=${page}&ItemsPerPage=${itemsPerPage}`);

    return response;
  } catch (error) {
    console.error('Error fetching banks: ', error);
  }
}

export const SaveBank = async (formData: IBank) => {
  try {
    const formattedData = formData;
    const response = await axios.post(
      `${URL}/Bank/SaveBank`,
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

export const UpdateBank = async (formData: IBank) => {
    try {
      const formattedData = formData;
      const response = await axios.put(
        `${URL}/Bank/UpdateBank`,
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
  
  export const RemoveBank = async (formData: IBank) => {
    try {
      const response = await axios.delete(
        `${URL}/Bank/RemoveBank`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          data: formData,
        }
      );
  
      return response.data;
    } catch (error) {
      console.error("Error removing category size:", error);
      throw error;
    }
  };
  
  