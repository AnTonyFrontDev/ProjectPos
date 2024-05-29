export class PaymentExpensesDtoAdd implements  IPaymentExpenseDtoAdd{
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

    export interface IPaymentExpenseDtoAdd {
    idExpense: number
    idPaymentType: number
    idBankAccount: number | null
    amount: number
}
