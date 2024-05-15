import { URL } from "@/shared/Common/url";
import axios from "axios";



export const getInventoryDiffReport = async () => {
    try { 
      const response = await axios.get(
        `${URL}/ReportInventory/GetReportDiffItems`
      );
  
      return response.data.data;
    } catch (error) {
      console.error("Error retrieving expenses:", error);
      throw error;
    }
  };