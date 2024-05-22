import React, { useEffect, useState } from 'react';
import { Descriptions } from 'antd';
// import { getProductById } from '@/shared/Api/Products/ProductsApi';
import { DetalleProps as DetalleProductoProps } from '../../../shared/interfaces/I_inventario';
import { getProductById } from '@/shared/Api/Products/ProductApi';
import { AppIcon } from '../../../components/ui/AppIcon';
import ProductColorAdd from './ProductColorAdd';

const DetalleProducto: React.FC<DetalleProductoProps> = ({ Id: productId }) => {
  const [detalleProducto, setDetalleProducto] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
          // const productIdNumber = Number(productId);
          const productData = await getProductById(productId);
          setDetalleProducto(productData);
          console.log(productData);

      } catch (error) {
        console.error('Error al obtener detalle del producto:', error);
      }
    };

    fetchData();
  }, [productId]);

  if (!detalleProducto) {
    return <div>Cargando...</div>;
  }

  const { name_prod, description, sale_price, type, colorsAsociated } = detalleProducto;

  return (
    <div className="my-8">
      <h1 className="text-3xl font-bold mb-4">{name_prod}</h1>
      <Descriptions title='Detalles del Producto' className="mb-4">
        <Descriptions.Item label="Descripción">{description}</Descriptions.Item>
        <Descriptions.Item label="Precio de Venta">{sale_price}</Descriptions.Item>
        {/* Puedes mostrar detalles adicionales según tus necesidades */}
        <Descriptions.Item label="Tipo">{type}</Descriptions.Item>

        {colorsAsociated && (
          <Descriptions.Item label="Colores Disponibles" span={3}>
            <div className='flex mx-3'>
              {colorsAsociated.map((color: any) => (
                <div key={color.id} className="flex items-center">
                  <AppIcon
                    type="colors"
                    style={{ color: `#${color.codE_COLOR}`, cursor: 'pointer' }}
                    width={28}
                    onClick={() => console.log(`Color clicked: ${color.colorname}`)}
                  />
                </div>
              ))}
            </div>
          </Descriptions.Item>
        )}
      </Descriptions>
      <ProductColorAdd productId={productId}/>

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
