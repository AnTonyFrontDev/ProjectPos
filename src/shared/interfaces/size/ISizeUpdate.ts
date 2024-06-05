import { DATE } from "@/shared/Common/CurrentDate"

export interface ISizeUpdate {
    id: number
    user: number
    date: string
    size: string
    fkCategory: number
  }
  
  export class SizeUpdateDto implements ISizeUpdate {
    id: number;
    user: number;
    date: string;
    size: string;
    fkCategory: number;
  
    constructor(formData: ISizeUpdate) {
      this.id = formData.id;
      this.user = 1;
      this.date = DATE;
      this.size = formData.size;
      this.fkCategory = formData.fkCategory;
    }
  }

