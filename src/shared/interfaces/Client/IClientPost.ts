import { ClientPhoneDto, IClientPhone } from "./IClientPhone";

export interface IClientPost {
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
}

export class ClientPostDto implements IClientPost {
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
