import { IOrderPost } from "@/shared/interfaces/order/IOrderPost";
import axios from "axios";
import { URL } from "../Common/url";
import { IOrderUpdateStatus } from "@/shared/interfaces/order/IOrderUpdateStatus";
import { IPreOrderKeys } from "@/shared/interfaces/Preorder/IPreOrderKeys";
import { IInventoryToAddOrder } from "@/shared/interfaces/Inventory/IInventoryToAddOrder";

export const SaveOrder = async (formData: IOrderPost) => {
    try {
      const formattedData = formData;
      const response = await axios.post(
        `${URL}/Order/AddOrder`,
        formattedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      return response.data;
    } catch (error) {
      console.error("Error saving order:", error);
      throw error;
    }
  };

  export const UpdateStatusOrder = async (formData: IOrderUpdateStatus) => {
    try {
      const formattedData = formData;
      const response = await axios.post(
        `${URL}/Order/UpdateStatusOrder`,
        formattedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      return response.data;
    } catch (error) {
      console.error("Error updating status order:", error);
      throw error;
    }
  };


  export const GetInvColorAvailableToAddOrder = async (formData: IPreOrderKeys[]) => {
    try {
      const formattedData = formData;
      const response = await axios.post(
        `${URL}/Order/GetInvColorAvailableToAddOrder`,
        formattedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      return response.data.data as IInventoryToAddOrder[];
    } catch (error) {
      console.error("Error getting order:", error);
      throw error;
    }
  };