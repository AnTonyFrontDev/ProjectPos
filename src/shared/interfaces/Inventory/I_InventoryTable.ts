export interface ISizeQA {
    idInventory: number;
    size: string;
    quantity: number;
  }
  
  
export interface IAvailableSizesColumn {
    title: string;
    dataIndex: string;
    key: string;
    render: (availableSizes: ISizeQA[]) => React.ReactNode;
}