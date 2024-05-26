import { IBankColumns } from "@/shared/interfaces/Bank/IBankGet";
import { IBankPost } from "@/shared/interfaces/Bank/IBankPost";
import { IBankRemove } from "@/shared/interfaces/Bank/IBankRemove";
import { IBankUpdate } from "@/shared/interfaces/Bank/IBankUpdate";

import axios from "axios";

// export const getBanks = async () => {
//   try {
//       const response = await axios.get('https://localhost:7065/api/Bank/GetBanks?Page=1&ItemsPerPage=20');
//       console.log(response.data.data);
//       return response.data.data;
//   } catch (error) {
//       console.error('Error fetching banks:', error);
//       throw error;
//   }
// };

export const getBanks = async () => {
  try {
    const response = await axios.get('https://localhost:7065/api/Bank/GetBanks?Page=1&ItemsPerPage=20');
    
    const transformedData: IBankColumns[] = response.data.data.map((bank: IBankColumns) => ({
      ...bank,
      name: bank.bankName 
    }));

    console.log(transformedData);
    return transformedData;
  } catch (error) {
    console.error('Error fetching banks:', error);
    throw error;
  }
};

export const GetBanksPaginated = async (page:number,itemsPerPage:number) =>{
  try {
    const response = await axios.get(`https://localhost:7065/api/Bank/GetBanks?Page=${page}&ItemsPerPage=${itemsPerPage}`);

    /*(const transformedData: IBankColumns[] = response.data.data.map((bank: IBankColumns) => ({
      ...bank,
      name: bank.bankName
    }));*/

    return response;
  } catch (error) {
    console.error('Error fetching banks: ', error);
  }
}

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
      const response = await axios.put(
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
      const response = await axios.delete(
        "https://localhost:7065/api/Bank/RemoveBank",
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
  
  