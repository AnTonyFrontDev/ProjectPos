// InventoryApi.tsx
import axios from 'axios';


export const GetInventoryPaginated = async (page:number,itemsPerPage:number) => {
    try {
        return await axios.get(`https://localhost:7065/api/Inventory/GetInventory?Page=${page}&ItemsPerPage=${itemsPerPage}`);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};


