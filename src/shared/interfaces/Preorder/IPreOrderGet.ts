interface IPreOrderSize {
    id: number;
    size: string;
  }
  
  interface IPreOrderColor {
    id: number;
    colorname: string;
    codE_COLOR: string;
  }
  
  interface IPreOrderProducts {
    id: number;
    namE_PRODUCT: string;
    descriptioN_PRODUCT: string;
    salE_PRICE: number;
    lasT_REPLENISHMENT: string;
    type: any; // Tipo de producto, ajusta según corresponda
  }
  
  interface IPreOrderProduct {
    id: number;
    fK_PREORDER: number;
    fK_PRODUCT: number;
    fK_SIZE: number;
    quantity: number;
    coloR_PRIMARY: number;
    coloR_SECONDARY: number;
    size: IPreOrderSize;
    product: IPreOrderProducts;
    colorPrimary: IPreOrderColor;
    colorSecondary: IPreOrderColor;
  }
  
  export interface IPreOrderGet {
    id: number;
    fK_CLIENT: number;
    dateDelivery: string;
    dateCreated: string;
    isEditable: any; // Tipo de edición, ajusta según corresponda
    preOrderProducts: IPreOrderProduct[];
  }
  