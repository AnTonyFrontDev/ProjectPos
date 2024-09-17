import { DATE } from "@/shared/Common/CurrentDate";
import { IBaseModel } from "./IBaseModel";

export interface ICategorySize extends IBaseModel {
    category: string
}

export class CategorySizeDto implements ICategorySize {
    id: number;
    category: string;

    constructor() {
        this.id = 0;
        this.category = '';
    }
}

export class CategorySizeUpdateDto implements ICategorySize {
    id: number
    user: number
    date: string
    category: string


    constructor(formData: ICategorySize) {
        this.id = formData.id || 0;
        this.user = 0;
        this.date = DATE;
        this.category = formData.category;
    }
}

