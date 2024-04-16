//DetalleInventario.tsx
import React, { useEffect, useState } from 'react';
import { Descriptions } from 'antd';
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
  const uniqueColorCombinations = new Set();

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
        <Descriptions.Item label="Colores Disponibles" span={3}>
          {availableSizes && (
            <div>
              {availableSizes.map((size: any) => (
                <div key={size.idInventory}>
                  {size.availableColors &&
                    size.availableColors.map((color: any) => {
                      const isCombinationUnique = color.colorPrimary.every((primary: any, index: number) => {
                        const combinationKey = `${primary.colorname}-${color.colorSecondary[index].colorname}`;
                        return !uniqueColorCombinations.has(combinationKey);
                      });

                      if (isCombinationUnique) {
                        color.colorPrimary.forEach((primary: any, index: number) => {
                          const combinationKey = `${primary.colorname}-${color.colorSecondary[index].colorname}`;
                          uniqueColorCombinations.add(combinationKey);
                        });

                        return (
                          <div key={`${size.idInventory}-${color.fkInventory}`}>
                            <div className='flex mb-2'>
                              {color.colorPrimary.map((primary: any, index: number) => (
                                <div
                                  key={`${size.idInventory}-${color.fkInventory}-${index}`}
                                  className='bg-gray-300 flex items-center rounded-full p-2 mr-2'
                                >
                                  <AppIcon type="colors" style={{ color: `${primary.code}` }} className="cursor-pointer mr-1" width={18} />
                                  <AppIcon type="colors" style={{ color: `${color.colorSecondary[index].code}` }} className="cursor-pointer mr-1" width={18} />
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      }

                      return null;
                    })}
                </div>
              ))}
            </div>
          )}
        </Descriptions.Item>
      </Descriptions>


      <div className="flex mt-4">
        {/* Botón para editar */}
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-4 rounded">
          Editar
        </button>
        {/* Botón para eliminar */}
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Eliminar
        </button>
      </div>
    </div>

  );
};

export default DetalleProducto;
