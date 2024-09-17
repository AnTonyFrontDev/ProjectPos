import { IBaseModel } from "./IBaseModel";
import { DATE } from "@/shared/Common/CurrentDate"

export interface ITypeProd extends IBaseModel {
    type?: string;
    typeProd?: string;
  }
    
  export class TypeProdDto implements ITypeProd {
    id: number
    user: number
    date: string
    typeProd?: string
    type?: string

    constructor() {
      this.id=0;
      this.user=1;
      this.date= DATE;
      this.type="";
      this.typeProd= "";
    }
  }  
  
  export class TypeProdUpdateDto implements ITypeProd {
    id: number
    user: number
    date: string
    type?: string
    typeProd?: string
  
  
    constructor(formData: ITypeProd) {
      this.id = formData.id || 0;
      this.user = 1;
      this.date = DATE;
      this.type = formData.type;
      this.typeProd = formData.type;
    }
  }