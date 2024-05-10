import { DATE } from "@/shared/Common/CurrentDate";

export interface IPaymentTypeUpdate {
  id: number;
  user?: number;
  date: string;
  type: string;
}

export class PaymentTypeUpdateDto implements IPaymentTypeUpdate {
  id: number
  user: number
  date: string
  type: string


  constructor(formData: IPaymentTypeUpdate) {
    this.id = formData.id;
    this.user = 1;
    this.date = DATE;
    this.type = formData.type;
  }
}
