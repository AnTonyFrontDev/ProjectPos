import { IPayment } from "@/shared/interfaces/IPayment";
import axios from "axios";
import { URL } from "@/shared/Common/url";

export const getPayments = async () => {
  try {
    const response = await axios.get(
      `${URL}/Payment/GetPayments?Page=1&ItemsPerPage=30`
    );

    return response.data.data;
  } catch (error) {
    console.error("Error retrieving payment types:", error);
    throw error;
  }
};

export const getPaymentByOrderId = async (id : number) => {
  try {
    const response = await axios.get(`${URL}/Payment/GetPaymentByOrderId?id=${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error ID ${id}:`, error);
    throw error;
  }
};

export const GetPaymentsPaginated = async (page:number,itemsPerPage:number) => {
  try {
        return await axios.get(
        `${URL}/Payment/GetPayments?Page=${page}&ItemsPerPage=${itemsPerPage}`
    );

  } catch (error) {
    console.error("Error retrieving payment types:", error);
  }
};

export const SavePayment = async (formData: IPayment) => {
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

export const UpdatePayment = async (formData: IPayment) => {
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
  
  export const RemovePayment = async (formData: IPayment) => {
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
  