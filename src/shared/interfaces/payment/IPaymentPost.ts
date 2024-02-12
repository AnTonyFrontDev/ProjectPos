export interface IPaymentPost {
  id: number;
  user: number;
  date: string;
  fkOrder: number;
  fkTypePayment: number;
  fkBankAccount: number;
  amount: number;
}
