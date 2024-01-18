// interfaces.ts
export interface ProductDetail {
    id: number | null;
    name: string;
    description: string;
    salePrice: number;
    type: string;
    totalQuantity: number;
    availableSizes: AvailableSize[];
}

export interface AvailableSize {
    idInventory: number;
    size: string;
    quantity: number;
    availableColors: AvailableColor[];
}

export interface AvailableColor {
    idInventory: number;
    colorPrimary: Color;
    colorSecondary: Color;
    quantity: number;
}

export interface Color {
    id: number;
    colorname: string;
    code: string;
}

export interface ColorInfo {
    colorPrimary: {
        id: number;
        colorname: string;
        code: string;
    };
    colorSecondary: {
        id: number;
        colorname: string;
        code: string;
    };
    quantity: number;
}

export interface DetalleProducto {
    id: number | null;
    name: string;
    description: string;
    salePrice: number;
    type: string;
    totalQuantity: number;
    availableSizes: any[]; // Ajusta el tipo según la estructura real de availableSizes
    colors: ColorInfo[]; // Agrega información de colores
}


