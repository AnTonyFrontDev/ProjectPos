import { DATE } from "@/shared/Common/CurrentDate";

export interface IBankPost {
  id: number;
  user: number;
  date: string;
  name: string;
}

export class BankDto implements IBankPost {
  id: number;
  user: number;
  date: string;
  name: string;

  constructor() {
    this.id = 0;
    this.user = 0;
    this.date = DATE;
    this.name = "";
  }
}
