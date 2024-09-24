import { IOption } from "./interface"
import { getProducts, getTypes } from '@/shared/Api/ProductsApi';
import { useState, useEffect } from 'react';
import { getColors } from "@/shared/Api/ColorApi";
import { getSizes } from "@/shared/Api/SizeApi";
export type OptionDataTypes = 'colors' | 'products' | 'sizes' | 'types';

export type OptionDataObject = {
  [N in OptionDataTypes]: IOption[]
}

export const useFormDataWithOptionsNew = (optionTypes: OptionDataTypes[]): OptionDataObject => {
  const [data, setData] = useState<OptionDataObject>({} as OptionDataObject);

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

      if(type === 'types') {
        newData.types = (await getTypes()).map((types : any) => ({ id: types.id, value: types.type }))
        console.log(newData.types)
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

// FormUtils.ts

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
