import { URL } from "@/shared/Common/url";
import axios from "axios";


export const GetExpensesPaginated = async (items:number,page:number) => {
    return await axios.get(`${URL}/Expenses/GetExpenses?Page=${page}&ItemsPerPage=${items}`)
        .then((data : any)=>{
            return data
        })
}

