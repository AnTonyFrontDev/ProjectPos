import { DATE } from "@/shared/Common/CurrentDate"
import { IBaseModel } from "./IBaseModel"

export interface ISize extends IBaseModel {
    size?: string
    category?: string
    fkCategory?: number
    idInventory?: number
    quantity?: number
  }
  

export class SizePostDto implements ISize {
  id: number;
  user: number;
  date: string;
  size: string;
  fkCategory: number;

  constructor() {
    this.id = 0;
    this.user = 1;
    this.date = DATE;
    this.size = "";
    this.fkCategory = 0;
  }
}

  export class SizeUpdateDto implements ISize {
    id: number;
    user: number;
    date: string;
    size?: string;
    fkCategory?: number;
  
    constructor(formData: ISize) {
      this.id = formData.id || 0;
      this.user = 1;
      this.date = DATE;
      this.size = formData.size;
      this.fkCategory = formData.fkCategory;
    }
  }

