export interface IColorPost {
    id: number
    user: number
    date: string
    colorname: string
    code: string
  }


  export class ColorPostDto implements IColorPost {
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
  