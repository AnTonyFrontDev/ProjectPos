import { useState } from "react";
import { ProductsFilterApi } from "@/shared/Api/Products/productsFilterApi";
import { IProductGet } from "@/shared/interfaces/Product/IProductGet";
const productFilter : ProductsFilterApi = new ProductsFilterApi();
const FilterProducts = (props:{ onProductSelect :(productId:string) => void}) => {
  //estado para cuando filtren los productos
  const [products,setProducts] = useState<IProductGet[]>([]);
  //estado para el filtro
  const [filter, setFilter] = useState("name");
  //estado para el input de filtro
  const [inputFilter,setInputFilter] = useState("");
  //handler del tipo de filtro
  const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>)=>{
    setFilter(event.target.value);
  }
  //handler para manejar el producto seleccionado
  const handleSelectProduct = (event : React.ChangeEvent<HTMLSelectElement>)=>{
    props.onProductSelect(event.target.value);
  }
  //handler para manejar el cambio de input
  const handleInputFilter = (event: React.ChangeEvent<HTMLInputElement>)=>{
    setInputFilter(event.target.value);
  }
  //funcion para filtrar
  const filterClick = async() =>{
    const list = await productFilter.filterBy(filter,inputFilter);
    setProducts(list);
  }
  return (
    <div>
      <select onChange={handleFilter}>
        <option value={filter} hidden>Filtrar por:</option>
        <option value="name">Nombre de producto</option>
        <option value="type">Tipo</option>
        <option value="higherPrice">Precio mayor</option>
        <option value="minorPrice">Precio menor</option>
      </select>
      <input type="text" value={inputFilter} onChange={handleInputFilter}/>

      <button type="button" onClick={filterClick}>Filtar por: {filter}</button>
      {products.length !== 0 &&(
        <select onChange={handleSelectProduct}>
            <option value="" hidden>Selecciona un producto</option>
            {products.map((product)=>(
                <option value={product.id} key={product.id}>{product.name_prod}</option>
            ))}
        </select>
      )}
    </div>
  );
};

export default FilterProducts;
