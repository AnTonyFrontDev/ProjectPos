import { DATE } from "../Common/CurrentDate";
import { IBaseModel } from "./IBaseModel"

export interface IColor extends IBaseModel {
    colorname: string
    codE_COLOR?: string
    code?: string
}

export class ColorPostDto implements IColor {
    id: number;
    user: number;
    date: string;
    colorname: string;
    code: string;

    constructor() {
        this.id = 0;
        this.user = 1;
        this.date = DATE;
        this.colorname = '';
        this.code = '';
    }
}
export class ColorUpdateDto implements IColor {
    id: number;
    user: number;
    date: string;
    colorname: string;
    code: string;

    constructor(formData : IColor) {
        this.id = formData.id || 0;
        this.user = 1;
        this.date = DATE;
        this.colorname = formData.colorname || '';
        this.code = formData.code || '';
    }
}
