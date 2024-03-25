import { useEffect, useState } from 'react';
import { getSizes } from '@/shared/Api/Size/SizeApi';
import { ISizeGet } from '../../../shared/interfaces/size/ISizeGet';

const useSizeOptions = () => {
    const [sizeOptions, setSizeOptions] = useState<ISizeGet[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchSizes = async () => {
            setIsLoading(true);
            try {
                const sizes: ISizeGet[] = await getSizes();
                setSizeOptions(sizes);
            } catch (error) {
                setError(error instanceof Error ? error : new Error('An error occurred'));
            } finally {
                setIsLoading(false);
            }
        };

        fetchSizes();
    }, []);

    return { sizeOptions, isLoading, error };
};

export default useSizeOptions;
