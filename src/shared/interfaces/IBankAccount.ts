// import { DATE } from "@/shared/Common/CurrentDate";
import { DATE } from "@/shared/Common/CurrentDate";
import { IBaseModel } from "./IBaseModel";

export interface IBankAccount extends IBaseModel {
    account?: string;
    bankType?: string;
    balance: number
    bankAccount?: string;
    fkBank?: number;
}

export class BankAccountDto implements IBankAccount {
    id: number;
    user: number;
    date: string;
    bankAccount: string;
    fkBank: number;
    balance: number;

    constructor() {
        this.id = 0;
        this.user = 1;
        this.date = DATE;
        this.bankAccount = "";
        this.fkBank = 0;
        this.balance = 0;
    }
}

export class BankAccountUpdateDto implements IBankAccount {
    id: number;
    user: number;
    date: string;
    bankAccount?: string;
    fkBank?: number;
    balance: number;

  constructor(formData : IBankAccount) {
    this.id = formData.id || 0;
    this.user = 1;
    this.date = DATE;
    this.bankAccount = formData.bankAccount;
    this.fkBank = formData.fkBank;
    this.balance = formData.balance;
  }
}


