import { useState } from 'react';
import useSizeOptions from './useSizeOptions';
import useColorOptions from './useColorOptions';


const useOptions = () => {
    // const [productOptions, setProductOptions] = useState([]);
    const [sizeOptionsPerRow, setSizeOptionsPerRow] = useState<{ [key: number]: any[] }>({});
    const [colorOptionsPerRow, setColorOptionsPerRow] = useState<{ [key: number]: any[] }>({});

    const updateOptions = async (productId: number, rowIndex: number) => {
        const { sizeOptions } = useSizeOptions(productId);
        const { colorOptions } = useColorOptions(productId);

        setSizeOptionsPerRow(prevState => ({ ...prevState, [rowIndex]: sizeOptions }));
        setColorOptionsPerRow(prevState => ({ ...prevState, [rowIndex]: colorOptions }));
    };

    return {
        sizeOptionsPerRow,
        colorOptionsPerRow,
        updateOptions,
    };
};

export default useOptions;
