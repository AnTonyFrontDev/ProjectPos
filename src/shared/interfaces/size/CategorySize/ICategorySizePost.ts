export interface ICategorySizePost {
    id: number
    category: string
  }
  
  export class CategorySizePostDto implements ICategorySizePost {
    id: number;
    category: string;
  
    constructor() {
      this.id = 0;
      this.category = '';
    }
  }