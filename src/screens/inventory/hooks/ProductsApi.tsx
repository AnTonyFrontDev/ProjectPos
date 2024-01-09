// ProductsApi.tsx
import axios from 'axios';
import { FormDataProducto, FormDataType } from '../../../components/FormularioV4/Config/interface';


export const getProducts = async () => {
    try {
        const response = await axios.get('https://localhost:7065/api/Product/GetProducts');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const saveProduct = async (formData: FormDataProducto) => {
    try {
        const formattedData = {
            user: formData.user,
            name_prod: formData.name_prod,
            description: formData.description,
            sale_price: formData.sale_price,
            fk_type: formData.fk_type,
        };

        const response = await axios.post('https://localhost:7065/api/Product/SaveProduct', formattedData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error saving product:', error);
        throw error;
    }
};

export const getTypes = async () => {
    try {
        const response = await axios.get('https://localhost:7065/api/TypeProd/GetTypes');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching types:', error);
        throw error;
    }
};

export const addType = async (formData: FormDataType) => {
    try {
        const formattedData = {
            user: formData.user,
            typeProd: formData.typeProd,
        };

        const response = await axios.post('https://localhost:7065/api/TypeProd/AddType', formattedData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error saving product:', error);
        throw error;
    }
};