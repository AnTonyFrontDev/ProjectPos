export interface IPaymentTypePost {
    id: number
    user: number
    date: string
    type: string
  }
  
  export class PaymentTypePostDto implements IPaymentTypePost {
    id: number = 0;
    user: number = 0;
    date: string = new Date().toISOString();
    type: string = '';
  }
  