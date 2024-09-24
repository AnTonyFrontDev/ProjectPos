import { useEffect, useState } from 'react';
import { getSupplier } from '@/shared/Api/SupplierApi';
import { ISupplier } from '@/shared/interfaces/ISupplier';

const useSupplierOptions = () => {
    const [supplierOptions, setSupplierOptions] = useState<ISupplier[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchSuppliers = async () => {
            setIsLoading(true);
            try {
                const suppliers: ISupplier[] = await getSupplier();
                setSupplierOptions(suppliers);
            } catch (error) {
                setError(error instanceof Error ? error : new Error('An error occurred'));
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchSuppliers(); // Fetch suppliers when component mounts
    }, []);

    return { supplierOptions, isLoading, error };
};

export default useSupplierOptions;
