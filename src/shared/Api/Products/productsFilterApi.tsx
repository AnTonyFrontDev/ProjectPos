import { IProductGet } from "../../interfaces/Product/IProductGet";
import axios from "axios";

const getApi = async (url: string) => {
  try {
    const response = await axios.get(
      `https://localhost:7065/api/filter/ProductFilter/${url}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw error;
  }
};

export class ProductsFilterApi {
  constructor() {}
  public async filterBy(field: string, filter: string): Promise<IProductGet[]> {
    switch (field) {
      case "name":
        return (await getApi(`FilterByName?name=${filter}`)) as IProductGet[];
        break;
      case "type":
        return (await getApi(`FilterByType?fkType=${filter}`)) as IProductGet[];
        break;
      case "minorPrice":
        return (await getApi(
          `FilterByMinorPrice?price=${filter}`
        )) as IProductGet[];
        break;
      case "higherPrice":
        return (await getApi(
          `FilterByHigherPrice?price=${filter}`
        )) as IProductGet[];
        break;
      default:
        return (await getApi(`FilterByName?name=""`)) as IProductGet[];
        break;
    }
  }
}
