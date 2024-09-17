import { URL } from "@/shared/Common/url";
import { IClient } from "@/shared/interfaces/IClient";
import axios from "axios";
import { format } from 'date-fns';

export const getClients = async () => {
    try {
        const response = await axios.get(`${URL}/Client/GetClients?Page=1&ItemsPerPage=10`);
        console.log(response.data.data)
        return response.data.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};
export const  getClientsPaginated = async (page:number,items:number) => {
    try {
        return await axios.get(`${URL}/Client/GetClients?Page=${page}&ItemsPerPage=${items}`);
    } catch (error) {
        console.error('Error fetching products:', error);
        }
};

export const getClientById = async (clientId: number) => {
    try {
        const response = await axios.get(`${URL}/Client/GetClient?id=${clientId}`);
        console.log(response.data.data)
        return response.data.data[0]; 
    } catch (error) {
        console.error('Error fetching client details:', error);
        throw error;
    }
};

export const getAllClients = async () => {
    try {
        const response = await axios.get(`${URL}/Client/GetAllClients`);
        console.log(response.data.data)
        return response.data.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const saveClient = async (formData: IClient) => {
    try {
        const response = await axios.post(`${URL}/Client/SaveClient`, formData, {
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


  export const UpdateClient = async (formData: IClient) => {
    try {
      const formattedData = formData 
        const response = await axios.post(`${URL}/Client/UpdateClient`, formattedData, {
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

export const RemoveClient = async (formData: IClient) => {
    const formattedData = {
        ...formData,
        user : 0,
        date: format(new Date(), 'yyyy-MM-dd'),
    };
    try {
        const response = await axios.delete(`${URL}/Client/RemoveClient`, {
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

  