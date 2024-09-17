import React, { useEffect, useState } from 'react';
import { Descriptions } from 'antd';
import { getProductById, RemoveProduct } from '@/shared/Api/Products/ProductApi';
import { AppIcon } from '../../../components/ui/AppIcon';
import ProductColorAdd from './ProductColorAdd';
import ProductSizeAdd from './ProductSizeAdd';
import ButtonModal from '@/components/Generics/Modal/ButtonModal';
import ViewForm from '@/components/FormularioV4/viewForm';
import { Modal } from 'antd';
import { ProductRemoveDto } from '@/shared/interfaces/IProduct';
import showConfirm from '@/util/antd/confirm';
import showGenericNotification from '@/util/antd/notification';
import { IBaseModel } from '@/shared/interfaces/IBaseModel';

const DetalleProducto: React.FC<IBaseModel> = ({ id: productId }) => {
  const [detalleProducto, setDetalleProducto] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const productIdNumber = Number(productId);
        if (!productId) {
          return;
        }
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



  const { name_prod, description, sale_price, type, colorsAsociated, sizesAsociated } = detalleProducto;

  const handleDelete = async () => {
    try {
      const productRemoveData = new ProductRemoveDto({ id: Number(productId) });
      console.log(productRemoveData)
      await RemoveProduct(productRemoveData)
        .then(() => {
          showGenericNotification({
            isSuccess: true,
            title: 'Éxito',
            message: 'Los datos del producto se han removido con éxito.'
          });
          setTimeout(() => {
            window.location.href = '/productos';
          }, 1000); // Esperar 2 segundos antes de recargar
        })
    } catch (error) {
      Modal.error({ content: 'Error al eliminar el producto' });
    }
  };

  const handleConfirmDelete = () => {
    showConfirm({
      title: 'Confirmar eliminación',
      content: '¿Estás seguro de que deseas eliminar este producto?',
      // Callback para cuando se confirma la acción
      onOk: () => {
        handleDelete(); // Llamada a la función handleDelete
      },
      // Callback para cuando se cancela la acción
      onCancel: () => {
        showGenericNotification({
          isSuccess: true,
          title: 'Éxito',
          message: 'Cancelado.'
        });
        // Aquí puedes agregar lógica adicional si es necesario
      },
    });
  };

  return (
    <div className="my-8">
      <h1 className="text-3xl font-bold mb-4">{name_prod}</h1>
      <Descriptions title='Detalles del Producto' className="mb-4">
        <Descriptions.Item label="Descripción">{description}</Descriptions.Item>
        <Descriptions.Item label="Precio de Venta">{sale_price}</Descriptions.Item>
        {/* Puedes mostrar detalles adicionales según tus necesidades */}
        <Descriptions.Item label="Tipo">{type}</Descriptions.Item>

        {colorsAsociated && (
          <Descriptions.Item label="Colores Disponibles">
            <div className='flex mx-3'>
              {colorsAsociated.map((color: any) => (
                <div key={color.id} className="flex items-center">
                  <AppIcon
                    type="colors"
                    style={{ color: `${color.codE_COLOR}`, cursor: 'pointer' }}
                    width={28}
                  // onClick={() => console.log(`Color clicked: ${color.colorname}`)}
                  />
                </div>
              ))}
            </div>
          </Descriptions.Item>
        )}
        {sizesAsociated && (
          <Descriptions.Item label="Tallas Disponibles">
            <div className='flex mx-3'>
              {sizesAsociated.map((size: any) => (
                <div key={size.id} className="flex items-center">
                  <span>{size.size} ,</span>
                </div>
              ))}
            </div>
          </Descriptions.Item>
        )}
      </Descriptions>

      <ProductColorAdd productId={productId} />

      <ProductSizeAdd productId={productId} />



      <div className="flex mt-4">
        {/* Botón para editar */}
        {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-4 rounded">
          Editar
        </button> */}
        <ButtonModal
          buttonText="Editar"
          modalTitle=""
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded'
          size={15}
          modalContent={<ViewForm usarForm="Product" formData={detalleProducto} isUpdate={true} updateData={detalleProducto} />}
        />
        {/* Botón para eliminar */}

        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleConfirmDelete}>
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default DetalleProducto;
