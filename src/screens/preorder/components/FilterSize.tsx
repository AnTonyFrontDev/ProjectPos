import { useState } from "react";
import { SizeApiFilter} from "@/shared/Api/Size/SizeApiFilter";
import { ISizeGet } from "@/shared/interfaces/size/ISizeGet";

const sizeApiFilter : SizeApiFilter = new SizeApiFilter();
const FilterSize = (props : { onSizeSelected : (sizeId:string) => void})=>{

    //estado para los sizes
    const [sizes,setSizes] = useState<ISizeGet[]>([]);
    //estado para el filtro
    const [filter,setFilter] = useState('name');
    //estado para el input
    const [inputFilter,setInputFilter] = useState('');
    //handler para manejar el filtro
    const handlerFilter = (event : React.ChangeEvent<HTMLSelectElement>)=>{
        setFilter(event.target.value);
    }
    //handler para manejar el input de filtro
    const handlerInputFilter = (event : React.ChangeEvent<HTMLInputElement>)=>{
        setInputFilter(event.target.value);
    }
    //handler para filtrar
    const handleBtnFilter = async ()=>{
        const list = await sizeApiFilter.filterBy(filter,inputFilter);
        setSizes(list);
    }
    //handler para manejar el size seleccionado
    const handleSelectedSize = (event : React.ChangeEvent<HTMLSelectElement>)=>{
        props.onSizeSelected(event.target.value);
    }
    return(
        <div>
            <select onChange={handlerFilter}>
                <option value={filter} hidden>Selecciona una opcion</option>
                <option value="name">Por nombre</option>
                <option value="category">Por categoria</option>
            </select>

            <input type="text" value={inputFilter} onChange={handlerInputFilter}/>
            <button type="button" onClick={handleBtnFilter}>Filtrar</button>

            {sizes.length !== 0 && (
                <select onChange={handleSelectedSize}>
                    <option value="0" hidden>Selecciona un size</option>
                    {sizes.map((size)=>(
                        <option key={size.id} value={size.id}>{size.size}</option>
                    ))}
                </select>
            )}
        </div>
    )
}


export default FilterSize;