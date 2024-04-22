//DetalleInventario.tsx
import React, { useEffect, useState } from 'react';
import { Descriptions, Table } from 'antd';
import { getInventoryById } from '@/shared/Api/ProductsApi';
import { DetalleProps as DetalleProductoProps } from '@/shared/interfaces/I_inventario';
import { AppIcon } from '../../../components/ui/AppIcon';


const DetalleProducto: React.FC<DetalleProductoProps> = ({ Id: productId }) => {
  const [detalleProducto, setDetalleProducto] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (productId !== undefined) {
          const productIdNumber = Number(productId);
          const productData = await getInventoryById(productIdNumber);
          setDetalleProducto(productData);
          console.log(productData);
        }
      } catch (error) {
        console.error('Error al obtener detalle del producto:', error);
      }
    };

    fetchData();
  }, [productId]);

  if (!detalleProducto) {
    return <div>Cargando...</div>;
  }


  const { name, description, salePrice, type, totalQuantity, availableSizes } = detalleProducto;
  const tableData : any = [];

   // Objeto para realizar un seguimiento de la cantidad total de cada talla

  const sizeQuantityMap: { [key: string]: any } = {}; // Objeto para realizar un seguimiento de la cantidad total de cada talla

  availableSizes.forEach((size: any) => {
    size.availableColors.forEach((color: any) => {
      color.colorPrimary.forEach((primaryColor: any) => {
        const key = `${primaryColor.colorname}-${size.idCategory}`; // Clave única para identificar la combinación de color y categoría
        if (!sizeQuantityMap[key]) {
          sizeQuantityMap[key] = { quantity: 0, code: primaryColor.code }; // Inicializamos la cantidad total de la talla en 0 si es la primera vez que encontramos esta combinación
        }
        sizeQuantityMap[key].quantity += size.quantity; // Sumamos la cantidad de la talla a la cantidad total
      });
    });
  });
  
  // Ahora agregamos las tallas al objeto tableData basándonos en la información recopilada en sizeQuantityMap
  for (const key in sizeQuantityMap) {
    if (sizeQuantityMap.hasOwnProperty(key)) {
      const [colorName, categoryId] = key.split('-');
      const { quantity, code } = sizeQuantityMap[key];
      const sizes = availableSizes
        .filter((size: any) => {
          const color = size.availableColors.find((color: any) => color.colorPrimary.some((primary: any) => primary.colorname === colorName));
          return color && size.idCategory.toString() === categoryId;
        })
        .map((size: any) => `${size.size}: ${size.quantity}`)
        .join(' ');
  
      tableData.push({
        size: sizes,
        colorName: colorName,
        quantity: quantity,
        idCategory: categoryId,
        icon: (
          <div className="flex items-center">
            <AppIcon type="colors" style={{ color: code }} className="cursor-pointer" width={28} />
            <span className="ml-2">{colorName}</span>
          </div>
        ),
      });
    }
  }


  // Ordenar tableData por colorName
  tableData.sort((a:any, b:any) => a.colorName.localeCompare(b.colorName));

  const columns = [
    {
      title: 'Color Primario',
      dataIndex: 'icon',
      key: 'icon',
    },
    {
      title: 'Tamaño',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: 'Cantidad Disponible',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Categoría Size',
      dataIndex: 'idCategory',
      key: 'idCategory',
    },
  ];

  return (
    <div className="my-8">
      <h1 className="text-3xl font-bold mb-4">{name}</h1>
      <Descriptions title='Detalles del Producto' className="mb-4">
        <Descriptions.Item label="Descripción">{description}</Descriptions.Item>
        <Descriptions.Item label="Precio de Venta">${salePrice}</Descriptions.Item>
        <Descriptions.Item label="Tipo">{type}</Descriptions.Item>
        <Descriptions.Item label="Cantidad Total en Inventario">{totalQuantity}</Descriptions.Item>
        <Descriptions.Item label="Tallas Disponibles" span={2}>
          {availableSizes && availableSizes.map((size: any) => (
            <div key={size.idInventory}>{`${size.size}: ${size.quantity} ‎`}</div>
          ))}
        </Descriptions.Item>

        <Descriptions.Item label="Tallas y Colores Disponibles" span={3}>
          {availableSizes && availableSizes.map((size: any) => (
            <div key={size.idInventory} className='flex mx-3'>
              <strong>{`${size.size}: ‎ `}</strong>
              {size.availableColors &&
                size.availableColors.map((color: any) => (
                  <div key={`${size.idInventory}-${color.fkInventory}`}>
                    {color.colorPrimary.map((primary: any, index: number) => (
                      <div key={`${size.idInventory}-${color.fkInventory}-${index}`}>
                        {`${primary.colorname} - ${color.colorSecondary[index].colorname}: ${color.quantity[index]}`}
                      </div>
                    ))}
                  </div>
                ))}
            </div>
          ))}
        </Descriptions.Item>
      </Descriptions>

      <Table dataSource={tableData} columns={columns} />

      <div className="flex mt-4">
        {/* Botón para editar */}
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-4 rounded">
          Editar
        </button>
        {/* Botón para eliminar */}
        {/* <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Eliminar
        </button> */}
      </div>
    </div>

  );
};

export default DetalleProducto;
