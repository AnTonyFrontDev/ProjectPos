import { DATE } from "@/shared/Common/CurrentDate";

export interface IBankUpdate {
  id: number
  user: number
  date: string
  name?: string
  bankName?: string
}

export class BankUpdateDto implements IBankUpdate {
  id: number;
  user: number;
  date: string;
  name?: string;
  bankName?: string | undefined;
 

  constructor(formData : IBankUpdate) {
    this.id = formData.id;
    this.user = 1;
    this.date = DATE;
    this.name = formData.bankName;
    this.bankName = formData.bankName;
  }
}
