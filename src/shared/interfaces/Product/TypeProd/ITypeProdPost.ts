import { DATE } from "@/shared/Common/CurrentDate"

export interface ITypeProdPost {
    id: number
    user: number
    date: string
    type?: string
    typeProd?: string
  }
  
  export class TypeProdDto implements ITypeProdPost {
    id: number
    user: number
    date: string
    // type: string
    typeProd: string

    constructor() {
      this.id=0;
      this.user=1;
      this.date= DATE;
      // this.type=""
      this.typeProd= "";
    }
  }
