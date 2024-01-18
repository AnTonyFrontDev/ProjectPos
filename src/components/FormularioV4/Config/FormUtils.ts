import { IOption } from "./interface"
import { getProducts } from '../../../shared/Api/ProductsApi';
import { getColors, getSizes } from '../../../shared/Api/InventoryApi';
// FormUtils.ts
import { useState, useEffect } from 'react';
// import { getClients } from "../../../shared/Api/CustomersApi";

export type OptionDataTypes = 'colors' | 'products' | 'sizes';

export type OptionDataObject = {
  [N in OptionDataTypes]: IOption[]
}

export const useFormDataWithOptionsNew = (optionTypes: OptionDataTypes[]): OptionDataObject => {
  const [data, setData] = useState<OptionDataObject>({} as OptionDataObject);

  // const [options, setOptions] = useState<{ id: number; value: string }[]>([]);
  // const [selectDisabled, setSelectDisabled] = useState(true);

  const GetData = async () => {
    const newData: OptionDataObject = {} as OptionDataObject;

    await Promise.all(optionTypes.map( async (type) => {

      if(type === 'colors') {
        newData.colors = (await getColors()).map((color : any) => ({ id: color.id, value: color.colorname }))
      }

      if(type === 'products') {
        newData.products = (await getProducts()).map((product : any) => ({ id: product.id, value: product.name_prod }))
      }

      if(type === 'sizes') {
        newData.sizes = (await getSizes()).map((size : any) => ({ id: size.id, value: size.size }))
      }

    })).catch(error => {
      console.error('Error fetching data:', error);
    });

    setData(newData);
  }

  useEffect(() => {
    GetData()
  }, []);

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

// import { getColors } from '../../../screens/inventory/hooks/InventoryApi';

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
