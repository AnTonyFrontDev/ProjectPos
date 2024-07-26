import axios from "axios";
import { IClientPost } from "@/shared/interfaces/Client/IClientPost";
import { IClientUpdate } from "@/shared/interfaces/Client/IClientUpdate";
import { IClientRemove } from "@/shared/interfaces/Client/IClientRemove";
import { format } from 'date-fns';

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
export const  getClientsPaginated = async (page:number,items:number) => {
    try {
        return await axios.get(`https://localhost:7065/api/Client/GetClients?Page=${page}&ItemsPerPage=${items}`);
    } catch (error) {
        console.error('Error fetching products:', error);
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
        const response = await axios.post('https://localhost:7065/api/Client/SaveClient', formData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error al guardar el cliente:', error);
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
    const formattedData = {
        ...formData,
        user : 0,
        date: format(new Date(), 'yyyy-MM-dd'),
    };
    try {
        const response = await axios.delete('https://localhost:7065/api/Client/RemoveClient', {
            data: formattedData,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message || 'Error removing client';
        console.error('Error removing client:', errorMessage);
        throw new Error(errorMessage);
    }
};

  