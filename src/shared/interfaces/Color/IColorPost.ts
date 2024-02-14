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
      this.user = 0;
      this.date = '';
      this.colorname = '';
      this.code = '';
    }
  }
  