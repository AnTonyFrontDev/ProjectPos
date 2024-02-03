import { IColorGet } from "../../interfaces/screens/Color/IColorGet";
import axios from "axios";

const getApi = async (url: string) => {
  try {
    const response = await axios.get(
      `https://localhost:7065/api/filter/ColorFilter/${url}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching Colors:", error);
    throw error;
  }
};

export class ColorFilterApi {
  constructor() {}
  static async filterBy(field: string, filter: string): Promise<IColorGet[]> {
    switch (field) {
      case "name":
        return (await getApi(`FilterByName?colorName=${filter}`)) as IColorGet[];
        break;
      case "colorCode":
        return (await getApi(`FilterByColorCode?colorCode=${filter}`)) as IColorGet[];
        break;
      default:
        return (await getApi(`FilterByName?colorName=""`)) as IColorGet[];
        break;
    }
  }
}
