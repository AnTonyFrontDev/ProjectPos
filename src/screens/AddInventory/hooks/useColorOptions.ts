import { useEffect, useState } from 'react';
import { getColorByProdId } from '@/shared/Api/Color/ColorApi';
import { IColorGet } from '@/shared/interfaces/Color/IColorGet';


const useColorOptions = (prodId : number) => {
    // prodId = 1
    const [colorOptions, setColorOptions] = useState<IColorGet[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchColors = async () => {
            setIsLoading(true);
            try {
                const colors: IColorGet[] = await getColorByProdId(prodId);
                setColorOptions(colors);
            } catch (error) {
                setError(error instanceof Error ? error : new Error('An error occurred'));
            } finally {
                setIsLoading(false);
            }
        };
        if(prodId){
            fetchColors();
        }
    }, [prodId]);

    return { colorOptions, isLoading, error };
};

export default useColorOptions;
