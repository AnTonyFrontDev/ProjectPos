export interface IOrderPost {
    id: number
    user: number
    date: string
    fkClient: number
    fkUser: number
    checked: boolean
    fkPreOrder: number
    descriptionJob: string
    products: Product[]
  }
  
  export interface Product {
    fkOrder: number
    fkInventoryColor: number
    quantity: number
  }
  