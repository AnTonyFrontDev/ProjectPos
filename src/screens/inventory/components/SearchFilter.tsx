// SearchFilter.tsx
import { Input, Select } from 'antd';
// import 'antd/dist/antd.css';

const { Search } = Input;
const { Option } = Select;

interface SearchFilterProps {
  onSearch: (value: string) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ onSearch }) => {
  const handleSearch = (value: string) => {
    console.log('Búsqueda:', value);
    onSearch(value);
    // Aquí puedes realizar acciones relacionadas con la búsqueda
  };

  const handleFilterChange = (value: string) => {
    console.log('Filtro seleccionado:', value);
    // Aquí puedes realizar acciones relacionadas con el cambio de filtro
  };

  return (
    <div className="flex items-center space-x-4">
      <Search
        placeholder="Buscar..."
        onSearch={handleSearch}
        style={{ width: 200 }}
      />
      <Select
        placeholder="Filtrar por"
        onChange={handleFilterChange}
        style={{ width: 150 }}
      >
        <Option value="opcion1">Name</Option>
        <Option value="opcion2">Price</Option>
        <Option value="opcion3">Quantity</Option>
      </Select>
    </div>
  );
};

export default SearchFilter;
