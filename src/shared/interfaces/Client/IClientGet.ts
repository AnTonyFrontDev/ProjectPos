export interface IClientGet {
    id: number
    f_name: string
    l_name: string
    f_surname: string
    l_surname: string
    rnc: string
    dni: string
  }
  
export interface ICustomersColumns {
  title: string;
  dataIndex: string;
  key: string;
  render?: (data: IClientGet) => React.ReactNode;
}