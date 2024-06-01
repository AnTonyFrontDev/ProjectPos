import axios from "axios";
import { URL } from "@/shared/Common/url";
import { IProductSizePost } from "@/shared/interfaces/Product/ProductSize/IProductSizePost";
import { IProductSizeUpdate } from "@/shared/interfaces/Product/ProductSize/IProductSizeUpdate";

// export const getTypes = async (page: number, itemsPerPage: number) => {
export const getProductSize = async () => {
try {
    const response = await axios.get(
      `${URL}/ProductSize/GetProductsSize?Page=1&ItemsPerPage=30`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error retrieving types:", error);
    throw error;
  }
};

export const SaveProductSize = async (formData: IProductSizePost) => {
    try {
      const formattedData = formData;
      console.log(formData)
      const response = await axios.post(
        `${URL}/ProductSize/AddProductSize`,
        formattedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      // .then((data)=>{
      //   console.log(data)
      //   return data;
      // })
      ;
  
      return response.data;
    } catch (error) {
      console.error("Error saving type product:", error);
      throw error;
    }
  };
  
  
export const UpdateProductSize = async (formData: IProductSizeUpdate) => {
    try {
      const formattedData = formData;
      const response = await axios.put(
        `${URL}/ProductSize/UpdateProductSize`,
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

  export const RemoveProductSize = async (formData: IProductSizeUpdate ) => {
    try {
      const formattedData = formData;
      const response = await axios.delete(
        `${URL}/ProductSize/RemoveProductSize`, {data: formattedData,}
      );
  
      return response.data;
    } catch (error) {
      console.error("Error removing type payment:", error);
      throw error;
    }
  };