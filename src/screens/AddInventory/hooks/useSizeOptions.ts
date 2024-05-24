import { useEffect, useState } from 'react';
import { getSizeByProdId} from '@/shared/Api/Size/SizeApi';
import { ISizeGet } from '@/shared/interfaces/size/ISizeGet';

const useSizeOptions = (prodId : number) => {
    const [sizeOptions, setSizeOptions] = useState<ISizeGet[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchSizes = async () => {
            setIsLoading(true);
            try {
                const sizes: ISizeGet[] = await getSizeByProdId(prodId);
                setSizeOptions(sizes);
            } catch (error) {
                setError(error instanceof Error ? error : new Error('An error occurred'));
            } finally {
                setIsLoading(false);
            }
        };

        fetchSizes();
    }, [prodId]);

    return { sizeOptions, isLoading, error };
};

export default useSizeOptions;
