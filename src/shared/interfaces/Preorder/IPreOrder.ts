import { ProductsDtoAdd } from "./ProductToAdd"

export interface IPreOrder {
    fkClient: number
    dateDelivery: string // Formato ISO 8601: "YYYY-MM-DDTHH:MM:SS.sssZ"
    user: number
    productsDtoAdds: ProductsDtoAdd[]
  }
  
