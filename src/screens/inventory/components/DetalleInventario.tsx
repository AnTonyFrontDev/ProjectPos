//DetalleInventario.tsx
import React, { useEffect, useState } from 'react';
import { Descriptions } from 'antd';
import { getInventoryById } from '@/shared/Api/ProductsApi';
import { DetalleProductoProps } from '@/shared/interfaces/I_inventario';

const DetalleProducto: React.FC<DetalleProductoProps> = ({ productId }) => {
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
    <div>
      <h1>{name}</h1>
      <Descriptions title='Detalles del Producto'>
        <Descriptions.Item label="Descripción">{description}</Descriptions.Item>
        <Descriptions.Item label="Precio de Venta">${salePrice}</Descriptions.Item>
        <Descriptions.Item label="Tipo">{type}</Descriptions.Item>
        <Descriptions.Item label="Cantidad Total en Inventario">{totalQuantity}</Descriptions.Item>
        <Descriptions.Item label="Tallas Disponibles">
          {availableSizes && availableSizes.map((size: any) => (
            <div key={size.idInventory}>{`${size.size}: ${size.quantity} ‎`}</div>
          ))}
        </Descriptions.Item>
        <Descriptions.Item label="Colores Disponibles">
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
                          <div  key={`${size.idInventory}-${color.fkInventory}`}>
                            {`${color.colorPrimary.map((primary: any, index: number) => (
                              `(${primary.colorname} - ${color.colorSecondary[index].colorname})`
                            )).join(', ')}`}
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

        <Descriptions.Item label="Tallas y Colores Disponibles">
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

    </div>
  );
};

export default DetalleProducto;
