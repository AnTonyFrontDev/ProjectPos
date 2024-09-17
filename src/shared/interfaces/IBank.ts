// import { DATE } from "@/shared/Common/CurrentDate";
import { DATE } from "@/shared/Common/CurrentDate";
import { IBaseModel } from "./IBaseModel";

export interface IBank extends IBaseModel {
  name? : string;
  bankName? : string;
};
export class BankDto implements IBank {
  id: number;
  user: number;
  date: string;
  name: string;
  bankName?: string;

  constructor() {
    this.id = 0;
    this.user = 0;
    this.date = DATE;
    this.name = "";
    this.bankName = "";
  }
}

export class BankUpdateDto implements IBank {
  id: number;
  user: number;
  date: string;
  name?: string;
  bankName?: string | undefined;
 

  constructor(formData : IBank) {
    this.id = formData.id || 0;
    this.user = 1;
    this.date = DATE;
    this.name = formData.bankName;
    this.bankName = formData.bankName;
  }
}


