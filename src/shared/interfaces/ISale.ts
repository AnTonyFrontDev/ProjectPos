import { DATE } from "@/shared/Common/CurrentDate";
import { IPreOrder } from "./IPreOrder";
import { IBaseModel } from "./IBaseModel";

export interface ISale extends IBaseModel {
    amount?: number;
    codIsc?: string | null;
    fkPreOrder?: number;
    b14?: string | null;
    itbis?: number;
    fkOrder?: number;
  }

  export interface ISaleData extends ISale {
    clientName: string;
    amountBase:number;
    preOrder: IPreOrder;
    fecha: string;
  }  

  export interface ISalePost {
    fkOrder: number;
    codIsc?: string | null; // Permitimos null para codIsc
    itbis: number;
    b14?: string | null;    // Permitimos null para b14
  }
  
  export class SaleDto implements ISale {
    fkOrder: number;
    codIsc?: string | null;
    itbis: number;
    b14?: string | null;
  
    constructor() {
      this.fkOrder = 0;
      this.codIsc = null; // Inicializado a null
      this.itbis = 0;
      this.b14 = null;    // Inicializado a null
    }
  }
  
  export class SaleUpdateDto implements ISale {
    id: number;
    user: number;
    date: string;
    fkPreOrder: number;
    codIsc: string | null;
    itbis?: number;
  
    constructor(formData: ISale) {
      this.id = formData.id || 0;
      this.user = 0;
      this.date = DATE;
      this.fkPreOrder = formData.fkPreOrder || 0;
      this.codIsc = formData.codIsc || null;
      this.itbis = formData.itbis;
    }
  }
  

