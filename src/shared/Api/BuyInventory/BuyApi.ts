import axios from 'axios';
import { URL } from '@/shared/Common/url';
import { IBuyInventoryGet, IBuyUpdate } from '@/shared/interfaces/IBuyInventory';

export const GetBuyPaginated = async (pages:number,items:number)  => {
    try {
      return await axios.get(
        `${URL}/BuyInventory/GetBuys?Page=${pages}&ItemsPerPage=${items}`);
  
    } catch (error) {
      console.error('Error fetching BuyInvetory:', error);
    }
};

export const getBuyById = async (buyId: number) => {
    try {
        const response = await axios.get(`${URL}/BuyInventory/GetBuyById?id=${buyId}`);
        console.log(response.data.data)
        return response.data.data; 
    } catch (error) {
        console.error('Error fetching client details:', error);
        throw error;
    }
};

export const AddBuy = async (formData: IBuyInventoryGet) => {
    console.log("aver", formData)
    try {
        const response = await axios.post(
            `${URL}/BuyInventory/AddBuy`, formData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error adding buy:', error);
        throw error;
    }
};

export const UpdateOnlyBuyInfo = async (formData: IBuyUpdate) => {
    try {
        const response = await axios.put(
            `${URL}/BuyInventory/UpdateOnlyBuyInfo`, formData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error updating buy info:', error);
        throw error;
    }
};

export const RemoveBuy = async (id: number) => {
    try {
        const response = await axios.delete(`${URL}/BuyInventory/RemoveBuy`, {
            data: { id }
        });

        return response.data;
    } catch (error) {
        console.error('Error removing buy:', error);
        throw error;
    }
};
