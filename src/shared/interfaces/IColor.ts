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
        this.date = new Date().toISOString();
        this.colorname = '';
        this.code = '';
    }
}
