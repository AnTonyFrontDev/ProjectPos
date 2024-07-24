import { DATE } from "@/shared/Common/CurrentDate";

export interface IClientUpdate {
  id?: number;
  user?: number;
  date?: string;
  f_name: string;
  l_name: string;
  f_surname: string;
  l_surname: string;
  rnc?: string;
  dni: string;
}

export class ClientUpdateDto implements IClientUpdate {
  id?: number;
  user: number;
  date: string;
  f_name: string;
  l_name: string;
  f_surname: string;
  l_surname: string;
  rnc?: string;
  dni: string;

  constructor(formData: IClientUpdate) {
    this.id = formData.id;
    this.user = formData.user ?? 0;
    this.date = formData.date ?? DATE;
    this.f_name = formData.f_name;
    this.l_name = formData.l_name;
    this.f_surname = formData.f_surname;
    this.l_surname = formData.l_surname;
    this.rnc = formData.rnc;
    this.dni = formData.dni;
  }
}
  