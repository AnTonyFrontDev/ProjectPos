export interface IBankPost {
  id: number;
  user: number;
  date: string;
  name: string;
}

export class BankPostDto implements IBankPost {
  id: number;
  user: number;
  date: string;
  name: string;

  constructor() {
    this.id = 0;
    this.user = 0;
    this.date = new Date().toISOString();
    this.name = "";
  }
}
