// Interface para la información de una compra para actualizar
export interface IBuyUpdate {
    id: number;
    company: string;
    rnc: string;
    ncf: string;
    datE_MADE: {
        year: number;
        month: number;
        day: number;
        dayOfWeek: number;
    };
}

// Implementación de la interfaz IBuyUpdate
export class BuyUpdateDto implements IBuyUpdate {
    id: number;
    company: string;
    rnc: string;
    ncf: string;
    datE_MADE: {
        year: number;
        month: number;
        day: number;
        dayOfWeek: number;
    };

    constructor() {
        this.id = 0;
        this.company = '';
        this.rnc = '';
        this.ncf = '';
        this.datE_MADE = {
            year: 0,
            month: 0,
            day: 0,
            dayOfWeek: 0
        };
    }
}


