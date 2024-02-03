import { ProductsDtoAdd } from "./ProductToAdd"

export interface IPreOrder {
    fkClient: number
    user: number
    productsDtoAdds: ProductsDtoAdd[]
  }
  
