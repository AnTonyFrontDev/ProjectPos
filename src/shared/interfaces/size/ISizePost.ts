export interface ISizePost {
    id: number
    user: number
    date: string
    size: string
    fkCategory: number
  }
  
export class SizePostDto implements ISizePost {
  id: number;
  user: number;
  date: string;
  size: string;
  fkCategory: number;

  constructor() {
    this.id = 0;
    this.user = 1;
    this.date = new Date().toISOString();
    this.size = "";
    this.fkCategory = 0;
  }
}
