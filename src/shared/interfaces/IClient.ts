import { IBaseModel } from "./IBaseModel";
import { ClientPhoneDto, IClientPhone } from "./IClientPhone";
import { DATE } from "@/shared/Common/CurrentDate";

export interface IClient extends IBaseModel {
  f_name?: string
  l_name?: string
  f_surname?: string
  l_surname?: string
  rnc?: string
  dni?: string
  hasNoteCredit?: boolean
  amountNoteCredit?: number
  phones?: any[];
  phonesClient?: IClientPhone[];
}

export interface ICustomersColumns {
  title: string;
  dataIndex: string;
  key: string;
  render?: (data: IClient) => React.ReactNode;
}


export class ClientPostDto implements IClient {
  id?: number;
  user?: number;
  date?: string;
  f_name: string;
  l_name: string;
  f_surname: string;
  l_surname: string;
  rnc?: string;
  dni: string;
  phones?: any[];
  phonesClient?: IClientPhone[];

  constructor() {
    this.id = 0;
    this.user = 1;
    this.date = new Date().toISOString();
    this.f_name = "";
    this.l_name = "";
    this.f_surname = "";
    this.l_surname = "";
    this.rnc = "";
    this.dni = "";
    this.phonesClient = [new ClientPhoneDto()];
  }
}


// export interface IClientUpdate {
//   id?: number;
//   user?: number;
//   date?: string;
//   f_name: string;
//   l_name: string;
//   f_surname: string;
//   l_surname: string;
//   rnc?: string;
//   dni: string;
//   phones?: any[];
//   phonesClient?: IClientPhone[] ;
// }


export class ClientUpdateDto implements IClient {
  id?: number;
  user: number;
  date: string;
  f_name?: string;
  l_name?: string;
  f_surname?: string;
  l_surname?: string;
  rnc?: string;
  dni?: string;
  phones?: any[] | undefined;
  phonesClient?: IClientPhone[];

  constructor(formData: IClient) {
    this.id = formData.id;
    this.user = formData.user ?? 0;
    this.date = formData.date ?? DATE;
    this.f_name = formData.f_name;
    this.l_name = formData.l_name;
    this.f_surname = formData.f_surname;
    this.l_surname = formData.l_surname;
    this.rnc = formData.rnc;
    this.dni = formData.dni;
    this.phonesClient = formData.phonesClient ?? [];
  }
}

