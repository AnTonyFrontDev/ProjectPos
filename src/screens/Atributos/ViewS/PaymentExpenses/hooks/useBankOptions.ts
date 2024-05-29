import { useEffect, useState } from 'react';
import { getBanks } from '@/shared/Api/Bank/BankApi';
import { IBankColumns } from '@/shared/interfaces/Bank/IBankGet';

const useBankOptions = () => {
    const [bankOptions, setBankOptions] = useState<IBankColumns[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const banks: IBankColumns[] = await getBanks();
                setBankOptions(banks);
            } catch (error) {
                setError(error instanceof Error ? error : new Error('An error occurred'));
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return { bankOptions, isLoading, error };
};

export default useBankOptions;