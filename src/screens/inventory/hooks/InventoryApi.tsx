// ProductsApi.tsx
import axios from 'axios';

export const getInventory = async () => {
    try {
        //si tu pones la url quizas funcione patron
        const response = await axios.get('https://localhost:7065/api/Inventory/GetInventory');
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};


