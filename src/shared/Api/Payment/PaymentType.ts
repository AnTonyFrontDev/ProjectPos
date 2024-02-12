import axios from "axios";
import { url } from "../Common/url";
import { IPaymentTypePost } from "@/shared/interfaces/payment/paymentType/IPaymentTypePost";
import { IPaymentTypeUpdate } from "@/shared/interfaces/payment/paymentType/IPayemntTypeUpdate";
import { IPaymentTypeRemove } from "@/shared/interfaces/payment/paymentType/IPaymentTypeRemove";

export const SavePaymentType = async (formData: IPaymentTypePost) => {
  try {
    const formattedData = formData;
    const response = await axios.post(
      `${url}/PaymentType/AddPaymentType`,
      formattedData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error saving type payment:", error);
    throw error;
  }
};

export const UpdatePaymentType = async (formData: IPaymentTypeUpdate) => {
  try {
    const formattedData = formData;
    const response = await axios.post(
      `${url}/PaymentType/UpdatePaymentType`,
      formattedData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating type payment:", error);
    throw error;
  }
};

export const RemovePaymentType = async (formData: IPaymentTypeRemove) => {
    try {
      const formattedData = formData;
      const response = await axios.post(
        `${url}/PaymentType/RemovePaymentType`,
        formattedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      return response.data;
    } catch (error) {
      console.error("Error removing type payment:", error);
      throw error;
    }
  };
  
