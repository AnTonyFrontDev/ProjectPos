import {useEffect, useState} from "react";
import IPagination from "@/shared/interfaces/IPagination";


const useDataPagination = (dataPagination: any) => {
    const [data,setData] = useState<IPagination>();

    useEffect(() => {
        setData(()=>{
            return  JSON.parse(dataPagination.headers["x-pagination"]) as IPagination;
        })
    }, []);
    return data;
}

export default useDataPagination;