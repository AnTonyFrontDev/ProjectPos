import { IBaseModel } from "./IBaseModel";

export interface ISupplier extends IBaseModel {
    nombre: string;
    rnc?: string;
  }
  
  export class SupplierDto implements ISupplier {
    nombre: string;
    rnc?: string;
  
    constructor() {
      this.nombre = "";
      this.rnc = "";
    }
  }
  
  export class SupplierUpdateDto implements ISupplier {
    id: number;
    nombre: string;
    rnc?: string;
  
    constructor(formData : ISupplier) {
      this.id = formData.id || 0;
      this.nombre = formData.nombre;
      this.rnc = formData.rnc;
    }
  }
  
  
