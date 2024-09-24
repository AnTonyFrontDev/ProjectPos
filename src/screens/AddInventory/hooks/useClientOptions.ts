import { useEffect, useState } from 'react';
import { IClient } from '@/shared/interfaces/IClient';
import { getClients } from '@/shared/Api/CustomersApi';

const useClientOptions = () => {
    const [clientOptions, setClientOptions] = useState<IClient[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchClients = async () => {
            setIsLoading(true);
            try {
                const clients: IClient[] = await getClients();
                setClientOptions(clients);
            } catch (error) {
                setError(error instanceof Error ? error : new Error('An error occurred'));
            } finally {
                setIsLoading(false);
            }
        };

        fetchClients();
    }, []);

    return { clientOptions, isLoading, error };
};

export default useClientOptions;