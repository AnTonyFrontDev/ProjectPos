import { URL } from "@/shared/Common/url";
import { IPreOrderProduct, IUpdatePreOrderProduct } from "@/shared/interfaces/Preorder/IPreOrderProduct";
// import { IPreOrderGet } from "@/shared/interfaces/Preorder/IPreOrderGet";
import axios from "axios";

export const getPreOrderProductById = async (Id : number ) => {
    try {
      const response = await axios.get(
        `${URL}/PreOrderProduct/GetById?id=${Id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching PreOrder with ID ${Id}:`, error);
      throw error;
    }
  };

// Función para agregar una nueva PreOrder
export const addPreOrderProduct = async (formData : IPreOrderProduct | any) => {
  try {
    const response = await axios.post(`${URL}/PreOrderProduct/SavePreOrderProduct?fkPreOrder=${formData.fkPreOrder}`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding PreOrder:', error);
    throw error;
  }
};

export const UpdatePreOrderProduct = async (formData: IUpdatePreOrderProduct) => {
    try {
      const formattedData = formData;
      console.log("formData", formattedData);
      const response = await axios.put(
        `${URL}/PreOrderProduct/UpdatePreOrderProduct`,
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


export const RemovePreOrderProduct = async (formData: any) => {
  try {
    const formattedData = { id: Number(formData.id) };
    console.log("formData", formData);
    console.log("formattedData", formattedData);
    const response = await axios.delete(
      `${URL}/PreOrderProduct/RemovePreOrderProduct`,
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
