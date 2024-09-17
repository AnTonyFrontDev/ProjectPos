import { useEffect, useState } from 'react';
import { getBankAccounts } from '@/shared/Api/BankAccount/BankAccountApi';
import { IBankAccount } from '@/shared/interfaces/IBankAccount';

const useBankAccountOptions = () => {
    const [bankAccountOptions, setBankAccountOptions] = useState<IBankAccount[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const bankAccounts: IBankAccount[] = await getBankAccounts();
                setBankAccountOptions(bankAccounts);
            } catch (error) {
                setError(error instanceof Error ? error : new Error('An error occurred'));
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return { bankAccountOptions, isLoading, error };
};

export default useBankAccountOptions;