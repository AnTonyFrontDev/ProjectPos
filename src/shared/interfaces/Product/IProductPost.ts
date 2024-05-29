import { DATE } from "@/shared/Common/CurrentDate"

export interface IProductPost {
    id: number
    user: number
    date: string
    name_prod: string
    description: string
    sale_price: number
    fk_type: number
  }
  
  export class ProductDtoPost implements IProductPost {
    id: number;
    user: number;
    date: string;
    name_prod: string;
    description: string;
    sale_price: number;
    fk_type: number;
  
    constructor() {
      this.id = 0;
      this.user = 1;
      this.date = DATE;
      this.name_prod = '';
      this.description = '';
      this.sale_price = 0;
      this.fk_type = 0;
    }
  }