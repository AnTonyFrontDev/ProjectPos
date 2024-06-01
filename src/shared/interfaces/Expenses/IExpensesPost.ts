
export interface IExpensesPost {
  name: string
  description: string
  amount: number
  voucher: string
  documentNumber: string

  }
  
  export class ExpensesDto implements IExpensesPost {
    name: string
    description: string
    amount: number
    voucher: string
    documentNumber: string
    idPaymentType: number
    fkBankAccount?: number
  
    constructor() {
      this.name = '';
      this.description = '';
      this.amount = 0;
      this.voucher = '';
      this.idPaymentType= 0;
      this.fkBankAccount=0;
    }
  }