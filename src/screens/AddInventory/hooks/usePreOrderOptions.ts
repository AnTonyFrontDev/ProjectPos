import { useEffect, useState } from 'react';
import { IPreOrderGet } from '@/shared/interfaces/Preorder/IPreOrderGet';
import { getPreOrders } from '@/shared/Api/PreOrder/PreOrderApi';

const usePreOrderOptions = () => {
    const [preOrderOptions, setPreOrderOptions] = useState<IPreOrderGet[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchPreOrder = async () => {
            setIsLoading(true);
            try {
                const preOrders: IPreOrderGet[] = await getPreOrders();
                setPreOrderOptions(preOrders);
            } catch (error) {
                setError(error instanceof Error ? error : new Error('An error occurred'));
            } finally {
                setIsLoading(false);
            }
        };

        fetchPreOrder();
    }, []);

    return { preOrderOptions, isLoading, error };
};

export default usePreOrderOptions;
