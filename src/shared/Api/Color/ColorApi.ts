import { IColorPost } from "@/shared/interfaces/Color/IColorPost";
import { IColorUpdate } from "@/shared/interfaces/Color/IColorUpdate";
import { IColorRemove } from "@/shared/interfaces/Color/IColorRemove";
import axios from "axios";
import { URL } from "@/shared/Common/url";


export const getColors = async () => {
  try {
    const response = await axios.get('https://localhost:7065/api/Color/GetColors?Page=1&ItemsPerPage=10');
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching colors:', error);
    throw error;
  }
};

export const GetColorsPaginated = async (page: number, itemsPerPage: number) => {
  try {
    return await axios.get(`https://localhost:7065/api/Color/GetColors?Page=${page}&ItemsPerPage=${itemsPerPage}`);
  } catch (error) {
    console.error('Error fetching colors:', error);
  }
};

export const getColorById = async (colorId: number) => {
  try {
    const response = await axios.get(`https://localhost:7065/api/Color/GetColor?id=${colorId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching color with ID ${colorId}:`, error);
    throw error;
  }
};

export const getColorByProdId = async (prodId: number) => {
  try {
    const response = await axios.get(`https://localhost:7065/api/Color/GetColorsAsociatedById?id=${prodId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching color with ID ${prodId}:`, error);
    throw error;
  }
};



export const SaveColor = async (formData: IColorPost) => {
  try {
    const formattedData = formData
    const response = await axios.post('https://localhost:7065/api/Color/SaveColor', formattedData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error saving client:', error);
    throw error;
  }
};

export const UpdateColor = async (formData: IColorUpdate) => {
  try {
    const formattedData = formData
    const response = await axios.post('https://localhost:7065/api/Color/UpdateColor', formattedData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error saving client:', error);
    throw error;
  }
};
  
  export const RemoveColor = async (formData: IColorRemove) => {
    console.log(formData)
    try {
      const response = await axios.delete(
        `${URL}/Color/RemoveColor?id=${formData.id}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (response.status === 204) {
          // Return a success message if the status code is 204
       return response.data ;
      //  return 'Color removed successfully';
     }
     // Return an error message for other status codes
     return 'Error occurred while trying to remove the color';

   } catch (error) {
     console.error('Error removing color:', error);
     return `Error removing color: ${error}`;
   }
};