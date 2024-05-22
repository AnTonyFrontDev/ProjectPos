import { DATE } from "@/shared/Common/CurrentDate";

export interface IPaymentTypePost {
    id: number
    user: number
    date: string
    type: string
  }
  
  export class PaymentTypePostDto implements IPaymentTypePost {
    id: number = 0;
    user: number = 0;
    date: string = DATE;
    type: string = '';
  }
  