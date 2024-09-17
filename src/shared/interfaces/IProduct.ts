import { DATE } from "@/shared/Common/CurrentDate";
import { IBaseModel } from "./IBaseModel";
import { IColor } from "./IColor";
import { ISize } from "./ISize";

export interface IProduct extends IBaseModel {
  name_prod?: string
  description?: string
  sale_price?: number
  type?: string
  colorsAsocieted?: IColor[]
  sizeAsocieted?: ISize[]
  fk_type?: number
  removed?: boolean
}

export class ProductDtoPost implements IProduct {
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

export class ProductUpdateDto implements IProduct {
  id: number;
  user: number;
  date: string;
  name_prod?: string;
  description?: string;
  sale_price?: number;
  fk_type: number;

  constructor(formData: IProduct) {
    this.id = formData.id || 0;
    this.user = 1;
    this.date = DATE;
    this.name_prod = formData.name_prod;
    this.description = formData.description;
    this.sale_price = formData.sale_price;
    this.fk_type = formData.fk_type || 0;
  }
}

export class ProductRemoveDto implements IProduct {
  id: number;
  user: number;
  date: string;
  removed?: boolean

  constructor({ id }: { id: number }) {
    this.id = id;
    this.user = 1;
    this.date = DATE;
    this.removed = true;
  }
}