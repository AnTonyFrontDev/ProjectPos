import { ProductsDtoAdd } from "./ProductToAdd"

export interface IPreOrder {
    fkClient: number
    dateDelivery: string 
    user: number
    productsDtoAdds: ProductsDtoAdd[]
  }
  

  export class PreOrderPostDto implements IPreOrder {
    fkClient: number;
    dateDelivery: string;
    user: number;
    productsDtoAdds: ProductsDtoAdd[];

    constructor() {
        this.fkClient = 0;
        this.dateDelivery = '';
        this.user = 1;
        this.productsDtoAdds = [new ProductsDtoAdd()];
    }
}
