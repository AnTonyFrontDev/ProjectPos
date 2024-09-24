import { DATE } from "@/shared/Common/CurrentDate";
import { IBaseModel } from "./IBaseModel";
import { IClient } from "./IClient";

export interface IPayment extends IBaseModel{
    idOrder?: number;
    amount: number;
    accountPayment: string | null;
    paymentNumbers?: number;
    client?: IClient;
    amountPending?: number;
    type?: string;
    bank?: string;
    account?: string;
    documentNumber?: string | null;
}

export interface IPaymentPostPut extends IPayment {
  fkOrder: number;
  fkTypePayment: number;
  fkBankAccount: number | null;
}

export class PaymentDto implements IPaymentPostPut {
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

// export interface IPaymentColumns  {
//     id: number;
//     date: string;
//     fkOrder: number;
//     fkTypePayment: number;
//     fkBankAccount: number;
//     amount: number;
// }

export class PaymentUpdateDto implements IPaymentPostPut {
  id: number;
  user: number;
  date: string;
  fkOrder: number;
  fkTypePayment: number;
  accountPayment: string | null;
  documentNumber: string | null;
  fkBankAccount: number | null;
  amount: number;

  constructor(formData: IPaymentPostPut) {
    this.id = formData.id ?? 0;
    this.user = 1;
    this.date = DATE;
    this.fkOrder = formData.fkOrder;
    this.fkTypePayment = formData.fkTypePayment;
    this.accountPayment = formData.accountPayment ?? null; 
    this.documentNumber = formData.documentNumber ?? null; 
    this.fkBankAccount = formData.fkBankAccount ?? null;   
    this.amount = formData.amount;
  }
}
