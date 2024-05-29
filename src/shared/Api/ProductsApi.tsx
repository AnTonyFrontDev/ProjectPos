// ProductsApi.tsx
import axios from 'axios';
import { FormDataType } from '@/components/FormularioV4/Config/interface';
// import { IProduct } from '../interfaces/Product/IProduct';

// import { DetalleProductoProps } from '../interfaces/I_inventario';
// import { IProductPost } from '../interfaces/Product/IProductPost';


export const getProducts = async () => {
    try {
        const response = await axios.get('https://localhost:7065/api/Product/GetProducts?Page=1&ItemsPerPage=30');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};
export const getProductsPaginated = async (page:number,items:number) => {
    try {
        return  await axios.get(`https://localhost:7065/api/Product/GetProducts?Page=${page}&ItemsPerPage=${items}`);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};


export const getInventoryById = async (productId: number) => {
    try {
        const response = await axios.get(`https://localhost:7065/api/Inventory/GetProductByProductId?id=${productId}`);
        const responseData = response.data.data;
        console.log(responseData)

        if (responseData && responseData.length > 0) {
            const inventoryData = responseData[0];
            const productData = inventoryData.product;
            const inventorySizes = inventoryData.inventory.sizes;
            const inventoryColors = inventoryData.inventory.colors;

            const availableSizes = (inventorySizes || []).map((size: any) => {
                const colorsForSize = (inventoryColors || []).filter((color: any) => color.fkInventory === size.idInventory);

                const availableColors = colorsForSize.map((color: any) => {
                    const inventoryItems = color.inventory.map((inventoryItem: any) => ({
                        inventoryColorId: inventoryItem.inventoryColorId,
                        colorPrimary: inventoryItem.colorPrimary,
                        colorSecondary: inventoryItem.colorSecondary,
                        quantity: inventoryItem.quantity,
                    }));

                    const fkInventory = color.fkInventory;

                    return {
                        fkInventory: fkInventory,
                        inventoryColorId: inventoryItems.map((item: any) => item.inventoryColorId),
                        colorPrimary: inventoryItems.map((item: any) => item.colorPrimary),
                        colorSecondary: inventoryItems.map((item: any) => item.colorSecondary),
                        quantity: inventoryItems.map((item: any) => item.quantity),
                    };
                });

                return {
                    idInventory: size.idInventory,
                    size: size.size,
                    idCategory: size.idCategory,
                    nameCategory: size.nameCategory,
                    quantity: availableColors.reduce((acc: number, color: any) => acc + color.quantity, 0),
                    quantitysize: size.quantity,
                    availableColors: availableColors,
                };
            });



            // Construye el objeto de detalle del producto
            const productDetail = {
                id: productData?.id || null,
                name: productData?.name_prod || '',
                description: productData?.description || '',
                salePrice: productData?.sale_price || 0,
                type: productData?.type || '',
                totalQuantity: inventoryData.quantity,
                availableSizes: availableSizes,
            };
            console.log(productDetail);
            // productDetail.availableColors = availableColors;
            return productDetail;
        } else {
            // Manejar el caso en el que no se encuentra ningún producto con el ID proporcionado
            console.error(`No se encontró ningún producto con el ID ${productId}`);
            return null;
        }
    } catch (error) {
        console.error('Error fetching product details:', error);
        throw error;
    }
};





// export const saveProduct = async (formData: IProductPost) => {
//     try {
//         const formattedData = {
//             user: formData.user,
//             name_prod: formData.name_prod,
//             description: formData.description,
//             sale_price: formData.sale_price,
//             fk_type: formData.fk_type,
//         };

//         const response = await axios.post('https://localhost:7065/api/Product/SaveProduct', formattedData, {
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });

//         return response.data;
//     } catch (error) {
//         console.error('Error saving product:', error);
//         throw error;
//     }
// };

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