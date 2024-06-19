import { DATE } from "@/shared/Common/CurrentDate";

export interface IProductRemove {
    id: number
    user: number
    date: string
    removed: boolean
    }
    
    export class ProductRemoveDto implements IProductRemove {
      id: number;
      user: number;
      date: string;
      removed: boolean
  
    constructor({id} : {id: number}) {
      this.id = id;
      this.user = 1;
      this.date = DATE;
      this.removed = true;
    }
  }
  