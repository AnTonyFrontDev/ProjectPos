import { IClientGet } from "../../interfaces/Client/IClientGet";
import axios from "axios";

const getApi = async (url:string)=>{
    try {
        const response = await axios.get(`https://localhost:7065/api/filter/ClientFilter/${url}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching clients:', error);
        throw error;
    }
}

export class CustomersFilterApi{
    
    constructor(){

    }
    public async filterBy(field : string, filter : string): Promise<IClientGet[]>{
        switch(field){
            case"fullName":
                return (await getApi(`FilterByFullName?fullName=${filter}`)) as IClientGet[]
            break;
            case"rnc":
                return (await getApi(`FilterByRnc?rnc=${filter}`)) as IClientGet[]
            break;
            case"cedula":
                return(await getApi(`FilterByDni?dni=${filter}`)) as IClientGet[]
            break;
            default:
                return(await getApi("FilterByFullName?fullName=''")) as IClientGet[] 
            break;
        }
    }
}