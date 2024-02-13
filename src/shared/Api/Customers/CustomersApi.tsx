import axios from "axios";
import { IClientPost } from "@/shared/interfaces/Client/IClientPost";
import { IClientUpdate } from "@/shared/interfaces/Client/IClientUpdate";
import { IClientRemove } from "@/shared/interfaces/Client/IClientRemove";
import { IClientPhone } from "@/shared/interfaces/Client/IClientPhone";


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

export const getClientById = async (clientId: number) => {
    try {
        const response = await axios.get(`https://localhost:7065/api/Client/GetClient?id=${clientId}`);
        console.log(response.data.data)
        return response.data.data[0]; 
    } catch (error) {
        console.error('Error fetching client details:', error);
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
        const phones : IClientPhone[] = Array.isArray(formData.phonesClient) ? formData.phonesClient : [];
        console.log(formData);
        const currentDate = new Date();
        const formattedData = {
            user: '1',
            date: currentDate,
            f_name: formData.f_name,
            l_name: formData.l_name,
            f_surname: formData.f_surname,
            l_surname: formData.l_surname,
            rnc: formData.rnc,
            dni: formData.dni,
            phonesClient: phones.map(phone => ({
                id: 0,
                user: 1,
                date: currentDate,
                type: phone.type,
                number: phone.number,
                fk_client: 0,
            })),
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

  export const UpdateClient = async (formData: IClientUpdate) => {
    try {
      const formattedData = formData 
        const response = await axios.post('https://localhost:7065/api/Client/UpdateClient', formattedData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error updating client:', error);
        throw error;
    }
};

export const RemoveClient = async (formData: IClientRemove) => {
    try {
      const formattedData = formData 
        const response = await axios.post('https://localhost:7065/api/Client/RemoveClient', formattedData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error removing client:', error);
        throw error;
    }
};

  