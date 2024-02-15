import { useState } from "react";
import FilterColor from "./FilterColor";
import FilterProducts from "./FilterProducts";
import FilterSize from "./FilterSize";
import {IProductsDtoAdd, ProductsDtoAdd} from '@/shared/interfaces/Preorder/ProductToAdd'
// import { IProductsDtoAdd, ProductsDtoAdd } from "@/shared/interfaces/Preorder/ProductToAdd";
const newProductToAdd: IProductsDtoAdd = new ProductsDtoAdd();

const Order = ({ productToAddList, setProductToAddList }) => {
    const [quantity, setQuantity] = useState(0);

    const productSelected = (productId: string) => {
        newProductToAdd.fkProduct = Number(productId);
    };

    const sizeSelected = (sizeId: string) => {
        newProductToAdd.fkSize = Number(sizeId);
    };

    const colorPrimarySelected = (colorId: string) => {
        newProductToAdd.fkColorPrimary = Number(colorId);
    };

    const colorSecondarySelected = (colorId: string) => {
        newProductToAdd.fkColorSecondary = Number(colorId);
    };

    const handleAddPreOrder = () => {
        newProductToAdd.quantity = quantity;
        setProductToAddList([...productToAddList, newProductToAdd]);
        setQuantity(0);
    };

    return (
        <div>
            {/* Componentes de filtro para seleccionar producto, tamaño y color */}
            <FilterProducts onProductSelect={productSelected} />
            <FilterSize onSizeSelected={sizeSelected} />
            <FilterColor onColorSelected={colorPrimarySelected} />
            <FilterColor onColorSelected={colorSecondarySelected} />

            {/* Campo para la cantidad */}
            <h2>Cantidad</h2>
            <input type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} />
            <button type="button" onClick={handleAddPreOrder}>Agregar pedido</button>

            {/* Lista de productos agregados */}
            <h2>Productos agregados:</h2>
            <ul>
                {productToAddList.map((product, index) => (
                    <li key={index}>{product.fkProduct}</li>
                ))}
            </ul>
        </div>
    );
};

export default Order;
