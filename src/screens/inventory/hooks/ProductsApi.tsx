// ProductsApi.tsx
import axios from 'axios';

export const getProducts = async () => {
    try {
        const response = await axios.get('https://localhost:7065/api/Product/GetProducts');
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const getTypes = async () => {
    try {
        const response = await axios.get('https://localhost:7065/api/Product/GetTypes');
        return response.data;
    } catch (error) {
        console.error('Error fetching types:', error);
        throw error;
    }
};
