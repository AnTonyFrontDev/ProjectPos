import { IBaseModel } from "./IBaseModel"

export interface IExpenses extends IBaseModel {
    name: string
    description?: string
    amount?: number
    voucher?: string
    documentNumber?: string
    idPaymentType?: number
    completed?: boolean
    fkBankAccount?: number
}

export class ExpensesDto implements IExpenses {
    name: string
    description: string
    amount: number
    voucher: string
    documentNumber: string
    idPaymentType: number
    fkBankAccount?: number

    constructor() {
        this.name = '';
        this.description = '';
        this.amount = 0;
        this.voucher = '';
        this.idPaymentType = 0;
        this.fkBankAccount = 0;
    }
}


export class ExpensesUpdateDto implements IExpenses {
    id: number
    name: string
    description: string 
    amount: number
    voucher: string
    documentNumber: string
    idPaymentType?: number
    completed?: boolean
    fkBankAccount?: number

    constructor(formData: IExpenses) {
        this.name = formData.name;
        this.description = formData.description || '';
        this.amount = formData.amount || 0;
        this.voucher = formData.voucher || '';
        this.documentNumber = formData.documentNumber || '';
        this.idPaymentType = formData.idPaymentType;
        this.completed = formData.completed;
        this.fkBankAccount = formData.fkBankAccount;
    }
}
