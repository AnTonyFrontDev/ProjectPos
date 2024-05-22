import { DATE } from "@/shared/Common/CurrentDate";

export interface IBankAccountPost {
    id: number;
    user: number;
    date: string;
    bankAccount: string;
    fkBank: number;
    balance: number;
}

export class BankAccountDto implements IBankAccountPost {
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
