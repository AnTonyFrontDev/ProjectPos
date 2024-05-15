export interface IPaymentPost {
  id: number;
  user: number;
  date: string;
  fkOrder: number;
  fkTypePayment: number;
  accountPayment: string;
  fkBankAccount: number;
  amount: number;
}

export class PaymentDto implements IPaymentPost {
  id: number;
  user: number;
  date: string;
  fkOrder: number;
  fkTypePayment: number;
  accountPayment: string;
  fkBankAccount: number;
  amount: number;

  constructor() {
    this.id = 0;
    this.user = 1;
    this.date = '';
    this.fkOrder = 0;
    this.fkTypePayment = 0;
    this.accountPayment = '';
    this.fkBankAccount = 0;
    this.amount = 0;
  }
}
