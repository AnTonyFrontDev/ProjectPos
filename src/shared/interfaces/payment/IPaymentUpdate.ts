import { DATE } from "@/shared/Common/CurrentDate";

export interface IPaymentUpdate {
  id: number;
  user: number;
  date: string;
  fkOrder: number;
  fkTypePayment: number;
  accountPayment: string;
  fkBankAccount: number;
  amount: number;
}


export class PaymentUpdateDto implements IPaymentUpdate {
  id: number;
  user: number;
  date: string;
  fkOrder: number;
  fkTypePayment: number;
  accountPayment: string;
  fkBankAccount: number;
  amount: number;

  constructor(formData: IPaymentUpdate) {
    this.id = formData.id;
    this.user = 1;
    this.date = DATE;
    this.fkOrder = formData.fkOrder;
    this.fkTypePayment = formData.fkTypePayment;
    this.accountPayment = formData.accountPayment;
    this.fkBankAccount = formData.fkBankAccount;
    this.amount = formData.amount;
  }
}