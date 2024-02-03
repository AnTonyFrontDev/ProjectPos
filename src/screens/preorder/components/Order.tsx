import { useState } from "react";
import FilterColor from "./FilterColor";
import FilterProducts from "./FilterProducts";
import FilterSize from "./FilterSize";
import { IProductsDtoAdd, ProductsDtoAdd } from "@/shared/interfaces/Preorder/ProductToAdd";

const productToAdd : IProductsDtoAdd = new ProductsDtoAdd();

const Order = ()=>{

    //estado para la cantidad
    const [quantity,setQuantity] = useState(0);

    //handler de la cantidad
    const handlerQuantity = (event : React.ChangeEvent<HTMLInputElement>) =>{
        setQuantity(parseInt(event.target.value));
    }
    //producto
    const productSelected = (productId : string)=>{
        productToAdd.fkProduct = Number(productId);
    }
    //size
    const sizeSelected = (sizeId : string)=>{
        productToAdd.fkSize =  Number(sizeId) ;
    }
    //color primario
    const colorPrimarySelected = (colorId : string) =>{
        productToAdd.fkColorPrimary = Number(colorId);
    }
    //color secundario
    const colorSecondarySelected = (colorId : string) =>{
        productToAdd.fkColorSecondary = Number(colorId)
    }
    //handler para agegar los pedidos
    const AddPreOrder = ()=>{
        productToAdd.quantity = quantity;
        console.log(productToAdd);
    }
    return(
        <div>
            <h1>Producto a agregar en la orden:</h1>
            {/* Filtro para productos */}
            <FilterProducts onProductSelect={productSelected}/>

            {/* Filtro para sizes */}
            <FilterSize onSizeSelected={sizeSelected}/>

            {/* Filtro para colores */}
            <h2>Color primario</h2>
            <FilterColor onColorSelected={colorPrimarySelected}></FilterColor>
            <h2>Color Secundario</h2>
            <FilterColor onColorSelected={colorSecondarySelected}></FilterColor>
            <h2>Cantidad</h2>
            <input type="number" value={quantity} onChange={handlerQuantity}/>
            <button type="button" onClick={AddPreOrder}>Agregar pedido</button>
            
            {/* ordenes */}
            <div>

            </div>
        </div>
    )
}

export default Order;