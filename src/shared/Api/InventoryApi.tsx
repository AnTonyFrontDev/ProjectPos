// InventoryApi.tsx
import axios from 'axios';
import { FormDataInventory } from '../../components/FormularioV4/Config/interface';

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

export const saveInventory = async (formData: FormDataInventory) => {
    try {
        // Asegúrate de que inventoryColors sea un array antes de mapearlo
        // const inventoryColors = Array.isArray(formData.inventoryColors) ? formData.inventoryColors : [];
        console.log(formData);

        const formattedData = {
            user: formData.user,
            fk_product: formData.fk_product,
            fk_size: formData.fk_size,
            fk_color_primary: formData.fk_color_primary,
            fk_color_secondary: formData.fk_color_secondary,
            quantity: formData.quantity,
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

