export interface IProduct {
    id: number;
    user: number;
    date: string;
    name_prod: string;
    description: string;
    sale_price: number;
    fk_type: number;
  }
  
  export class ProductDto implements IProduct {
    id: number;
    user: number;
    date: string;
    name_prod: string;
    description: string;
    sale_price: number;
    fk_type: number;
  
    constructor() {
      this.id = 0;
      this.user = 0;
      this.date = "2024-02-04T16:37:48.265Z";
      this.name_prod = "";
      this.description = "";
      this.sale_price = 0;
      this.fk_type = 0;
    }
  }
  