import { DATE } from "@/shared/Common/CurrentDate";

export interface ITypeProdUpdate {
  id: number;
  user?: number;
  date?: string;
  type?: string;
  typeProd?: string;
}


export class TypeProdUpdateDto implements ITypeProdUpdate {
  id: number
  user: number
  date: string
  type?: string
  typeProd?: string


  constructor(formData: ITypeProdUpdate) {
    this.id = formData.id;
    this.user = 1;
    this.date = DATE;
    this.type = formData.type;
    this.typeProd = formData.type;
  }
}