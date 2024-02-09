import { useState } from "react";
import { ColorFilterApi } from "../../../shared/Api/Color/ColorApiFilter";
import { IColorGet } from "../../../shared/interfaces/screens/Color/IColorGet";

const FilterColor = (props : { onColorSelected : (sizeId:string) => void})=>{
    //colors
    const [colors,setColors] = useState<IColorGet[]>([]);
    //filtro
    const [filter,setFilter] = useState("name"); 
    //valor a filtrar
    const [inputFilter,setInputFilter] = useState("");

    //handler inputFilter 
    const handleInputFilter = (event:React.ChangeEvent<HTMLInputElement>)=>{
        setInputFilter(event.target.value);
    }
    //handler para saber por que filtrar
    const handleFilter = (event:React.ChangeEvent<HTMLSelectElement>)=>{
        setFilter(event.target.value);
    }
    //handler para filtrar
    const filterClick = async()=>{
        const list = await ColorFilterApi.filterBy(filter,inputFilter);
        setColors(list);
    }
    //handler para manejar el color seleccionado
    const handleSelectedColor = (event : React.ChangeEvent<HTMLSelectElement>)=>{
        props.onColorSelected(event.target.value);
    }
    return(
        <div>
            <select onChange={handleFilter}>
                <option hidden value={filter}>Filtrar por:</option>
                <option value="name">Por nombre</option>
                <option value="colorCode">Por codigo de color</option>
            </select>
            <input type="text" value={inputFilter} onChange={handleInputFilter}/>
            <button type="button" onClick={filterClick}>Filtrar</button>

            {colors.length !== 0 &&(
                <select onChange={handleSelectedColor}>
                    <option value="" hidden>Selecciona un color</option>
                    {colors.map((color)=>(
                        <option value={color.id} key={color.id}>{color.colorname} #{color.code}</option>
                    ))}
                </select>
            )}
        </div>
    )
}

export default FilterColor;