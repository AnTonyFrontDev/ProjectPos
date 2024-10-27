// InventoryApi.tsx
import axios from 'axios';
import {URL} from "@/shared/Common/url.ts";


export const GetInventoryPaginated = async (page:number,itemsPerPage:number) => {
    try {
        return await axios.get(`${URL}/Inventory/GetInventory?Page=${page}&ItemsPerPage=${itemsPerPage}`);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};


