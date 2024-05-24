
export interface IExpensesUpdate {
  id: number
  name: string
  description: string
  amount: number
  voucher: string
  documentNumber: string
  idPaymentType: number
  completed: boolean
  fkBankAccount: number
}

export class ExpensesUpdateDto implements IExpensesUpdate {
  id: number
  name: string
  description: string
  amount: number
  voucher: string
  documentNumber: string
  idPaymentType: number
  completed: boolean
  fkBankAccount: number

  constructor(formData: IExpensesUpdate) {
    this.name = formData.name;
    this.description = formData.description;
    this.amount = formData.amount;
    this.voucher = formData.voucher;
    this.documentNumber = formData.documentNumber;
    this.idPaymentType = formData.idPaymentType;
    this.completed = formData.completed;
    this.fkBankAccount = formData.fkBankAccount;
  }
}
