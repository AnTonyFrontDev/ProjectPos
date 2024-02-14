export interface    IClientPhone {
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
        this.date = new Date().toISOString();
        this.type = "";
        this.number = "";
        this.fk_client = 0;
    }
}