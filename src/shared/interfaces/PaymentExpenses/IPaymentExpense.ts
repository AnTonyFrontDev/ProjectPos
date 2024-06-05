export interface IPaymenExpenses {
    id: number
    expense: IPayExpense
    paymentType: string
    bankAccount: IPayBankAccount
    amount: number
}

export interface IPayExpense {
    id: number
    name: string
    description: string
    amount: number
    voucher: string
    documentNumber: string
    completed: boolean
}

export interface IPayBankAccount {
    id: number
    account: string
    bankType: string
    balance: number
}
