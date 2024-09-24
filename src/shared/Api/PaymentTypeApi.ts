import axios from "axios";
import { URL } from "../Common/url";
import { IPaymentType} from '@/shared/interfaces/IPaymentType';

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

export const GetPaymentTypesPaginated = async (page:number,itemsPerPage:number) => {
  try {
    return await axios.get(`${URL}/PaymentType/GetPaymentTypes?Page=${page}&ItemsPerPage=${itemsPerPage}`);

  } catch (error) {
    console.error('Error fetching payment types:', error);
  }
};

export const SavePaymentType = async (formData: IPaymentType) => {
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

export const UpdatePaymentType = async (formData: IPaymentType) => {
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
export const RemovePaymentType = async (formData: IPaymentType) => {
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