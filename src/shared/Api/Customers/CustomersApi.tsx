import axios from "axios";
import { IClientPost } from "@/shared/interfaces/Client/IClientPost";


export const getClients = async () => {
    try {
        const response = await axios.get('https://localhost:7065/api/Client/GetClients?Page=1&ItemsPerPage=10');
        console.log(response.data.data)
        return response.data.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const getAllClients = async () => {
    try {
        const response = await axios.get('https://localhost:7065/api/Client/GetAllClients');
        console.log(response.data.data)
        return response.data.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};


  export const saveClient = async (formData: IClientPost) => {
      try {
        const formattedData = formData 
          const response = await axios.post('https://localhost:7065/api/Client/SaveClient', formattedData, {
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
  