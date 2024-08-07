export interface ISalePost {
  fkOrder: number;
  codIsc?: string | null; // Permitimos null para codIsc
  itbis: number;
  b14?: string | null;    // Permitimos null para b14
}

export class SaleDto implements ISalePost {
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
