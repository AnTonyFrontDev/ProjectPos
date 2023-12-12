import React from 'react';
import { Space, Table, Tag, Button, Popconfirm, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  key: string;
  ProductName: string;
  quantity: number;
  address: string;
  tags: string[];
}



const RowActions: React.FC = () => (
  <Space size="middle">
    <Button type="dashed" onClick={() => console.log('Editar')}>
      Editar
    </Button>
    <Popconfirm
      title="¿Estás seguro de eliminar este elemento?"
      onConfirm={() => console.log('Eliminar')}
      okText="Sí"
      cancelText="No"
    >
      <Button danger>Eliminar</Button>
    </Popconfirm>
  </Space>
);

const data: DataType[] = [
  {
    key: '1',
    ProductName: 'John Brown',
    quantity: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    ProductName: 'Jim Green',
    quantity: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    ProductName: 'Joe Black',
    quantity: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '4',
    ProductName: 'Jane Doe',
    quantity: 28,
    address: 'Los Angeles No. 1 Lake Park',
    tags: ['awesome', 'designer'],
  },
];

const columns: ColumnsType<DataType> = [
  {
    title: 'ProductName',
    dataIndex: 'ProductName',
    key: 'ProductName',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (tags) => (
      <>
      
        {tags.map((tag:string) => (
          <Tag color={tag.length > 5 ? 'geekblue' : 'green'} key={tag}>
            {tag.toUpperCase()}
          </Tag>
        ))}
      </>
    ),
  },
  {
    title: 'Acciones',
    key: 'actions',
    render: () => <RowActions />,
  },
];

const App: React.FC = () => (
  <div className="container mx-auto p-4">
    <div className="flex justify-end items-center mb-4">
      <div>
        <Button type="primary" className="mr-2" disabled>
          Crear
        </Button>
        <Input
          prefix={<SearchOutlined />}
          placeholder="Buscar"
          style={{ width: '200px' }}
          disabled
        />
      </div>
    </div>

    <Table columns={columns} dataSource={data} />
  </div>
);

export default App;
