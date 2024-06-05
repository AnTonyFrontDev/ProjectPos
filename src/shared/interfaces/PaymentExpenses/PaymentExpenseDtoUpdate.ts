export class PaymentExpensesDtoUpdate implements IPaymentExpenseDtoUpdate {
    id: number
    idExpense: number
    idPaymentType: number
    idBankAccount: number | null
    amount: number

    constructor(formData : IPaymentExpenseDtoUpdate) {
        this.id = formData.id;
            this.idExpense = formData.idExpense;
        this.idPaymentType = formData.idPaymentType;
        this.idBankAccount = formData.idBankAccount;
        this.amount = formData.amount;
    }
}

export interface IPaymentExpenseDtoUpdate {
    id: number
    idExpense: number
    idPaymentType: number
    idBankAccount: number | null
    amount: number
}


