import { useEffect, useState } from 'react';
import { getPaymentTypes } from '@/shared/Api/Payment/PaymentType/PaymentTypeApi';
import { IPaymentTypeColumns } from '@/shared/interfaces/payment/paymentType/IPaymentTypeColums';

const useTypePaymentOptions = () => {
    const [typePaymentOptions, setTypePaymentOptions] = useState<IPaymentTypeColumns[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const tPayment: IPaymentTypeColumns[] = await getPaymentTypes();
                setTypePaymentOptions(tPayment);
            } catch (error) {
                setError(error instanceof Error ? error : new Error('An error occurred'));
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return { typePaymentOptions, isLoading, error };
};

export default useTypePaymentOptions;