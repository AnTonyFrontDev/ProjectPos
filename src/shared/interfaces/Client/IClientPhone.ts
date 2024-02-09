export interface IClientPhone {
    id: number;
    user: number;
    date: string;
    type: string;
    number: string;
    fk_client: number;
}

export class ClientPhoneDto implements IClientPhone {
    id: number;
    user: number;
    date: string;
    type: string;
    number: string;
    fk_client: number;

    constructor() {
        this.id = 0;
        this.user = 1;
        this.date = "2024-02-03T23:18:24.519Z";
        this.type = "";
        this.number = "";
        this.fk_client = 0;
    }
}