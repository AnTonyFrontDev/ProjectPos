import { IPreOrderGet } from '@/shared/interfaces/IPreOrder';
import { ICheckOrder } from '@/shared/interfaces/IOrder';



const mapPreOrderToCheckOrder = (preOrder: IPreOrderGet): ICheckOrder | null => {
  const preOrderProduct = preOrder.preOrderProducts?.[0];

  if (!preOrderProduct) {
    return null;
  }

  return {
    fkSize: preOrderProduct.size?.id ?? 0, 
    fkProduct: preOrderProduct.fK_PRODUCT,
    fkColorPrimary: preOrderProduct.coloR_PRIMARY,
    fkColorSecondary: preOrderProduct.coloR_SECONDARY,
  };
};

export default mapPreOrderToCheckOrder;
