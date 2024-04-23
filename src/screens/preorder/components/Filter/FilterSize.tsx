import React, { useState } from 'react';
import { SizeApiFilter } from '@/shared/Api/Size/SizeApiFilter';
import { ISizeGet } from '@/shared/interfaces/size/ISizeGet';
import { Select, Input, Button } from 'antd';

const { Option } = Select;
const sizeApiFilter: SizeApiFilter = new SizeApiFilter();

const FilterSize = (props: { onSizeSelected: (sizeId: string) => void }) => {
  const [sizes, setSizes] = useState<ISizeGet[]>([]);
  const [filter, setFilter] = useState('name');
  const [inputFilter, setInputFilter] = useState('');

  const handlerFilter = (value: string) => {
    setFilter(value);
  };

  const handlerInputFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputFilter(e.target.value);
  };

  const handleBtnFilter = async () => {
    const list = await sizeApiFilter.filterBy(filter, inputFilter);
    setSizes(list);
  };

  const handleSelectedSize = (value: string) => {
    props.onSizeSelected(value);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Select
        value={filter}
        style={{ width: 190 }}
        onChange={handlerFilter}
      >
        <Option value="name">Por nombre</Option>
        <Option value="category">Por categoría</Option>
      </Select>

      <Input
        value={inputFilter}
        onChange={handlerInputFilter}
        placeholder={`Filtrar por ${filter}`}
        style={{ width: 200 }}
      />

      <Button type="default" onClick={handleBtnFilter}>
        Filtrar
      </Button>

      {sizes.length !== 0 && (
        <Select
          onChange={handleSelectedSize}
          style={{ width: 200 }}
          placeholder="Selecciona un tamaño"
        >
          {sizes.map((size) => (
            <Option key={size.id} value={size.id}>
              {size.size}
            </Option>
          ))}
        </Select>
      )}
    </div>
  );
};

export default FilterSize;
