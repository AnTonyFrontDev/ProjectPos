export interface IProductGet {
    id: number
    name_prod: string
    description: string
    sale_price: number
    type: string
  }
  
  export interface IProductColumns {
    title: string;
    dataIndex: string;
    key: string;
    render?: (data: IProductGet) => React.ReactNode;
  }