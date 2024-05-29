import { useEffect, useState } from 'react';
import {IExpensesOptions} from "@/shared/interfaces/Expenses/IExpensesOptions.ts";
import {getExpenses, GetExpensesPaginated, GetPaymentExpenses} from "@/shared/Api/Expenses/ExpensesApi.ts";

const   useExpensesOption = () => {
    const [expensesOptions, setTypePaymentOptions] = useState<IExpensesOptions[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const tPayment: IExpensesOptions = await GetExpensesPaginated(1,50);
                setTypePaymentOptions(tPayment.data.data);
            } catch (error) {
                setError(error instanceof Error ? error : new Error('An error occurred'));
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return { expensesOptions, isLoading, error };
};

export default useExpensesOption;