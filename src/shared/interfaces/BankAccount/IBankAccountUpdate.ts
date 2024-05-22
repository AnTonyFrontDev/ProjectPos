import { DATE } from "@/shared/Common/CurrentDate";

export interface IBankAccountUpdate {
    id: number;
    user: number;
    date: string;
    bankAccount: string;
    fkBank: number;
    balance: number;
}

export class BankAccountUpdateDto implements IBankAccountUpdate {
    id: number;
    user: number;
    date: string;
    bankAccount: string;
    fkBank: number;
    balance: number;

  constructor(formData : IBankAccountUpdate) {
    this.id = formData.id;
    this.user = 1;
    this.date = DATE;
    this.bankAccount = formData.bankAccount;
    this.fkBank = formData.fkBank;
    this.balance = formData.balance;
  }
}
