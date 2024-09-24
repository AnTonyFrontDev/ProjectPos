import React, { useEffect, useState } from 'react'
import IPagination from '@/shared/interfaces/IPagination';
import ButtonsPagination from '@/components/PaginationComponents/ButtonsPagination';

interface IGenericPagination {
    getApiData: (page: number, itemsPerPage: number) => Promise<any>;
    children: (data: any) => React.ReactNode;
}

const GenericPagination: React.FC<IGenericPagination> = ({
    getApiData,
    children,
}) => {
    const [itemsPerPage, setItemsPerPage] = useState(10);
    //pagina
    const [page, setPage] = useState(1);
    //estado para la data de la API
    const [apiData, setApiData] = useState<any>();
    //paginacion
    const [dataPagination, setDataPagination] = useState<IPagination | any>();
    //----------
    const fetchData = async () => {
        getApiData(page, itemsPerPage)
            .then((data) => {
                if (data) {
                    setApiData(() => data);
                    if (data.headers["x-pagination"] != undefined) {
                        setDataPagination(() => JSON.parse(data.headers["x-pagination"]) as IPagination);
                    }
                }
            })
    }

    useEffect(() => {
        fetchData();
    }, [page, itemsPerPage])
    //handle del click
    const HandleClickPage = (action: boolean) => {
        setItemsPerPage(10);
        action ? setPage((number) => number + 1) : setPage((number) => number - 1);
    }
    return (
        <>
            {apiData && children(apiData)}
            <ButtonsPagination dataPagination={dataPagination} HandleClickPage={HandleClickPage} />
        </>
    )
}

export default GenericPagination