export interface IBaseModelID {
    id?: number;
    user?: number;
}
export interface IBaseModel extends IBaseModelID {
    date?: string;
    dateCreated?: string;
}

