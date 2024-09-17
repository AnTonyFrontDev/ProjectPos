import { IBaseModel } from "./IBaseModel";

export interface ISupplier extends IBaseModel {
    nombre: string;
  }

  export class SupplierDto implements ISupplier {
    nombre: string;
  
    constructor() {
      this.nombre = "";
    }
  }
  
  export class SupplierUpdateDto implements ISupplier {
    id: number;
    nombre: string;
  
    constructor(formData : ISupplier) {
      this.id = formData.id || 0;
      this.nombre = formData.nombre;
    }
  }
  
  
