import { useInventoryForm } from '@/screens/inventory/hooks/useInventoryForm';
import FilterColor from '@/screens/preorder/components/FilterColor';
import FilterProducts from '@/screens/preorder/components/FilterProducts';
import FilterSize from '@/screens/preorder/components/FilterSize';
import { Table, Button } from 'antd';
import React from 'react';
// import FilterProducts from './FilterProducts'; // Asegúrate de importar tus componentes necesarios
// import FilterSize from './FilterSize';
// import FilterColor from './FilterColor';


const Order: React.FC = () => {
    const { formData, setFormData, addExistence, handleSubmit, handleAddInventory, handleProductSelect, handleSizeSelect, handleColorSelect } = useInventoryForm();

    const data = [
        { key: '1', cliente: 'Cliente 1', producto: 'Producto 1', size: 'M', colores: 'Azul', cantidad: 2, precioUnitario: 10 },
        { key: '2', cliente: 'Cliente 2', producto: 'Producto 2', size: 'L', colores: 'Rojo', cantidad: 1, precioUnitario: 15 },
        // ... más datos
      ];
    
      // Columnas de la tabla
      const columns = [
        { title: 'Cliente', dataIndex: 'cliente', key: 'cliente' },
        { title: 'Producto', dataIndex: 'producto', key: 'producto' },
        { title: 'Size', dataIndex: 'size', key: 'size' },
        { title: 'Colores', dataIndex: 'colores', key: 'colores' },
        { title: 'Cantidad', dataIndex: 'cantidad', key: 'cantidad' },
        { title: 'Precio Unitario', dataIndex: 'precioUnitario', key: 'precioUnitario' },
        { title: 'Total', dataIndex: 'total', key: 'total', render: (_, record) => record.cantidad * record.precioUnitario },
      ];
  return (
    <div>

    
    <form onSubmit={handleSubmit} className="p-8">
      {/* Primera columna */}
      <div className="mb-6">
        <FilterProducts onProductSelect={handleProductSelect} />
        <FilterSize onSizeSelected={handleSizeSelect} />

      </div>

      {/* Segunda columna */}
      <div className="mb-6">
        <hr className="my-4" />

        {/* Iterar sobre las existencias y mostrar un formulario para cada una */}
        {formData.inventoryColors.map((existence, index) => (
          <div key={index} className="mb-4">
            <FilterColor onColorSelected={(sizeId) => handleColorSelect(sizeId, true, index)} />
            <FilterColor onColorSelected={(sizeId) => handleColorSelect(sizeId, false, index)} />

            <label htmlFor={`quantity-${index}`} className="block mt-2">Cantidad:</label>
            <input
              type="number"
              id={`quantity-${index}`}
              name={`quantity-${index}`}
              value={existence.quantity}
              onChange={(e) =>
                setFormData((prevInventory) => ({
                  ...prevInventory,
                  inventoryColors: prevInventory.inventoryColors.map((item, i) =>
                    i === index ? { ...item, quantity: Number(e.target.value) } : item
                  ),
                }))
              }
              required
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>
        ))}
        

        {/* Botón para agregar nueva existencia */}
        <Button type="default" onClick={addExistence} className="bg-primary px-4 rounded">
          Agregar Existencia
        </Button>
      </div>

      {/* Tercera columna */}
      <div>
        {/* Botón para agregar el inventario */}
        <Button type="default" onClick={handleSubmit} className="bg-secondary px-4 rounded">
          Agregar Inventario
        </Button>
      </div>
    </form>

    

    <Table dataSource={data} columns={columns} className="mt-4" />

    </div>
    
  );
};

export default Order;
