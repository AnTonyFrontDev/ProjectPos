export interface IPaymenExpenses {
    id: number
    expense: Expense
    paymentType: string
    bankAccount: BankAccount
    amount: number
}

export interface Expense {
    id: number
    name: string
    description: string
    amount: number
    voucher: string
    documentNumber: string
    completed: boolean
}

export interface BankAccount {
    id: number
    account: string
    bankType: string
    balance: number
}
