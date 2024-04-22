import { IPreOrderGet } from '../../../shared/interfaces/Preorder/IPreOrderGet';
import { ICheckOrder } from '../../../shared/interfaces/order/IOrderPost';



const mapPreOrderToCheckOrder = (preOrder: IPreOrderGet): ICheckOrder => {

  return {
    fkSize: preOrder.preOrderProducts[0].size.id,
    fkProduct: preOrder.preOrderProducts[0].fK_PRODUCT,
    fkColorPrimary: preOrder.preOrderProducts[0].coloR_PRIMARY,
    fkColorSecondary: preOrder.preOrderProducts[0].coloR_SECONDARY,
  };
};

export default mapPreOrderToCheckOrder;
