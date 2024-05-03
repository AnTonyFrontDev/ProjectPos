
export interface IExpensesPost {
  name: string
  description: string
  amount: number
  voucher: string
  documentNumber: string
  idPaymentType: number
  }
  
  export class ExpensesDto implements IExpensesPost {
    name: string
    description: string
    amount: number
    voucher: string
    documentNumber: string
    idPaymentType: number
  
    constructor() {
      this.name = '';
      this.description = '';
      this.amount = 0;
      this.voucher = '';
    }
  }