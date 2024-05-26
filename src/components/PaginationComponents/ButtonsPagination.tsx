import IPagination from "@/shared/interfaces/Pagination/IPagination.ts";

const ButtonsPagination = ({dataPagination, HandleClickPage}:{dataPagination:IPagination,
    HandleClickPage:(status: boolean)=> void}) => {
        if (dataPagination != undefined) {
            const data = dataPagination;

            return (
                <div>
                    {/* En caso de que tenga pagina siguiente*/}
                    {data.HasNext ? (
                            <button onClick={() => HandleClickPage(true)}>
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


export default ButtonsPagination