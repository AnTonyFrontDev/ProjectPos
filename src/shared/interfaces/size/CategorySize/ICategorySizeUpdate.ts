import { DATE } from "@/shared/Common/CurrentDate";

export interface ICategorySizeUpdate {
  id: number;
  user?: number;
  date?: string;
  category: string;
}

export class CategorySizeUpdateDto implements ICategorySizeUpdate {
  id: number
  user: number
  date: string
  category: string


  constructor(formData: ICategorySizeUpdate) {
    this.id = formData.id;
    this.user = 0;
    this.date = DATE;
    this.category = formData.category;
  }
}
