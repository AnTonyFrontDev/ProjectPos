export interface ISalePost {
  fkOrder: number;
  codIsc: string;
  itbis: number;
  b14?: string;
}

export class SaleDto implements ISalePost {
  fkOrder: number;
  codIsc: string;
  itbis: number;
  b14?: string;

  constructor() {
    this.fkOrder = 0;
    this.codIsc = "";
    this.itbis = 0;
    this.b14 = "";
  }
}