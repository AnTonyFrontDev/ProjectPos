import { DATE } from "@/shared/Common/CurrentDate";

export interface ISaleUpdate {
    id: number;
    user: number;
    date: string;
    fkPreOrder: number;
    codIsc: string;
    itbis: number;
  }
  
  export class SaleUpdateDto implements ISaleUpdate {
    id: number;
    user: number;
    date: string;
    fkPreOrder: number;
    codIsc: string;
    itbis: number;
  
    constructor(formData: ISaleUpdate) {
      this.id = formData.id;
      this.user = 0;
      this.date = DATE;
      this.fkPreOrder = formData.fkPreOrder;
      this.codIsc = formData.codIsc;
      this.itbis = formData.itbis;
    }
  }