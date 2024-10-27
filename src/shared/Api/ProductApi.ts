import {IProduct} from "@/shared/interfaces/IProduct";
import axios from "axios";
import {URL} from "@/shared/Common/url.ts";

export const getProductById = async (productId: number) => {
    try {
        const response = await axios.get(`${URL}/Product/GetProduct?id=${productId}`);
        console.log(response.data.data);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching product details:', error);
        throw error;
    }
};


export const SaveProduct = async (formData: IProduct) => {
    try {
        const response = await axios.post(
            `${URL}/api/Product/SaveProduct`, formData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("Error saving Product:", error);
        throw error;
    }
};

export const UpdateProduct = async (formData: IProduct) => {
    try {
        const response = await axios.put(
            `${URL}/Product/UpdateProduct`,
            formData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("Error saving Product:", error);
        throw error;
    }
};

export const RemoveProduct = async (formData: IProduct) => {
    try {
        const response = await axios.delete(
            `${URL}/Product/RemoveProduct`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                data: formData,
            }
        );

        return response.data;
    } catch (error) {
        console.error("Error removing Product:", error);
        throw error;
    }
};
