export interface IOrderPost {
  id: number
  user: number
  date: string
  fkClient: number
  fkUser: number
  checked: boolean
  fkPreOrder: number
  descriptionJob: string
  products: IOrderProduct[]
}

export interface IOrderProduct {
  fkOrder: number
  fkInventoryColor: number
  quantity: number
}

export interface ICheckOrder {
  fkSize: number,
  fkProduct: number,
  fkColorPrimary: number,
  fkColorSecondary: number,
}
