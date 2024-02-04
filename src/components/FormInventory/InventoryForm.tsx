// InventoryForm.tsx
import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button } from 'antd';
import { getColors, getSizes, saveInventory } from '@/shared/Api/InventoryApi';
import { getProducts } from '@/shared/Api/ProductsApi';

const { Option } = Select;

const InventoryForm: React.FC = () => {
  const [form] = Form.useForm();
  const [products, setProducts] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await getProducts();
        const sizesData = await getSizes();
        const colorsData = await getColors();

        setProducts(productsData);
        setSizes(sizesData);
        setColors(colorsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const onFinish = async (values: any) => {
    try {
      await saveInventory(values);
      console.log('Inventory saved successfully:', values);
    } catch (error) {
      console.error('Error saving inventory:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded">
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="fk_product"
          label={<span className="font-bold">Producto</span>}
          rules={[{ required: true, message: 'Selecciona un producto' }]}
          className="mb-4"
        >
          <Select className="w-full" placeholder="Selecciona un producto">
            {products.map((product: any) => (
              <Option key={product.id} value={product.id}>
                {product.name_prod}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="fk_size"
          label={<span className="font-bold">Talla</span>}
          rules={[{ required: true, message: 'Selecciona una talla' }]}
          className="mb-4"
        >
          <Select className="w-full" placeholder="Selecciona una talla">
            {sizes.map((size: any) => (
              <Option key={size.id} value={size.id}>
                {size.size}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="inventoryColors"
          label={<span className="font-bold">Colores y Cantidades</span>}
          rules={[{ required: true, message: 'Agrega al menos un color' }]}
          className="mb-4"
        >
          <Input.Group compact>
            <Form.Item name={['inventoryColors', 'fk_color_primary']} noStyle>
              <Select className="w-1/2" placeholder="Color primario">
                {colors.map((color: any) => (
                  <Option key={color.id} value={color.id}>
                    {color.colorname}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name={['inventoryColors', 'fk_color_secondary']} noStyle>
              <Select className="w-1/2" placeholder="Color secundario">
                {colors.map((color: any) => (
                  <Option key={color.id} value={color.id}>
                    {color.colorname}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name={['inventoryColors', 'quantity']} noStyle>
              <Input className="w-1/2" placeholder="Cantidad" />
            </Form.Item>
          </Input.Group>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full bg-blue-500 text-white p-5 rounded flex items-center justify-center">
            Guardar Inventario
          </Button>
        </Form.Item>
      </Form>

    </div>
  );
};

export default InventoryForm;
