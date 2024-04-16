import { DATE } from "@/shared/Common/CurrentDate";

export interface IBankUpdate {
  id: number
  user: number
  date: string
  name: string
}

export class BankUpdateDto implements IBankUpdate {
  id: number;
  user: number;
  date: string;
  name: string;
 

  constructor(formData : IBankUpdate) {
    this.id = formData.id;
    this.user = 0;
    this.date = DATE;
    this.name = formData.name;
  }
}
