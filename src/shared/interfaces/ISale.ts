import { DATE } from "@/shared/Common/CurrentDate";
import { IPreOrderGet } from "./IPreOrder";
import { IBaseModel } from "./IBaseModel";
import { IClient } from "./IClient";

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
    client: IClient
    amountBase:number;
    preOrder: IPreOrderGet;
    fecha: string;
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
  

