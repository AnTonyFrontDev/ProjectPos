import { DATE } from "@/shared/Common/CurrentDate"

export interface IExpensesPost {
    id: number
    user: number
    date: string
    name: string
    description: string
    amount: number
    voucher: string
  }
  
  export class ExpensesDto implements IExpensesPost {
    id: number
    user: number
    date: string
    name: string
    description: string
    amount: number
    voucher: string
  
    constructor() {
      this.id = 0;
      this.user = 0;
      this.date = DATE;
      this.name = '';
      this.description = '';
      this.amount = 0;
      this.voucher = '';
    }
  }