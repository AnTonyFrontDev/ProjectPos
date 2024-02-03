import { ISizeGet } from "../../interfaces/screens/size/ISizeGet";
import axios from "axios";

const getApi = async (url: string) => {
  try {
    const response = await axios.get(
      `https://localhost:7065/api/filter/SizeFilter/${url}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw error;
  }
};

export class SizeApiFilter {
  constructor() {}
  public async filterBy(field: string, filter: string): Promise<ISizeGet[]> {
    switch (field) {
      case "name":
        return (await getApi(`FilterByName?name=${filter}`)) as ISizeGet[];
        break;
      case "category":
        return (await getApi(`FilterByCategoryId?categoryId=${filter}`)) as ISizeGet[];
        break;
      default:
        return (await getApi(`FilterByName?name=""`)) as ISizeGet[];
        break;
    }
  }
}
