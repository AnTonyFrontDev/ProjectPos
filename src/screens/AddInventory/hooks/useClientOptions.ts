import { useEffect, useState } from 'react';
import { IClientGet } from '../../../shared/interfaces/Client/IClientGet';
import { getClients } from '@/shared/Api/Customers/CustomersApi';

const useClientOptions = () => {
    const [clientOptions, setClientOptions] = useState<IClientGet[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchClients = async () => {
            setIsLoading(true);
            try {
                const clients: IClientGet[] = await getClients();
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