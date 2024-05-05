
export interface IExpensesUpdate {
  id: number
  name: string
  description: string
  amount: number
  voucher: string
  documentNumber: string
  idPaymentType: number
}

export class ExpensesUpdateDto implements IExpensesUpdate {
  id: number
  name: string
  description: string
  amount: number
  voucher: string
  documentNumber: string
  idPaymentType: number

  constructor(formData: IExpensesUpdate) {
    this.name = formData.name;
    this.description = formData.description;
    this.amount = formData.amount;
    this.voucher = formData.voucher;
  }
}
