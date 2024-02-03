import axios from "axios";
import {FormDataClient} from '@/components/FormularioV4/Config/interface'


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


  export const saveClient = async (formData: FormDataClient) => {
      try {
          const formattedData = {
              id: formData.id,
              user: formData.user,
              date: formData.date,
              f_name: formData.f_name,
              l_name: formData.l_name,
              f_surname: formData.f_surname,
              l_surname: formData.l_surname,
              rnc: formData.rnc,
              dni: formData.dni,
          };
  
          console.log(formattedData);
  
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
  