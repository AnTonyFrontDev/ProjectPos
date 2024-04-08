export interface IPaymentColumns {
    id: number;
    date: string;
    fkOrder: number;
    fkTypePayment: number;
    fkBankAccount: number;
    amount: number;
}