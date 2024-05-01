// SearchFilter.tsx
import { Input, Select } from 'antd';

const { Search } = Input;
const { Option } = Select;

export interface SearchFilterProps<T> {
  onSearch: (value: string) => void;
  onFilterChange: (value: any) => void;
  onSortToggle: () => void;
  columns: { dataIndex: keyof T; title: string }[];
}

const SearchFilter = <T,>({ onSearch, onFilterChange, onSortToggle, columns }: SearchFilterProps<T>) => {
  const handleSearch = (value: string) => {
    onSearch(value);
  };

  const handleFilterChange = (value: string) => {
    const selectedColumn = columns.find(column => column.title === value);
    if (selectedColumn) {
      onFilterChange(selectedColumn.dataIndex);
    }
  };

  const handleSortToggle = () => {
    onSortToggle();
  };

  return (
    <div className="flex items-center space-x-4">
      <Search placeholder="Buscar..." onSearch={handleSearch} style={{ width: 200 }} />
      <Select placeholder="Filtrar por" onChange={handleFilterChange} style={{ width: 150 }}>
        {columns.map(column => (
          <Option key={column.dataIndex as string} value={column.title}>
            {column.title}
          </Option>
        ))}
      </Select>
      <Select placeholder="Ordenar por" onChange={handleSortToggle} style={{ width: 150 }}>
        <Option value="ascend">Ascendente</Option>
        <Option value="descend">Descendente</Option>
      </Select>
    </div>
  );
};

export default SearchFilter;
