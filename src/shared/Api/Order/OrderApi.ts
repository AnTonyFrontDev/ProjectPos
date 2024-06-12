import { IOrderPost } from "@/shared/interfaces/order/IOrderPost";
import axios from "axios";
import { URL } from "../../Common/url";
import { IOrderUpdateStatus } from "@/shared/interfaces/order/IOrderUpdateStatus";
import { IPreOrderKeys } from "@/shared/interfaces/Preorder/IPreOrderKeys";
import { IInventoryToAddOrder } from "@/shared/interfaces/Inventory/IInventoryToAddOrder";
import { ICheckOrder } from '@/shared/interfaces/order/IOrderPost';

export const getOrders = async () => {
  try {
    const response = await axios.get(
      `${URL}/Order/GetOrders?Page=1&ItemsPerPage=30`);
    console.log('Response:', response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error checking order:", error);
    throw error;
  }
};
export const getOrdersPaginated = async (page:number,items:number) => {
  try {
    return await axios.get(
        `${URL}/Order/GetOrders?Page=${page}&ItemsPerPage=${items}`);
  } catch (error) {
    console.error("Error checking order:", error);
  }
};

export const getOrderById = async (orderId : number) => {
  try {
    const response = await axios.get(`${URL}/Order/GetOrder?id=${orderId}`);
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo la orden:", error);
    throw error;
  }
};

export const CheckOrder = async (formData: ICheckOrder[]) => {
  // console.log(formData)
  try {
    const response = await axios.post(
      `${URL}/Order/GetInvColorAvailableToAddOrder`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // console.log('Response:', response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error checking order:", error);
    console.log("test");
    // testCheckOrderApi();
    throw error;
  }
};

// const testCheckOrderApi = async () => {
//   try {
//     const formData = [
//       {
//         "fkSize": 4,
//         "fkProduct": 1,
//         "fkColorPrimary": 9,
//         "fkColorSecondary": 2
//       }
//     ];

//     const response = await axios.post('https://localhost:7065/api/Order/GetInvColorAvailableToAddOrder', formData, {
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });

//     console.log('Response:', response.data);
//   } catch (error) {
//     console.error('Error:', error);
//   }
// };

// testCheckOrderApi();


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
    const response = await axios.put(
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

export const cancelOrder = async (formData: any) => {
  const OrderId = formData.id;
  try {
    const response = await axios.delete(
      `${URL}/Order/CancelOrder?id=${OrderId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating cancel order:", error);
    console.log(OrderId)
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