//DetalleInventario.tsx
import React, { useEffect, useState } from 'react';
import { Descriptions, Table } from 'antd';
import { getInventoryById } from '@/shared/Api/ProductsApi';
import { AppIcon } from '../../../components/ui/AppIcon';
import { IBaseModel } from '@/shared/interfaces/IBaseModel';


const DetalleInventario: React.FC<IBaseModel> = ({ id: productId }) => {
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
  const tableData: any = [];

  // Objeto para realizar un seguimiento de la cantidad total de cada talla

  const sizeQuantityMap: { [key: string]: any } = {}; // Objeto para realizar un seguimiento de la cantidad total de cada talla

  availableSizes.forEach((size: any) => {
    size.availableColors.forEach((color: any) => {
      color.colorPrimary.forEach((primaryColor: any) => {
        const key = `${primaryColor.colorname}-${size.idCategory}`; // Clave única para identificar la combinación de color y categoría
        if (!sizeQuantityMap[key]) {
          sizeQuantityMap[key] = { quantity: 0, code: primaryColor.code }; // Inicializamos la cantidad total de la talla en 0 si es la primera vez que encontramos esta combinación
        }
        sizeQuantityMap[key].quantity += parseInt(size.quantity, 10);
      });
    });
  });

  // Ahora agregamos las tallas al objeto tableData basándonos en la información recopilada en sizeQuantityMap
  for (const key in sizeQuantityMap) {
    if (sizeQuantityMap.hasOwnProperty(key)) {
      const [colorName, categoryId] = key.split('-');
      const { code } = sizeQuantityMap[key];
      const category = availableSizes.find((size: any) => size.idCategory.toString() === categoryId)?.nameCategory || '';

      // Filtrar y mapear las tallas disponibles para la combinación de color y categoría
      const sizesInfo = availableSizes
        .filter((size: any) => {
          const color = size.availableColors.find((color: any) => color.colorPrimary.some((primary: any) => primary.colorname === colorName));
          return color && size.idCategory.toString() === categoryId;
        })
        .map((size: any) => {
          // Encontrar la cantidad correcta para el color especificado
          const colorInfo = size.availableColors.find((color: any) => color.colorPrimary.some((primary: any) => primary.colorname === colorName));
          const index = colorInfo.colorPrimary.findIndex((primary: any) => primary.colorname === colorName);
          const sizeQuantity = parseInt(colorInfo.quantity[index], 10); // Obtener la cantidad según el índice del color
          return `${size.size}: ${sizeQuantity}`;
        });

      // Calcular la cantidad total de existencias para la combinación de color y categoría
      const totalQuantity = sizesInfo.reduce((acc: any, sizeInfo: any) => {
        const [, sizeQuantityStr] = sizeInfo.split(':');
        const sizeQuantity = parseInt(sizeQuantityStr, 10);
        return acc + sizeQuantity;
      }, 0);

      // Agregar los datos a tableData
      tableData.push({
        size: sizesInfo.join(' '), // Concatenar tallas disponibles en un string
        colorName: colorName,
        quantity: totalQuantity, // Usar la cantidad total calculada
        category: category,
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
  tableData.sort((a: any, b: any) => a.colorName.localeCompare(b.colorName));

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
      dataIndex: 'category',
      key: 'category',
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


        <Descriptions.Item label="Colores Disponibles" span={3}>
          <div className='flex mx-3'>
            {availableSizes && (
              // Crear un conjunto para almacenar los códigos de color únicos
              <>
                {Array.from(new Set<string>(availableSizes.flatMap((size: any) =>
                  size.availableColors?.flatMap((color: any) =>
                    color.colorPrimary?.map((primary: any) => primary.code)
                  )
                ))).map((code: string, index: number) => (
                  <div key={index} className="flex items-center">
                    <AppIcon type="colors" style={{ color: code }} className="cursor-pointer" width={28} />
                  </div>
                ))}
              </>
            )}
          </div>
        </Descriptions.Item>

      </Descriptions>

      <Table dataSource={tableData} columns={columns} />

      <div className="flex mt-4">
        {/* Botón para editar */}
        {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-4 rounded">
          Editar
        </button> */}
        {/* Botón para eliminar */}
        {/* <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Eliminar
        </button> */}
      </div>
    </div>

  );
};

export default DetalleInventario;
