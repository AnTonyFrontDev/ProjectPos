// ProductsApi.tsx
import axios from 'axios';
import { FormDataInventory } from '../../../components/FormularioV4/Config/interface';

export const getInventory = async () => {
    try {
        const response = await axios.get('https://localhost:7065/api/Inventory/GetInventory');
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const saveInventory = async (formData: FormDataInventory) => {
    try {
        const formattedData = {
            user: formData.user,
            fk_product: formData.fk_product,
            fk_size: formData.fk_size,
            inventoryColors: formData.inventoryColors.map((color) => ({
                id: color.id,
                user: color.user,
                fk_color_primary: color.fk_color_primary,
                fk_color_secondary: color.fk_color_secondary,
                quantity: color.quantity,
                fk_inventory: color.fk_inventory,
            })),
        };

        const response = await axios.post('https://localhost:7065/api/Inventory/AddInventory', formattedData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error saving inventory:', error);
        throw error;
    }
};

export const getSizes = async () => {
    try {
        const response = await axios.get('https://localhost:7065/api/Size/GetSizes');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const getColors = async () => {
    try {
        const response = await axios.get('https://localhost:7065/api/Color/GetColors');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};


