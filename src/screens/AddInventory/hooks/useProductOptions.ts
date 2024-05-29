import { useEffect, useState } from 'react';
import { getProducts } from '@/shared/Api/ProductsApi';
import { IProductPost } from '@/shared/interfaces/Product/IProductPost';



const useProductOptions = () => {
    const [productOptions, setProductOptions] = useState<IProductPost[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                const products: IProductPost[] = await getProducts();
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
