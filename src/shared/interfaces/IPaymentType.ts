import { DATE } from "@/shared/Common/CurrentDate";
import { IBaseModel } from "./IBaseModel";

export interface IPaymentType extends IBaseModel {
    type: string;
}

export class PaymentTypePostDto implements IPaymentType {
    id: number = 0;
    user: number = 0;
    date: string = DATE;
    type: string = '';
}

export class PaymentTypeUpdateDto implements IPaymentType {
    id: number
    user: number
    date: string
    type: string

    constructor(formData: IPaymentType) {
        this.id = formData.id || 0;
        this.user = 1;
        this.date = DATE;
        this.type = formData.type;
    }
}
