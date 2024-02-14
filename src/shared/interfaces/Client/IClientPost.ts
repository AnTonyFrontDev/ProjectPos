import { ClientPhoneDto, IClientPhone } from "./IClientPhone";

export interface IClientPost {
    user: number;
    date: string;
    f_name: string;
    l_name: string;
    f_surname: string;
    l_surname: string;
    rnc: string;
    dni: string;
    phonesClient: IClientPhone[];
}

export class ClientPostDto implements IClientPost {
    user: number;
    date: string;
    f_name: string;
    l_name: string;
    f_surname: string;
    l_surname: string;
    rnc: string;
    dni: string;
    phonesClient: IClientPhone[];
  
    constructor() {
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
