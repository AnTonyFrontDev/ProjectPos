import { DATE } from "@/shared/Common/CurrentDate"

export interface IProductUpdate {
  id: number
  user: number
  date: string
  name_prod: string
  description: string
  sale_price: number
  fk_type: number
}


export class ProductUpdateDto implements IProductUpdate {
  id: number;
  user: number;
  date: string;
  name_prod: string;
  description: string;
  sale_price: number;
  fk_type: number;

  constructor(formData: IProductUpdate) {
    this.id = formData.id;
    this.user = 1;
    this.date = DATE;
    this.name_prod = formData.name_prod;
    this.description = formData.description;
    this.sale_price = formData.sale_price;
    this.fk_type = formData.fk_type;
  }
}