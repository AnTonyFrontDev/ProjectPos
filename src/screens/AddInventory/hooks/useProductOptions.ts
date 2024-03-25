import { useEffect, useState } from 'react';
import { getProducts } from '@/shared/Api/ProductsApi';
import { IProduct } from '../../../shared/interfaces/Product/IProduct';
import { getColors } from '@/shared/Api/Color/ColorApi';
getColors

const useProductOptions = () => {
    const [productOptions, setProductOptions] = useState<IProduct[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                const products: IProduct[] = await getProducts();
                setProductOptions(products);
            } catch (error) {
                setError(error instanceof Error ? error : new Error('An error occurred'));
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return { productOptions, isLoading, error };
};

export default useProductOptions;
