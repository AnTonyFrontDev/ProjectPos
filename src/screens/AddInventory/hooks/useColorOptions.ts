import { useEffect, useState } from 'react';
import { getColors } from '@/shared/Api/Color/ColorApi';
import { IColorGet } from '../../../shared/interfaces/Color/IColorGet';


const useColorOptions = () => {
    const [colorOptions, setColorOptions] = useState<IColorGet[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchColors = async () => {
            setIsLoading(true);
            try {
                const colors: IColorGet[] = await getColors();
                setColorOptions(colors);
            } catch (error) {
                setError(error instanceof Error ? error : new Error('An error occurred'));
            } finally {
                setIsLoading(false);
            }
        };

        fetchColors();
    }, []);

    return { colorOptions, isLoading, error };
};

export default useColorOptions;
