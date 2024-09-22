import React, { useEffect, useState, useMemo } from 'react';
import { Descriptions } from 'antd';
import { getProductById, RemoveProduct } from '@/shared/Api/Products/ProductApi';
import { AppIcon } from '../../../components/ui/AppIcon';
import ProductColorAdd from './ProductColorAdd';
import ProductSizeAdd from './ProductSizeAdd';
import ButtonModal from '@/components/Generics/Modal/ButtonModal';
import ViewForm from '@/components/FormularioV4/viewForm';
import { ProductRemoveDto } from '@/shared/interfaces/IProduct';
import showConfirm from '@/util/antd/confirm';
import showGenericNotification from '@/util/antd/notification';
import showAlert from '@/util/antd/alert'; // Alert utility
import BackButton from '@/components/Generics/BackButton';

const DetalleProducto: React.FC<{ id: number }> = ({ id: productId }) => {
  const [detalleProducto, setDetalleProducto] = useState<any>(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!productId) return;
      try {
        const productData = await getProductById(productId);
        setDetalleProducto(productData);
      } catch (error) {
        console.error('Error al obtener detalle del producto:', error);
        showGenericNotification({ isSuccess: false, title: 'Error', message: 'Error al obtener los detalles del producto.' });
      }
    };

    fetchProductDetails();
  }, [productId]);

  // Utility function to refresh specific product data dynamically (e.g., colors, sizes)
  const fetchProductData = async (type: 'colorsAsociated' | 'sizesAsociated') => {
    if (!productId) return;
    try {
      const productData = await getProductById(productId);
      setDetalleProducto((prev: any) => ({
        ...prev,
        [type]: productData[type], // Dynamically update the specific field
      }));
    } catch (error) {
      console.error(`Error al actualizar ${type} del producto:`, error);
      showGenericNotification({ isSuccess: false, title: 'Error', message: `Error al actualizar ${type}.` });
    }
  };

  const fetchProductColors = () => fetchProductData('colorsAsociated');
  const fetchProductSizes = () => fetchProductData('sizesAsociated');

  const productDetails = useMemo(() => {
    if (!detalleProducto) return null;

    const { name_prod, description, sale_price, type, colorsAsociated, sizesAsociated } = detalleProducto;

    return {
      name_prod,
      description,
      sale_price,
      type,
      colorsAsociated,
      sizesAsociated,
    };
  }, [detalleProducto]);

  if (!productDetails) {
    return <div>Cargando...</div>;
  }

  const { name_prod, description, sale_price, type, colorsAsociated, sizesAsociated } = productDetails;

  const handleDelete = async () => {
    try {
      const productRemoveData = new ProductRemoveDto({ id: Number(productId) });
      await RemoveProduct(productRemoveData)
        .then(() => {
          showGenericNotification({
            isSuccess: true,
            title: 'Éxito',
            message: 'Los datos del producto se han removido con éxito.'
          });
          setTimeout(() => {
            window.location.href = '/productos';
          }, 1000);
        });
    } catch (error) {
      showAlert({ title: 'Error', content: 'Error al eliminar el producto.' });
    }
  };

  const handleConfirmDelete = () => {
    showConfirm({
      title: 'Confirmar eliminación',
      content: '¿Estás seguro de que deseas eliminar este producto?',
      onOk: () => handleDelete(),
      onCancel: () => {
        showGenericNotification({
          isSuccess: true,
          title: 'Cancelado',
          message: 'Operación cancelada.',
        });
      },
    });
  };

  return (
    <div className="mt-2 mb-8">
      <div className="flex items-center space-x-4 mb-4">
        <BackButton />
        <h2 className="text-2xl font-bold text-gray-800">
          {name_prod}
        </h2>
      </div>
      <Descriptions title={`Detalles del Producto numero: ${productId}`} className="mb-4">
        <Descriptions.Item label="Descripción">{description}</Descriptions.Item>
        <Descriptions.Item label="Precio de Venta">{sale_price}</Descriptions.Item>
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

      {/* Pass callbacks to refresh data when colors/sizes are updated */}
      <ProductColorAdd
        productId={productId}
        onProductColorChange={fetchProductColors}
      />

      <ProductSizeAdd productId={productId}
        onProductSizeChange={fetchProductSizes}
      />

      <div className="flex mt-4">
        <ButtonModal
          buttonText="Editar"
          modalTitle=""
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded'
          size={15}
          modalContent={<ViewForm usarForm="Product" formData={detalleProducto} isUpdate={true} updateData={detalleProducto} />}
        />
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleConfirmDelete}>
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default DetalleProducto;
