interface IClient {
    id: number;
    f_name: string;
    l_name: string;
    f_surname: string;
    l_surname: string;
    rnc: string;
    dni: string;
    hasNoteCredit: boolean;
    amountNoteCredit: number;
  }
  
  interface IPreOrderSize {
    id: number;
    size: string;
    category: any; // Ajusta según sea necesario
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
    type: any; // Ajusta según sea necesario
  }
  
  interface IPreOrderProduct {
    id: number;
    fK_PREORDER: number;
    fK_PRODUCT: number;
    fK_SIZE: number;
    quantity: number;
    coloR_PRIMARY: number;
    coloR_SECONDARY: number;
    custoM_PRICE: number;
    size: IPreOrderSize;
    product: IPreOrderProducts;
    colorPrimary: IPreOrderColor;
    colorSecondary: IPreOrderColor;
  }
  
  export interface IPreOrderGetPending {
    id: number;
    fK_CLIENT: number;
    dateDelivery: string;
    dateCreated: string;
    isEditable: any; // Ajusta según sea necesario
    amount: number | null;
    amountBase: number;
    finished: any; // Ajusta según sea necesario
    isCompleted: any; // Ajusta según sea necesario
    preOrderProducts: IPreOrderProduct[];
    order: any[]; // Ajusta según sea necesario
    client: IClient;
  }
  