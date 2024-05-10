import axios from "axios";
import { URL } from "../../../Common/url";
import { IPaymentTypePost} from '@/shared/interfaces/payment/paymentType/IPaymentTypePost';
import { IPaymentTypeRemove } from '@/shared/interfaces/payment/paymentType/IPaymentTypeRemove';
import { IPaymentTypeUpdate } from '../../../interfaces/payment/paymentType/IPaymentTypeUpdate';

export const getPaymentTypes = async () => {
  try {
    const response = await axios.get(`${URL}/PaymentType/GetPaymentTypes?Page=1&ItemsPerPage=30`);
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching payment types:', error);
    throw error;
  }
};

export const SavePaymentType = async (formData: IPaymentTypePost) => {
  try {
    const formattedData = formData;
    const response = await axios.post(
      `${URL}/PaymentType/AddPaymentType`,
      formattedData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    return response.data.data;
  } catch (error) {
    console.error("Error saving payment type:", error);
    throw error;
  }
}

export const UpdatePaymentType = async (formData: IPaymentTypeUpdate) => {
  try {
    const formattedData = formData;
    const response = await axios.put(
      `${URL}/PaymentType/UpdatePaymentType`,
      formattedData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    return response.data;
  } catch (error) {
    console.error("Error updating payment type:", error);
    throw error;
  }
}
export const RemovePaymentType = async (formData: IPaymentTypeRemove) => {
  try {
    const formattedData = formData;
    const response = await axios.delete(
      `${URL}/PaymentType/RemovePaymentType`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        data: formattedData,
      }
    )
    return response.data;
  } catch (error) {
    console.error("Error removing payment type:", error);
    throw error;
  }
};