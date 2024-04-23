import axios from "axios";

export const getInventoryByIdBeta = async (productId: number) => {
    try {
        const response = await axios.get(`https://localhost:7065/api/Inventory/GetProductByProductId?id=${productId}`);
        const responseData = response.data.data; // Suponiendo que la respuesta contiene una propiedad 'data' que tiene los datos del inventario
        return responseData;
    } catch (error) {
        console.error("Error retrieving inventory:", error);
        throw error;
    }
};