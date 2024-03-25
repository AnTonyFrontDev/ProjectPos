import axios from 'axios';
import { IBuyPost } from '@/shared/interfaces/BuyInventory/IBuyInvPost';
import { IBuyUpdate } from '@/shared/interfaces/BuyInventory/IBuyInvUpdate';



export const AddBuy = async (formData: IBuyPost) => {
    try {
        const response = await axios.post('https://localhost:7065/AddBuy', formData, {
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
        const response = await axios.post('https://localhost:7065/UpdateOnlyBuyInfo', formData, {
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
        const response = await axios.post('https://localhost:7065/RemoveBuy', { id }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error removing buy:', error);
        throw error;
    }
};
