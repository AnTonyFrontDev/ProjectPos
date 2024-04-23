import { useState } from 'react';
import { ProductsFilterApi } from '@/shared/Api/Products/productsFilterApi';
import { IProductGet } from '@/shared/interfaces/Product/IProductGet';
import { Input, Button, Select } from 'antd';

const { Option } = Select;
const productFilter: ProductsFilterApi = new ProductsFilterApi();

const FilterProducts = (props: { onProductSelect: (productId: string) => void }) => {
  const [products, setProducts] = useState<IProductGet[]>([]);
  const [filter, setFilter] = useState("name");
  const [inputFilter, setInputFilter] = useState("");

  const handleFilter = (value: string) => {
    setFilter(value);
  };

  const handleSelectProduct = (value: string) => {
    props.onProductSelect(value);
  };

  const handleInputFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputFilter(e.target.value);
  };

  const filterClick = async () => {
    const list = await productFilter.filterBy(filter, inputFilter);
    setProducts(list);
  };

  return (
    <div className="flex items-center space-x-4">
      <Select defaultValue={filter} style={{ width: 190 }} onChange={handleFilter}>
        <Option value="name">Nombre de producto</Option>
        <Option value="type">Tipo</Option>
        <Option value="higherPrice">Precio mayor</Option>
        <Option value="minorPrice">Precio menor</Option>
      </Select>
      
      <Input
        placeholder={`Filtrar por ${filter}`}
        value={inputFilter}
        onChange={handleInputFilter}
        style={{ width: 200 }}
      />

      <Button type="default" onClick={filterClick}>
        Filtrar
      </Button>

      {products.length !== 0 && (
        <Select
          placeholder="Selecciona un producto"
          onChange={handleSelectProduct}
          style={{ width: 200 }}
        >
          {products.map((product) => (
            <Option key={product.id} value={product.id}>
              {product.name_prod}
            </Option>
          ))}
        </Select>
      )}
    </div>
  );
};

export default FilterProducts;
