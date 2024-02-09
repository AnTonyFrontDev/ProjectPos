// InventoryApi.tsx
import axios from 'axios';
// import { FormDataInventory } from '@/components/FormularioV4/Config/interface';
import { IInventory } from '../interfaces/Inventory/I_Inventory';
import { IInventoryColor } from '../interfaces/Inventory/I_InventoryColor';

export const getInventory = async () => {
    try {
        const response = await axios.get('https://localhost:7065/api/Inventory/GetInventory?Page=1&ItemsPerPage=10');
        console.log(response.data.data)
        return response.data.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const saveInventory = async (formData: IInventory) => {
    try {
        
        const inventoryColors: IInventoryColor[] = Array.isArray(formData.inventoryColors) ? formData.inventoryColors : [];
        console.log(formData);

        const formattedData = {
            user: formData.user,
            fk_product: formData.fk_product,
            fk_size: formData.fk_size,
            inventoryColors: inventoryColors.map(color => ({
                fk_color_primary: color.fk_color_primary,
                fk_color_secondary: color.fk_color_secondary,
                quantity: color.quantity,
            })),
        };


        console.log(formattedData)

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
        const response = await axios.get('https://localhost:7065/api/Size/GetSizes?Page=1&ItemsPerPage=10');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const getColors = async () => {
    try {
        const response = await axios.get('https://localhost:7065/api/Color/GetColors?Page=1&ItemsPerPage=10');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};


