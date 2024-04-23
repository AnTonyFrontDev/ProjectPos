import React, { useState } from 'react';
import { Select, Input, Button } from 'antd';
import { ColorFilterApi } from '@/shared/Api/Color/ColorApiFilter';
import { IColorGet } from '@/shared/interfaces/Color/IColorGet';

const { Option } = Select;
// const colorFilterApi = new ColorFilterApi();

const FilterColor = (props: { onColorSelected: (colorId: string) => void }) => {
  const [colors, setColors] = useState<IColorGet[]>([]);
  const [filter, setFilter] = useState('name');
  const [inputFilter, setInputFilter] = useState('');

  const handleInputFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputFilter(e.target.value);
  };

  const handleFilter = (value: string) => {
    setFilter(value);
  };

  const filterClick = async () => {
    const list = await ColorFilterApi.filterBy(filter, inputFilter);
    setColors(list);
  };

  const handleSelectedColor = (value: string) => {
    props.onColorSelected(value);
  };

  return (
    <div>
      <Select value={filter} onChange={handleFilter} style={{ width: 150, marginRight: 8 }}>
        <Option value="name">Por nombre</Option>
        <Option value="colorCode">Por código de color</Option>
      </Select>

      <Input
        type="text"
        value={inputFilter}
        onChange={handleInputFilter}
        style={{ width: 200, marginRight: 8 }}
        placeholder={`Filtrar por ${filter}`}
      />

      <Button type="default" onClick={filterClick} style={{ marginRight: 8 }}>
        Filtrar
      </Button>

      {colors.length !== 0 && (
        <Select onChange={handleSelectedColor} style={{ width: 200 }}>
          <Option value="" hidden>
            Selecciona un color
          </Option>
          {colors.map((color) => (
            <Option key={color.id} value={color.id}>
              {`${color.colorname} #${color.code}`}
            </Option>
          ))}
        </Select>
      )}
    </div>
  );
};

export default FilterColor;
