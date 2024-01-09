import { Option } from "./interface"
import { getProducts } from '../../../screens/inventory/hooks/ProductsApi';
import { getColors, getSizes } from '../../screens/inventory/hooks/InventoryApi';
// FormUtils.ts

export type OptionDataTypes = 'colors' | 'products' | 'sizes';

export type OptionDataObject = {
  [N in OptionDataTypes]: Option[]
}

export const useFormDataWithOptionsNew = (optionTypes: OptionDataTypes[]): OptionDataObject => {
  const [data, setData] = useState<OptionDataObject>({} as OptionDataObject);

  const [options, setOptions] = useState<{ id: number; value: string }[]>([]);
  const [selectDisabled, setSelectDisabled] = useState(true);

  useEffect(() => {
    const newData: OptionDataObject = {} as OptionDataObject;

    await Promise.all(optionTypes.map( type => {

      if(type === 'colors') {
        newData.colors = await getColors()
      }

      if(type === 'products') {
        newData.products = await getProducts()
      }

      if(type === 'sizes') {
        newData.sizes = await getSizes()
      }
      
    })).catch(error => {
      console.error('Error fetching data:', error);
    });

    setData(newData);
  }, [getData]);

  return { ...data };
};

export const useFormDataWithOptions = (getData: () => Promise<{ id: number; value: string }[]>) => {
  const [options, setOptions] = useState<{ id: number; value: string }[]>([]);
  const [selectDisabled, setSelectDisabled] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();
        const transformedOptions = data.map(item => ({ id: item.id, value: item.value }));

        setOptions([{ id: 0, value: 'Select Option' }, ...transformedOptions]);
        setSelectDisabled(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [getData]);

  return { options, selectDisabled };
};

// FormUtils.ts
import { useState, useEffect } from 'react';

export const useFormDataWithInventory = (getSizes: () => Promise<{ id: number; size: string }[]>) => {
  const [sizes, setSizes] = useState<{ id: number; value: string }[]>([]);
  const [selectDisabled, setSelectDisabled] = useState(true);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const typesData = await getSizes();

        // Transformar las opciones a tener 'value' en lugar de 'type'
        const options = typesData.map(size => ({ id: size.id, value: size.size }));

        setSizes([{ id: 0, value: 'Select Option' }, ...options]);
        setSelectDisabled(false);
      } catch (error) {
        console.error('Error fetching types:', error);
      }
    };

    fetchTypes();
  }, [getSizes]);

  return { sizes, selectDisabled };
};



export const useFormDataWithTypes = (getTypes: () => Promise<{ id: number; type: string }[]>) => {
  const [types, setTypes] = useState<{ id: number; value: string }[]>([]);
  const [typeSelectDisabled, setTypeSelectDisabled] = useState(true);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const typesData = await getTypes();

        const options = typesData.map(type => ({ id: type.id, value: type.type }));

        setTypes([{ id: 0, value: 'Select Option' }, ...options]);
        setTypeSelectDisabled(false);
      } catch (error) {
        console.error('Error fetching types:', error);
      }
    };

    fetchTypes();
  }, [getTypes]);

  return { types, typeSelectDisabled };
};
