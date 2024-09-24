import {GetExpensesPaginated} from "@/util/TestPaginationUtils/PaginationController.ts"
import {useEffect, useState} from "react";
import {ExpensesUpdateDto} from "@/shared/interfaces/Expenses/IExpensesUpdate.ts";
import IPagination from "@/shared/interfaces/IPagination";

const PaginationParams = () => {
    const [itemsPerPage, setItemsPerPage] = useState(1);
    const [page, setPage] = useState<number>(1);
    const [data, setData] = useState<ExpensesUpdateDto[]>()
    //estado para el manejo de la paginacion
    const [dataPagination, setDataPagination] = useState<IPagination>();

    //extrar logica
    const getData = async () =>{
        return await GetExpensesPaginated(itemsPerPage,page)
    }
    const fetchData = ()=>{
        getData().then((response)=>{
            setData(response.data.data as ExpensesUpdateDto[]);
            setDataPagination((obj) =>{
                let objOld = {...obj} as IPagination;
                objOld = JSON.parse(response.headers["x-pagination"]) as IPagination;
                return objOld;
            })
        });
    }
    useEffect(() => {
        fetchData();


    },[page])
    //funcion para manejar paginas previas y siguientes si es true es siguiente y si es false es anterior
    const HandleClickPage = (action:boolean)=>{
        action ? setPage((number) => number + 1) : setPage((number) => number - 1);
    }

    //componente para la generacion de tabla
    const TableExample = () => {
        if(data != undefined){
            return(
                <table>
                    <thead>
                    <tr>
                        <th>
                            ID
                        </th>
                        <td>Gasto</td>
                        <td>Monto</td>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((item)=>(
                        <tr key={item.id}>
                            <th>{item.id}</th>
                            <td>{item.name}</td>
                            <td>{item.amount}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>)
        }

        return(
            <div>
                <h2>
                    No hay gastos registrados
                </h2>
            </div>
        )
    }
    const RenderButtons = () =>{
        if(dataPagination != undefined){
            const data = dataPagination;
            console.log(data)

            return(
                <div>
                    {/* En caso de que tenga pagina siguiente*/}
                    {data.HasNext ? (
                        <button onClick={() =>HandleClickPage(true)}>
                            Siguiente
                        </button>) :
                        <button disabled>
                            Siguiente
                         </button>
                    }

                    {/* En caso de que tenga pagina anterior*/}
                    {data.HasPrevious ? (
                            <button onClick={() => HandleClickPage(false)}>
                                Anterior
                            </button>) :
                        <button disabled>
                            Anterior
                        </button>
                    }

                </div>
            )
        }
    }


    return (
        <>
            <TableExample/>
            <RenderButtons/>
        </>
    );
};

export default PaginationParams;