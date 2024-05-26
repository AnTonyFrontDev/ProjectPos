import { IPaymentPost } from "@/shared/interfaces/payment/IPaymentPost";
import axios from "axios";
import { URL } from "../../Common/url";
import { IPaymentUpdate } from "@/shared/interfaces/payment/IPaymentUpdate";
import { IPaymentRemove } from "@/shared/interfaces/payment/IPaymentRemove";

// export const GetPaymentTypes = async (page: number, itemsPerPage: number) => {
export const getPayments = async () => {
  try {
    const response = await axios.get(
      // `${URL}/Payment/GetPayments?Page=${page}&ItemsPerPage=${itemsPerPage}`
      `${URL}/Payment/GetPayments?Page=1&ItemsPerPage=30`
    );

    return response.data.data;
  } catch (error) {
    console.error("Error retrieving payment types:", error);
    throw error;
  }
};
export const GetPaymentsPaginated = async (page:number,itemsPerPage:number) => {
  try {
        return await axios.get(
        // `${URL}/Payment/GetPayments?Page=${page}&ItemsPerPage=${itemsPerPage}`
        `${URL}/Payment/GetPayments?Page=${page}&ItemsPerPage=${itemsPerPage}`
    );

  } catch (error) {
    console.error("Error retrieving payment types:", error);
  }
};
export const SavePayment = async (formData: IPaymentPost) => {
  try {
    const formattedData = formData;
    const response = await axios.post(
      `${URL}/Payment/AddPayment`,
      formattedData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error saving payment:", error);
    throw error;
  }
};

export const UpdatePayment = async (formData: IPaymentUpdate) => {
    try {
      const formattedData = formData;
      const response = await axios.put(
        `${URL}/Payment/UpdatePayment`,
        formattedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      return response.data;
    } catch (error) {
      console.error("Error updating payment:", error);
      throw error;
    }
  };
  
  export const RemovePayment = async (formData: IPaymentRemove) => {
    try {
      const formattedData = formData;
      const response = await axios.delete(
        `${URL}/Payment/RemovePayment`,
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
  