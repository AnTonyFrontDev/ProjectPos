import { useEffect, useState } from 'react';
import { getSizeByProdId} from '@/shared/Api/SizeApi';
import { ISize } from '@/shared/interfaces/ISize';

const useSizeOptions = (prodId : number) => {
    const [sizeOptions, setSizeOptions] = useState<ISize[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        
        setSizeOptions([]);
        if (!prodId) return;

        const fetchSizes = async () => {
            setIsLoading(true);
            try {
                const sizes: ISize[] = await getSizeByProdId(prodId);
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
