import { DATE } from "@/shared/Common/CurrentDate";

export interface IPaymentPost {
  id: number;
  user: number;
  date: string;
  fkOrder: number;
  fkTypePayment: number;
  accountPayment: string | null;
  documentNumber: string | null;
  fkBankAccount: number | null;
  amount: number;
}

export class PaymentDto implements IPaymentPost {
  id: number;
  user: number;
  date: string;
  fkOrder: number;
  fkTypePayment: number;
  accountPayment: string | null;
  documentNumber: string | null;
  fkBankAccount: number | null;
  amount: number;

  constructor() {
    this.id = 0;
    this.user = 1;
    this.date = DATE;
    this.fkOrder = 0;
    this.fkTypePayment = 0;
    this.accountPayment = null; 
    this.documentNumber = null;  
    this.fkBankAccount = null;   
    this.amount = 0;
  }
}
