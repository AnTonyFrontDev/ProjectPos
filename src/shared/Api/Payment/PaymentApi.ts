import { IPaymentPost } from "@/shared/interfaces/payment/IPaymentPost";
import axios from "axios";
import { url } from "../Common/url";
import { IPaymentUpdate } from "@/shared/interfaces/payment/IPaymentUpdate";
import { IPaymentRemove } from "@/shared/interfaces/payment/IPaymentRemove";

export const SavePayment = async (formData: IPaymentPost) => {
  try {
    const formattedData = formData;
    const response = await axios.post(
      `${url}/Payment/AddPayment`,
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
      const response = await axios.post(
        `${url}/Payment/UpdatePayment`,
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
      const response = await axios.post(
        `${url}/Payment/RemovePayment`,
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
  