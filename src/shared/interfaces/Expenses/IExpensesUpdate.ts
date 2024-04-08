import { DATE } from "@/shared/Common/CurrentDate"

export interface IExpensesUpdate {
    id: number
    user: number
    date: string
    name: string
    description: string
    amount: number
    voucher: string
  }

  export class ExpensesUpdateDto implements IExpensesUpdate {
    id: number
    user: number
    date: string
    name: string
    description: string
    amount: number
    voucher: string
  
    constructor(formData: IExpensesUpdate) {
      this.id = formData.id;
      this.user = 0;
      this.date = DATE;
      this.name = formData.name;
      this.description = formData.description;
      this.amount = formData.amount;
      this.voucher = formData.voucher;
    }
  }
  