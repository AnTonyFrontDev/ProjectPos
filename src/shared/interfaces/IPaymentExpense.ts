import { IBankAccount } from "./IBankAccount"
import { IBaseModel } from "./IBaseModel"
import { IExpenses } from "./IExpenses"

export interface IPaymentExpenses extends IBaseModel {
    expense?: IExpenses
    paymentType?: string
    bankAccount?: IBankAccount
    amount: number
    name?: string
}

export interface IPaymentExpenseSave extends IPaymentExpenses {
    idExpense: number
    idPaymentType: number
    idBankAccount: number | null
}
export class PaymentExpensesDtoAdd implements IPaymentExpenseSave {
    idExpense: number
    idPaymentType: number
    idBankAccount: number | null
    amount: number

    constructor() {
        this.idExpense = 0;
        this.idPaymentType = 0;
        this.idBankAccount = null;
        this.amount = 0;
    }
}
export class PaymentExpensesDtoUpdate implements IPaymentExpenseSave {
    id: number
    idExpense: number
    idPaymentType: number
    idBankAccount: number | null
    amount: number

    constructor(formData: IPaymentExpenseSave) {
        this.id = formData.id || 0;
        this.idExpense = formData.idExpense;
        this.idPaymentType = formData.idPaymentType;
        this.idBankAccount = formData.idBankAccount;
        this.amount = formData.amount;
    }
}

// export interface IPaymentExpenseDtoUpdate {
//     id: number
//     idExpense: number
//     idPaymentType: number
//     idBankAccount: number | null
//     amount: number
// }

// export interface IPayExpense {
//     id: number
//     name: string
//     description: string
//     amount: number
//     voucher: string
//     documentNumber: string
//     completed: boolean
// }

// export interface IPayBankAccount {
//     id: number
//     account: string
//     bankType: string
//     balance: number
// }





