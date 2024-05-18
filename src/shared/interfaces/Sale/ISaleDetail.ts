interface Client {
    f_name: string;
    f_surname: string;
    l_surname: string;
    rnc: string;
    dni: string;
  }
  
  interface Product {
    id: number;
    namE_PRODUCT: string;
    descriptioN_PRODUCT: string;
    salE_PRICE: number;
  }
  
  interface Size {
    id: number;
    size: string;
  }
  
  interface Color {
    id: number;
    colorname: string;
    codE_COLOR: string;
  }
  
  interface PreOrderProduct {
    id: number;
    quantity: number;
    size: Size;
    product: Product;
    colorPrimary: Color;
    colorSecondary: Color;
  }
  
  interface PreOrder {
    client: Client;
    preOrderProducts: PreOrderProduct[];
  }
  
  export interface ISaleData {
    clientName: string;
    preOrder: PreOrder;
    amount: number;
    itbis: number;
    fecha: string;
  }
  
  export interface IBillDetailProps {
    saleId: number;
  }
  