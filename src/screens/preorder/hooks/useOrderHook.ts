import { useState } from 'react';
import { CheckOrder, SaveOrder } from '@/shared/Api/Order/OrderApi';
import { ICheckOrder, IOrderPost } from '@/shared/interfaces/order/IOrderPost';
import { DATE } from '@/shared/Common/CurrentDate';
import { IPreOrderGet } from '@/shared/interfaces/Preorder/IPreOrderGet';

const useOrderProcessing = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const processOrder = async (formData: ICheckOrder[], preOrder: IPreOrderGet) => {
    try {
      setLoading(true);
      const availableProduct = await CheckOrder(formData);
      const availableProducts = availableProduct.data;
      console.log(JSON.stringify(availableProducts.data))
      console.log(JSON.stringify(availableProducts.data))
      if (availableProducts.length > 0) {
          console.log(availableProducts.lenth)

        const clientId : any  = preOrder.fK_CLIENT

        // Construir datos de la orden
        const orderData: IOrderPost = {
          id: 0,
          user: 1, 
          date: DATE,
          fkClient: clientId, 
          fkUser: 1, 
          checked: true, 
          fkPreOrder: 1, 
          descriptionJob: "Configurar Descripcion", 
          products: availableProducts.map((product : any) => ({ // Mapear los productos disponibles
            fkOrder: 0, // Ajusta según sea necesario
            fkInventoryColor: product.inventoryColorId, // Ajusta según sea necesario
            quantity: product.quantity, // Ejemplo: Cantidad por defecto
          })),
        };
        console.log(orderData);

        // Guardar la orden
        await SaveOrder(orderData);
        // Manejar cualquier lógica adicional después de guardar la orden
      } else {
        console.log('No hay productos disponibles para esta orden');
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    processOrder,
  };
};

export default useOrderProcessing;
