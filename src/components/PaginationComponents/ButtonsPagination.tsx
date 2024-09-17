import IPagination from "@/shared/interfaces/IPagination";

const ButtonsPagination = ({ dataPagination, HandleClickPage }: {
    dataPagination: IPagination,
    HandleClickPage: (status: boolean) => void
}) => {
    if (dataPagination != undefined) {
        const data = dataPagination;

        return (
            <div className="flex mt-4 space-x-2">

                {/* En caso de que tenga pagina anterior*/}
                {data.HasPrevious ? (
                    <button
                        onClick={() => HandleClickPage(false)}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
                    >
                        Anterior
                    </button>
                ) : (
                    <button
                        disabled
                        className="px-4 py-2 bg-gray-300 text-white rounded cursor-not-allowed"
                    >
                        Anterior
                    </button>
                )}

                {/* En caso de que tenga pagina siguiente*/}
                {data.HasNext ? (
                    <button 
                        onClick={() => HandleClickPage(true)} 
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
                    >
                        Siguiente
                    </button>
                ) : (
                    <button 
                        disabled 
                        className="px-4 py-2 bg-gray-300 text-white rounded cursor-not-allowed"
                    >
                        Siguiente
                    </button>
                )}

            </div>
        );
    }
}


export default ButtonsPagination